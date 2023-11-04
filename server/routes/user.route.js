const express = require("express");
const bcrypt = require('bcryptjs');
const qrcode = require('qrcode');
const speakeasy = require('speakeasy');
const crypto = require('crypto');

const { createToken, comparePassword, maxAge, generateOTP, checkEmail } = require("../modules/jwt-auth.modules.js");
const isLoggedIn = require("../middleware/isLoggedIn.middleware.js");
const user = require("../models/user.model.js");
const { sendmail } = require("../modules/email.module.js");
const otp = require("../models/otp.model.js");
const secret = require("../modules/totp.module.js");

const router = express.Router();

/* TESTING */
router.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.checksum = crypto.createHash('sha256').update(JSON.stringify({
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

router.get('/qrcode', async (req, res) => {
    qrcode.toDataURL(secret.otpauth_url, function(err, data){
        res.status(200).json(data);
    });
});

/* LOGIN & AUTHENTICATION */
router.post('/login', async (req, res) => {
    try{
        const user_detail = await user.findOne({ email: req.body.email });

        if (user_detail) {
            const valid = await comparePassword(req.body.password, user_detail.password)
            if (valid) {
                const verified = speakeasy.totp.verify({
                    secret: 'AVp7kne5W!>9l>QRBIehN9w3]t?BWSH6',
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
                res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
                res.status(401).json({
                    error: "Invalid password"
                });
            }

        } else { 
            res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
            res.status(401).json({
                message: "Email ID does not exist"
            });
        }

    } catch (error){
        res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
        res.status(400).json({ error });
    }
});
/* END : LOGIN & AUTHENTICATION */

router.get('/get-details', isLoggedIn, async (req, res) => {
    const user_detail = await user.findOne({ email: req.user.email })
                                    .select({
                                        password: 0,
                                        _id: 0,
                                        __v: 0
                                    });
    
    if (user_detail) {
        const checksum = crypto.createHash('sha256').update(JSON.stringify({
            pan: req.body.pan,
            aadhar: req.body.aadhar,
            dob: req.body.dob,
            address: req.body.address,
            phone: req.body.phone
        })).digest('hex');
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

module.exports = router;