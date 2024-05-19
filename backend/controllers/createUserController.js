const { OTP, newUser } = require('../models/CreateUserModel');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

async function generateOTP(email) {
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    try {
        await OTP.create({ email, otp, isVerified: false });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'zhabibek4u@gmail.com',
                pass: 'dznh tbje jkxk ouiy'  // Note: This should be stored securely in environment variables
            }
        });

        await transporter.sendMail({
            from: 'zhabibek4u@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });

        return 'OTP sent successfully';
    } catch (error) {
        console.error(error);
        throw new Error('Error sending OTP');
    }
}

async function verifyOTP(email, otp) {
    try {
        const otpRecord = await OTP.findOne({ email, otp }).exec();

        if (otpRecord) {
            otpRecord.isVerified = true;
            await otpRecord.save();

            const userRecord = await newUser.findOne({ email }).exec();
            if (userRecord) {
                userRecord.isVerified = true;
                await userRecord.save();
                return 'OTP verified successfully';
            } else {
                throw new Error('User not found');
            }
        } else {
            throw new Error('Invalid OTP');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error verifying OTP');
    }
}

async function createUser(name, email, phoneNo, isVerified) {
    try {
        // Check if the email or phone number already exists in the database
        const existingUser = await newUser.findOne({ $or: [{ email }, { phoneNo }] }).exec();
        if (existingUser) {
            throw new Error('User with this email or phone number already exists');
        }

        const newUserInstance = new newUser({ name, email, phoneNo, isVerified });
        newUserInstance.isVerified = false; // Initially setting isVerified to false
        await newUserInstance.save();
        return newUserInstance;
    } catch (error) {
        console.error('Error creating user: ', error);
        throw new Error('Error creating user : User with this email or phone number already exists');
    }
}


module.exports = { generateOTP, verifyOTP, createUser };
