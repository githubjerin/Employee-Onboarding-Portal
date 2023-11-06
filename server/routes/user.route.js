const express = require("express");
const bcrypt = require('bcryptjs');
const qrcode = require('qrcode');
const speakeasy = require('speakeasy');
const crypto = require('crypto');
const multer = require('multer');
const { createToken, comparePassword, maxAge, generateOTP, checkEmail } = require("../modules/jwt-auth.modules.js");
const isLoggedIn = require("../middleware/isLoggedIn.middleware.js");
const user = require("../models/user.model.js");
const { sendmail , sendmail_qr} = require("../modules/email.module.js");
const otp = require("../models/otp.model.js");
const secret = require("../modules/totp.module.js");
const fs = require('fs').promises;
const { PDFDocument, rgb } = require('pdf-lib');
const Jimp = require('jimp');

const router = express.Router();

/* TESTING */
router.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        console.log(JSON.stringify({
            pan: req.body.pan,
            aadhar: req.body.aadhar,
            dob: req.body.dob,
            address: req.body.address,
            phone: req.body.phone
        }));
        req.body.checksum = crypto.createHash('sha256').update( JSON.stringify({
            pan: req.body.pan,
            aadhar: req.body.aadhar,
            dob: req.body.dob,
            address: req.body.address,
            phone: req.body.phone
        })).digest('hex');
        const newUser = await user.create(req.body);
        
        newUser.save().then(() => console.log("User added"));
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ error });
        console.log(error);
    }
});

router.post('/qrcode', async (req, res) => {
    const user_detail = await user.findOne({ email: req.body.email });
    if (user_detail.secret.ascii === null) {
        qrcode.toDataURL(secret.otpauth_url, async function(err, data){
            await user.updateOne(
                { email: req.body.email }, 
                { secret: {
                    ascii: secret.ascii,
                    otpauth_url: data
                }});
            sendmail_qr(req.body.email, data);
            res.status(200).json("Mail Sent");
        });
    } else {
        sendmail_qr(req.body.email, user_detail.secret.otpauth_url);
        res.status(200).json("Mail Sent");
    }
});

/* LOGIN & AUTHENTICATION */
router.post('/login', async (req, res) => {
    try{
        const user_detail = await user.findOne({ email: req.body.email });

        if (user_detail) {
            const valid = await comparePassword(req.body.password, user_detail.password)

            
            if (valid) {
                const verified= speakeasy.totp.verify({
                    secret: user_detail.secret.ascii,
                    encoding: 'ascii',
                    token: req.body.totp
                });

                if(verified) {
                    const token = createToken({ 
                        email: user_detail.email
                    });
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                    res.status(200).json({
                        token: token
                    });
                } else {
                    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
                    res.status(401).json({
                        error: "Invalid OTP"
                    });
                }
            } else {
                res.status(401).json({
                    message: "Invalid Password"
                });
            }
        } else { 
            res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
            res.status(401).json({
                message: "Email ID does not exist"
            });
        }
    }
    catch (error){
        res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
        console.log(error);
        res.status(400).json({ error });
    }
});




// router.get('/authenticate/:email', function(req, res){
//     const user =  user_detail.findOne({ email: req.body.email });
//     //res.redirect('/authenticate',{params:user_detail.secret.ascii})
//     const verified= speakeasy.totp.verify({
//         secret: user_detail.secret.ascii,
//         encoding: 'ascii',
//         token: req.body.totp
//     });
//     if(verified) {
//         const token = createToken({ 
//             email: user_detail.email
//         });
//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
//         res.status(200).json({
//             token: token
//         });
//     } else {
//         res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
//         res.status(401).json({
//             error: "Invalid OTP"
//         });
//     }
// });
/* END : LOGIN & AUTHENTICATION */
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Docs");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.filename}-${Date.now()}.${ext}`);
    },
  });

  const upload = multer({
    storage: multerStorage,
  });

router.post('/formupdate', upload.single("image"), isLoggedIn, async(req,res)=>{
    const file = req.file;
    console.log(req.body);
    const watermarkText = "This is Confidential";
    const opacity=0.5;
    try {
        // Load the uploaded PDF document
        const existingPdfBuffer = await fs.readFile(file.path);
        const pdfDoc = await PDFDocument.load(existingPdfBuffer);
    
        // Get the first page of the PDF
        const [page] = pdfDoc.getPages();
    
        // Calculate coordinates for the center of the page
        const { width, height } = page.getSize();
        const textSize = 20; // Adjust text size as needed
        const textWidth = textSize * watermarkText.length;
        const textHeight = textSize;
        const x = (width - textWidth);
        const y = (height - textHeight);
    
        // Create a color with an alpha channel (opacity)
        const color = rgb(0, 0, 0);
        color.a = 1 - opacity; // Invert the opacity value
    
        // Add the transparent watermark text at the calculated center coordinates
        page.drawText(watermarkText, {
          x,
          y,
          size: textSize,
          color,
        });
    
        // Serialize the modified PDF document
        const modifiedPdfBuffer = await pdfDoc.save();
    
        // Save the modified PDF back to the storage destination (Docs directory)
        await fs.writeFile(file.path, modifiedPdfBuffer);
    
        console.log('PDF with transparent watermark added at the center and saved successfully.');
        res.status(200).send('PDF with transparent watermark saved.');
      } catch (err) {
        console.error(err);
        res.status(500).send('Error processing the PDF.');
      }
    console.log(file);
    const newImage = await user.updateOne({email:req.user.email},{
        image:req.file.filename
    })
})

router.get('/get-details', isLoggedIn, async (req, res) => {
    const user_detail = await user.findOne({ email: req.user.email })
                                    .select({
                                        password: 0,
                                        _id: 0,
                                        __v: 0
                                    });
    console.log(user_detail);
    if (user_detail) {
        const checksum = crypto.createHash('sha256').update( JSON.stringify({
            pan: user_detail.pan,
            aadhar: user_detail.aadhar,
            dob: user_detail.dob,
            address: user_detail.address,
            phone: user_detail.phone
        })).digest('hex');
        console.log(checksum, user_detail.checksum);

        if(checksum === user_detail.checksum) {
            res.status(200).json(user_detail);
        } else {
            res.status(400).json({ 
                error: "Checksum mismatch"
            });
        }
    } else { 
        res.status(400).json({ 
            error: "User not found"
        });
    }
});

router.post('/forgot-password', async (req, res) => {
    const otpDetail = await otp.findOne({ email: req.body.email });
    if(!otpDetail){
        const user_detail = await user.findOne({ email: req.body.email });
        if (user_detail) {        
            const token = createToken({ 
                email: user_detail.email,
                hash: await bcrypt.hash(user_detail.email, 10)
            });
            const otp_num = generateOTP();
            const newOtp = await otp.create({
                email: user_detail.email,
                otp: otp_num,
                token: token
            });
            newOtp.save().then(() => {
                sendmail(req.body.email, otp_num)            
                res.status(200).json({ message: "Email sent" });
            });

            } else {
                res.status(404).json({ 
                    error: "User not found"
                });
            }
    } else {
        res.status(429).json({ 
            error: "OTP already sent"
        });
    }
    
});

router.post('/reset-password', async (req, res) => {
    const otp_detail = await otp.findOne({ email: req.body.email })
                                    .select({
                                        otp: 1,
                                        token: 1,
                                        _id: 0
                                    });
    if (otp) {
        if (req.body.otp == otp_detail.otp) {
            const {auth, email} = await checkEmail(otp_detail.token);
            if (auth) {
                if (email == req.body.email) {
                    if (req.body.password == req.body.confirmpassword) {
                        user.updateOne(
                            { email: req.body.email },
                            { password: await bcrypt.hash(req.body.password, 10) }
                        ).then(() => {
                            res.status(200).json({ message: "Password changed" });
                        });
                    } else {
                        res.status(400).json({ error: "Passwords do not match" });
                    }
                } else {
                    res.status(400).json({ error: "Emails do not match" });
                }
            } else {
                res.status(400).json({ error: "Invalid token" });
            }
        } else {
            res.status(400).json({ error: "Invalid OTP" });
        }
    } else {
        res.status(400).json({ error: "OTP not requested" });
    }
});

router.get('/get-employee-details', isLoggedIn, async (req, res) => {
    await user.findOne({ email: req.user.email }).select({ __v: 0 }).then(async (user_detail) => {
        console.log(user_detail);
    if (user_detail.role === "HR") {
        console.log("hi");
        await user.find({ hrid: user_detail._id }).then(async (employee_details) => {
            console.log(employee_details);
            if (employee_details) {
                res.status(200).json(employee_details);
            } else {
                res.status(400).json({ error: "No Employees found" });
            }
        });
        
    } else {
        res.status(400).json({ error: "You are not an HR" });
    }
    });
    
});

module.exports = router;