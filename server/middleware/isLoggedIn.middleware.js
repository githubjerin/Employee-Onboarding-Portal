import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const isLoggedIn = async (req, res, next) => {
    try {
        if(req.headers.authorization || req.cookies) {
            const token = (req.cookies) ? req.cookies.jwt : req.headers.authorization.split(' ')[1];
            if(token) {
                const payload = jwt.verify(token, process.env.SECRET);
                if(payload) {
                    req.user = payload; 
                    next();
                } else {
                    res.status(498).json({ error: "token verification failed" });
                }
            } else {
                res.status(401).json({ error: "Authorization header malformed" });
            }
        } else {
            res.status(401).json({ error: "Authorization header or Cookie not present" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}

export default isLoggedIn;