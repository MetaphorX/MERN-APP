const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler( async(req, res, next) =>{

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //getting token from header
            token = req.headers.authorization.split(' ')[1]
            //split will break the token into the bearer and token

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //gettin user
            req.user = await User.findById(decoded.id).select('-password')
            next()

        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error(error)
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


module.exports = {protect}