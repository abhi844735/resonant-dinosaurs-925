const mongoose = require('mongoose');
const { CartSchema } = require('../schemas/Cart.Schema')
const { AddressSchema } = require('../schemas/Address.schema')

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    mobile: { type: Number, required: true },
    otp: Number,
    expiresIn: Number,
    address: {
        type: [AddressSchema],
        default: []
    },
    cart: {
        type: [CartSchema],
        default: []
    }
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserModel
}