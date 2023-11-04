import mongoose from "mongoose";

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
            ref: "project"
        },
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        position: {
            type: String,
            required: true
        }
    },
    hrid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
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
    }
}, {
    timestamps: false
});


const user = mongoose.model('user', Schema);

export default user;