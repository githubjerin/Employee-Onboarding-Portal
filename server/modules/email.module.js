import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// import { checkEmail } from './jwt-auth.modules.js';

dotenv.config();
// console.log(process.env.EMAIL_ADDRESS, process.env.EMAIL_PASSWORD)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

export async function sendMail(mail, token) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: mail,
        subject: 'Reset Password',
        text: 'Use This Token to Reset your Password',
        html: '<h4>' + token + '</h4>'
    });

    return info;
}