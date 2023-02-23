const express = require('express');
const cookie = require('cookie');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const accountSid = process.env.SMS_API_ID;
const authToken = process.env.SMS_API_TOKEN;
const client = require("twilio")(accountSid, authToken);


const { UserModel } = require('../models/Users.model')

const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(404).send({ message: 'Mobile Number is needed' })
    }

    let user = await UserModel.findOne({ mobile });

    const otp = Math.floor(Math.random() * 9000 + 1000);
    let expiresIn = Math.floor(new Date().getTime() / 1000 + 300);

    // Code for sending message uncomment for deployment

    // let sendto = '+91' + mobile;

    client.messages
        .create({
             body: `OTP for verification is ${otp}`, 
             from: process.env.SENDER_NUMBER, 
             to: sendto 
            })
        .then(message => console.log(message.sid));

    if (user) {
        await UserModel.findOneAndUpdate({ otp, expiresIn })
    } else {
        user = new UserModel({
            mobile,
            otp,
            expiresIn
        });
        await user.save();
    }
    res.setHeader('Set-Cookie', cookie.serialize('mobile', mobile, {
        httpOnly: true,
        maxAge: 60 * 60 * 24
    }));
    res.send({message: 'ok'})
})

userRouter.post('/verify', async (req, res) => {
    const { mobile } = req.cookies;
    if (!mobile) {
        return res.status(401).send({ message: 'Login Again' })
    }
    const { otp } = req.body;
    if (!otp) {
        return res.send(404).send({ message: 'Please enter OTP to login' })
    }

    const user = await UserModel.findOne({ mobile });
    if (!user) {
        return res.status(401).send({ message: 'Login Again' })
    }

    const time = Math.floor(new Date().getTime() / 1000);

    if (time > user.expiresIn) {
        return res.status(401).send({ message: "OTP Expired" });
    }

    if (user.otp == otp) {
        var token = jwt.sign({ id: user._id, role: 'user' }, process.env.LOGIN_TOKEN_SECRET);
        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24
        }));
        res.send({ message: 'Login Sucessful', token })
    } else {
        res.status(401).send({ message: 'OTP incorrect' })
    }
})

module.exports = {
    userRouter
}