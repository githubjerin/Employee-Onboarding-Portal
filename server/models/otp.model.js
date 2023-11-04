import mongoose from "mongoose";

const Schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        default: new Date(Date.now() + (1000 * 60 * 10)),
      }
}, {
    timestamps: true
});


const otp = mongoose.model('otp', Schema);

export default otp;