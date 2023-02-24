const express = require('express');
const cookie = require('cookie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { UserModel } = require('../models/Users.model')
const {BlacklistModel} = require('../models/Blacklist.model');
const { authentication } = require('../middlewares/Authentication.middleware');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const {email, password, mobile, gender, name} = req.body;
    if(!name||!gender||!mobile||!password) {
        return res.status(409).send({message: 'Please provide all fields'})
    }
    try {
        const userExists = await UserModel.findOne({mobile});
        if(userExists) {
            return res.status(409).send({message: 'Mobile number already registered'})
        }
        bcrypt.hash(password, +process.env.saltRounds, async function (err, hashedPass) {
            if (err) {
                return res.status(404).send({ message: err.message })
            }
            try {
                const user = new UserModel({
                    name, email, password: hashedPass, mobile, gender
                })
                await user.save()
                const userBlack = new BlacklistModel({
                    userId: user._id
                })
                await userBlack.save()
                res.send({ message: 'User Registered Sucessfully' })
            } catch (error) {
                console.log(error)
                return res.status(404).send({ message: error.message })
            }
        });
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})


userRouter.post('/login', async (req, res) => {
    const {mobile, password} = req.body;
    try {
        const user = await UserModel.findOne({mobile});
        if(!user) {
            return res.status(404).send({message: 'User not found'})
        }
        bcrypt.compare(password, user.password, async function (err, result) {
            if (err) {
                return res.status(404).send({ message: err.message })
            }
            if (result) {
                var token = jwt.sign({ id: user._id, role: 'user' }, process.env.LOGIN_TOKEN_SECRET);
                res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24
                }));
                res.send({ message: 'Login Sucessful', token, name: user.name })
            } else {
                res.status(403).send({ message: 'Wrong Credentials' })
            }
        });
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

userRouter.post('/logout', authentication, async (req, res) => {
    const token = req.headers.authorization;
    const {id} = req.body.token;
    try {
        const Blacklist = await BlacklistModel.findOne({userId: id})
        Blacklist.tokens.push(token);
        Blacklist.save();
        res.send({message: 'Logout Sucessfull'})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

module.exports = {
    userRouter
}



    // nodemailer for sending mail not working
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: process.env.SENDER_MAIL,
    //         pass: process.env.SENDER_MAIL_PASS
    //     }
    // });
    
    
    // twillio for sending sms working fine
    // const accountSid = process.env.SMS_API_ID;
    // const authToken = process.env.SMS_API_TOKEN;
    // const client = require("twilio")(accountSid, authToken);
    
    
    // userRouter.post('/login', async (req, res) => {
    //     const { email } = req.body;
    
    //     if (!email) {
    //         return res.status(404).send({ message: 'Email is needed' })
    //     }
    
    //     let user = await UserModel.findOne({ email });
    
    //     const otp = Math.floor(Math.random() * 9000 + 1000);
    //     let expiresIn = Math.floor(new Date().getTime() / 1000 + 300);
    
    //     var mailOptions = {
    //         from: process.env.SENDER_MAIL,
    //         to: email,
    //         subject: 'OTP for verification',
    //         text: `OTP for login is ${otp}. Note: OTP will be only valid for 5 minutes`
    //     };
    
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log('Message sent: %s', info.messageId);
    //     });
    
    //     // Code for sending message working fine
    
    //     // let sendto = '+91' + mobile;
    
    //     // client.messages
    //     //     .create({
    //     //          body: `OTP for verification is ${otp}`, 
    //     //          from: process.env.SENDER_NUMBER, 
    //     //          to: sendto 
    //     //         })
    //     //     .then(message => console.log(message.sid));
    
    //     if (user) {
    //         try {
    //             await UserModel.findOneAndUpdate({ otp, expiresIn })
    //         } catch (error) {
    //             return res.status(500).send({ message: error.message })
    //         }
    //     } else {
    //         try {
    //             user = new UserModel({
    //                 email,
    //                 otp,
    //                 expiresIn
    //             });
    //             await user.save();
    //         } catch (error) {
    //             return res.status(500).send({ message: error.message })
    //         }
    //     }
    //     res.setHeader('Set-Cookie', cookie.serialize('email', email, {
    //         httpOnly: true,
    //         maxAge: 60 * 60 * 24
    //     }));
    //     res.send({ message: 'ok' })
    // })
    
    // userRouter.post('/verify', async (req, res) => {
    //     const { mobile } = req.cookies;
    //     if (!mobile) {
    //         return res.status(401).send({ message: 'Login Again' })
    //     }
    //     const { otp } = req.body;
    //     if (!otp) {
    //         return res.send(404).send({ message: 'Please enter OTP to login' })
    //     }
    
    //     const user = await UserModel.findOne({ mobile });
    //     if (!user) {
    //         return res.status(401).send({ message: 'Login Again' })
    //     }
    
    //     const time = Math.floor(new Date().getTime() / 1000);
    
    //     if (time > user.expiresIn) {
    //         return res.status(401).send({ message: "OTP Expired" });
    //     }
    
    //     if (user.otp == otp) {
    //         var token = jwt.sign({ id: user._id, role: 'user' }, process.env.LOGIN_TOKEN_SECRET);
    //         res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    //             httpOnly: true,
    //             maxAge: 60 * 60 * 24
    //         }));
    //         res.send({ message: 'Login Sucessful', token })
    //     } else {
    //         res.status(401).send({ message: 'OTP incorrect' })
    //     }
    // })