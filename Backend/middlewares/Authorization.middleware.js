
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authorization = (req, res, next) => {
    let token = req.cookies.token || req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'Access Denied' })
    }
    jwt.verify(token, process.env.LOGIN_TOKEN_SECRET, function (err, decoded) {
        if(err) {
            return res.status(404).send({message: err.message})
        }
        if(decoded.role != 'user') {
            return res.status(401).send({message: 'Access Denied'})
        }
        req.body.token = decoded;
        next()
    });
}

module.exports = {
    authorization
}