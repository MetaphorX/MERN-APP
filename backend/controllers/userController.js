const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler( async(req, res)=>{
    const {name, email, password} = req.body
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error('add fields')
    }

    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('user already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        
    })
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user')
    }
})

const loginUser = asyncHandler( async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    //checks user email

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid login details")
    }
})


const getUser = asyncHandler( async(req, res)=>{
    const {_id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//function for token generation
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUser
}