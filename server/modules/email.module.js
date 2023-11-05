const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendmail(mail, token) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: mail,
        subject: 'Reset Password',
        text: 'Use This Token to Reset your Password',
        html: '<h4>' + token + '</h4>'
    });

    return info;
}

async function sendmail_qr(mail, data) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: mail,
        subject: 'Scan this QR',
        text: data
        // html: '<a href="' + data + '">Click here</a>'
    });

    return info;
}

module.exports = {sendmail, sendmail_qr};