const express = require("express");
const bcrypt = require('bcryptjs');

const { createToken, comparePassword, maxAge, generateOTP, checkEmail } = require("../modules/jwt-auth.modules.js");
const isLoggedIn = require("../middleware/isLoggedIn.middleware.js");
const user = require("../models/user.model.js");
const { sendmail } = require("../modules/email.module.js");
const otp = require("../models/otp.model.js");

const router = express.Router();

/* TESTING */
router.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newUser = await user.create(req.body);
        
        newUser.save().then(() => console.log("User added"));
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ error });
    }
});


/* LOGIN & AUTHENTICATION */
router.post('/login', async (req, res) => {
    try{
        const user_detail = await user.findOne({ email: req.body.email });

        if (user_detail) {
            const valid = await comparePassword(req.body.password, user_detail.password)
            if (valid) {

                res.redirect(`/user/authenticate/${user_detail.email}`);
                // const token = createToken({ email: req.body.email });
                // res.cookie('jwt', token, { httpOnly: true, maxAge: (maxAge * 1000) });
                // res.status(200).json({
                //     email: req.body.email
                // });

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

router.get('/authenticate/:email', async (req, res) => {
    const otpDetail = await otp.findOne({ email: req.params.email });
    if(!otpDetail){
        const user_detail = await user.findOne({ email: req.params.email });
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
                sendmail(req.params.email, otp_num)            
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

router.post('/authenticate', async (req, res) => {
    const otp_detail = await otp.findOne({ email: req.body.email })
                                    .select({
                                        otp: 1,
                                        token: 1,
                                        _id: 0
                                    });
    if (otp) {
        if (req.body.otp === otp_detail.otp) {
            const {auth, email} = await checkEmail(otp_detail.token);
            if (auth) {
                if (email == req.body.email) {
                    const token = createToken({ email: req.body.email });
                    res.cookie('jwt', token, { httpOnly: true, maxAge: (maxAge * 1000) });
                    res.status(200).json({
                        email: req.body.email
                    });
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
/* END : LOGIN & AUTHENTICATION */

router.get('/get-details', isLoggedIn, async (req, res) => {
    const user_detail = await user.findOne({ email: req.user.email })
                                    .select({
                                        password: 0,
                                        _id: 0,
                                        __v: 0
                                    });
    if (user_detail) {
        res.status(200).json(user_detail);
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