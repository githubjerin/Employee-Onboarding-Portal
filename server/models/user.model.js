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
        type: String,
        required: true
    },
    aadhar: {
        type: Number,
        required: true
    },
    doj: {
        type: Date,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    checksum: {
        type: String
    },
    secret:{
        ascii:{type:String},
        hex:{type:String},
        base32:{type:string},
        otpauth_url:{type:string}
    }
}, {
    timestamps: false
});


const user = mongoose.model('user', Schema);

module.exports = user;