const express = require("express");

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
        res.status(200).json({});
    } catch (error){
        res.status(400).json({ error });
    }
});

module.exports= router;