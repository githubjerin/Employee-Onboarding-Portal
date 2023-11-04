const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const speakeasy = require("speakeasy");

const maxAge = 1 * 24 * 60 * 60; // 1 day in seconds

function createToken(payload) {
    const token = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: maxAge }
    );

    return token;
}

async function comparePassword(pass, original) {
    const auth = await bcrypt.compare(pass, original);
    return auth;
}

async function checkEmail(payload) {
    payload = jwt.verify(payload, process.env.SECRET);

    const auth = await bcrypt.compare(payload.email, payload.hash);
    return { auth: auth, email: payload.email };
}

function generateOTP() {
    const secret = speakeasy.generateSecret();

    const token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    });

    return token;
}

module.exports = { maxAge, createToken, comparePassword, checkEmail, generateOTP };