const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["HR", "EMPLOYEE", "MANAGER"]
    }, 
    project: {
        projectid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "project",
            default: null
        },
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            default: null
        },
        position: {
            type: String,
            required: true
        }
    },
    hrid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null
    },
    pan: {
        type: String
    },
    aadhar: {
        type: Number
    },
    doj: {
        type: Date

    },
    dob: {
        type: Date
    },
    address: {
        type: String 
    },
    phone: {
        type: Number
    },
    image:{
        type: String
    },
    checksum: {
        type: String
    },
    secret:{
        ascii:{
            type:String,
            default: null
        },
        otpauth_url:{
            type:String,
            default: null
        },
    }
}, {
    timestamps: false
});


const user = mongoose.model('user', Schema);

module.exports = user;