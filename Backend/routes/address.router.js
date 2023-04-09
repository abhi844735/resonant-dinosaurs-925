const express = require('express');
const { authentication } = require('../middlewares/Authentication.middleware')
const { UserModel } = require('../models/Users.model');
const { UserAuth } = require('../middlewares/Authorization.middleware');
const { AddressModel } = require('../models/Address.model');
const addressRouter = express.Router();

addressRouter.get('/', authentication, UserAuth, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    try {
        const addresses = await AddressModel.find({ user_id: userId });
        return res.send(addresses)
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

addressRouter.get('/:id', authentication, UserAuth, async (req, res) => {
    const { token } = req.body;
    const addressId = req.params['id'];
    const user_id = token.id;
    try {
        const address = await AddressModel.findOne({ user_id, _id: addressId });
        if (!address) {
            return res.status(401).send({ message: 'Address not found' });
        }
        return res.send(address)
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

addressRouter.post('/add', authentication, UserAuth, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    const { name, mobile, house, city, state, locality, pin, type } = req.body;
    if (!name || !mobile || !locality || !house || !city || !state || !pin) {
        return res.status(400).send({ message: 'address fields not provided' })
    }
    try {
        const address = new AddressModel({ name, mobile, house, city, state, locality, pin, type, user_id: userId })
        await address.save()
        return res.send({ message: 'Address added' })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

addressRouter.delete('/remove/:id', authentication, UserAuth, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    const addressId = req.params['id'];
    try {
        const address = await AddressModel.findOne({ user_id: userId, _id: addressId });
        if (!address) {
            return res.status(401).send({ message: 'Address not found' })
        }
        await AddressModel.findOneAndDelete({ user_id: userId, _id: addressId });
        return res.send({ message: 'Address Removed Successfully' })
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

addressRouter.patch('/edit/:id', authentication, UserAuth, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;

    const addressId = req.params['id'];

    const payload = req.body;
    try {
        const address = await AddressModel.findOne({ user_id: userId, _id: addressId });
        if (!address) {
            return res.status(401).send({ message: 'Address not found' })
        }
        await AddressModel.findOneAndUpdate({ _id: addressId }, payload)
        return res.send({ message: 'Address Updated' })
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

module.exports = {
    addressRouter
}