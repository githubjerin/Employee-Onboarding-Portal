import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";

export const maxAge = 1 * 24 * 60 * 60; // 1 day in seconds

export function createToken(payload) {
    const token = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: maxAge }
    );

    return token;
}

export async function comparePassword(pass, original) {
    const auth = await bcrypt.compare(pass, original);
    return auth;
}

export async function checkEmail(payload) {
    payload = jwt.verify(payload, process.env.SECRET);

    const auth = await bcrypt.compare(payload.email, payload.hash);
    return { auth: auth, email: payload.email };
}

export function generateOTP() {
    const secret = speakeasy.generateSecret();

    const token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    });

    return token;
}