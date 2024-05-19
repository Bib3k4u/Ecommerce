const express = require('express');
const router = express.Router();
const { generateOTP, verifyOTP, createUser } = require('../controllers/createUserController');
const User = require('../models/CreateUserModel'); // Import the User model

router.post('/generate-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await generateOTP(email);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const result = await verifyOTP(email, otp);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/newUser", async(req,res) => {
    const {name, email, phoneNo, isVerified } = req.body;
    try {
        const createNew = await createUser(name, email, phoneNo, isVerified);
        res.status(200).json(createNew);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send JSON response with error message
    }
})

module.exports = router;
