const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    isVerified: Boolean,
    createdAt: { type: Date, expires: '5m', default: Date.now }
});

const createUserSchema = new mongoose.Schema({
    name: String,
    email: String, 
    phoneNo : Number,
    isVerified : Boolean,
    createdAt: { type: Date, default: Date.now }
})

const newUser = mongoose.model('createUser', createUserSchema);
const OTP = mongoose.model('OTP', otpSchema);


module.exports = {OTP, newUser};
