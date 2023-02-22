const express = require('express');
const { authorization } = require('../middlewares/Authorization.middleware');
const { UserModel } = require('../models/Users.model')

const cartRouter = express.Router();

cartRouter.get('/', authorization, async (req, res) => {
    const { token } = req.body;
    const userId = token.id;
    const user = await UserModel.findOne({ _id: userId });
    const cart = user.cart;
    res.send(cart)
})

cartRouter.post('/add/:id', authorization, async (req, res) => {
    const { token } = req.body;
    const productId = req.params['id'];
    const userId = token.id;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        return res.status(401).send({ message: 'Access Denied' })
    }
    const cart = user.cart;
    if (cart.some(index => index.productId == productId)) {
        return res.status(409).send({ message: 'Product already in cart' })
    } else {
        try {
            await UserModel.findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        cart: {
                            productId,
                            quantity: 1
                        }
                    }
                }
            )
            res.send({ message: 'Product added to cart' })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: error.message })
        }
    }
})

cartRouter.delete('/remove/:id', authorization, async (req, res) => {
    const { token } = req.body;
    const productId = req.params['id'];
    const userId = token.id;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        return res.status(401).send({ message: 'Access Denied' })
    }
    const cart = user.cart;
    if (cart.some(index => index.productId == productId)) {
        try {
            await UserModel.findOneAndUpdate({ _id: userId },
                {
                    $pull:
                        { cart: { productId } }
                })
            res.send({ message: `Product with id ${productId} removed from cart` })
        } catch (error) {
            return res.status(500).send({message: error.message})
        }
    } else {
        return res.status(404).send({ message: 'Product not found in cart' })
    }
})

cartRouter.patch('/increase/:id', authorization, async (req, res) => {
    const { token } = req.body;
    const productId = req.params['id'];
    const userId = token.id;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        return res.status(401).send({ message: 'Access Denied' })
    }
    const cart = user.cart;
    if (cart.some(index => index.productId == productId)) {
        cart.forEach(index => {
            if (index.productId == productId) {
                index.quantity++;
            }
        })
        await user.save()
        res.send({ message: `Qantity increased of id ${productId}` })
    } else {
        return res.status(404).send({ message: 'Product not found in cart' })
    }
})

cartRouter.patch('/decrease/:id', authorization, async (req, res) => {
    const { token } = req.body;
    const productId = req.params['id'];
    const userId = token.id;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        return res.status(401).send({ message: 'Access Denied' })
    }
    const cart = user.cart;
    if (cart.some(index => index.productId == productId)) {
        cart.forEach(index => {
            if (index.productId == productId) {
                index.quantity--;
            }
        })
        await user.save()
        res.send({ message: `Qantity decreased of id ${productId}` })
    } else {
        return res.status(404).send({ message: 'Product not found in cart' })
    }
})

module.exports = {
    cartRouter
}