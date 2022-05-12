const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    const newUser = await User.create({
        name, email, password
    })

    if(newUser){
        res.status(201).json({
            _id : newUser._id,
            name : newUser.name,
            email : newUser.email,
            isAdmin : newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    }else{
        res.status(400)
        throw new Error("Error Occured!")
    }
  
})

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid email or password!")
    }
  
})

module.exports = { registerUser, authUser }