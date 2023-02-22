const express = require('express');
const { authorization } = require('../middlewares/Authorization.middleware')
const { UserModel } = require('../models/Users.model')
const addressRouter = express.Router();

addressRouter.get('/', authorization, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    const user = await UserModel.findOne({ _id: userId });
    const addresses = user.address;
    res.send(addresses)
})

addressRouter.post('/add', authorization, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        return res.status(401).send({ message: 'Access Denied' })
    }
    const { name, mobile, street, town, pin, type } = req.body;
    if (!name || !mobile || !street || !town || !pin) {
        return res.status(400).send({ message: 'address fields not provided' })
    }
    try {
        await UserModel.findOneAndUpdate(
            { _id: userId },
            {
                $push: {
                    address: {
                        name, mobile, street, town, pin, type
                    }
                }
            }
        )
        res.send({ message: 'Address added' })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message })
    }
})

addressRouter.delete('/remove/:id', authorization, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        return res.status(401).send({ message: 'Access Denied' })
    }
    const addressId = req.params['id'];
    const address = user.address;
    if(!address.some(index => index._id == addressId)) {
        return res.status(404).send({message: 'Address not found'})
    }
    try {
        await UserModel.findOneAndUpdate({ _id: userId },
            {
                $pull:
                    { address: { _id: addressId } }
            })
        res.send({ message: 'Address Removed' })
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

addressRouter.patch('/edit/:id', authorization, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        return res.status(401).send({ message: 'Access Denied' })
    }
    const addressId = req.params['id'];
    const address = user.address;
    if(!address.some(index => index._id == addressId)) {
        return res.status(404).send({message: 'Address not found'})
    }
    const payload = req.body;
    try {
        await UserModel.findOneAndUpdate({ _id: userId, "address.$_id": addressId },
            {
                $set: {"name": "Darshan Nashikkar"}
            })
        res.send('Address Updated')
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

module.exports = {
    addressRouter
}