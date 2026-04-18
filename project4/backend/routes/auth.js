const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

//generate a JWT with the user's id
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '7d'})
}

//Register route, takes in three pieces of data that are sent from the frontend.
router.post('/register', async (req, res) => {
    const { username, email, password} = req.body

    try {
        const userExists = await User.findOne({ email }) //check if the email is already in the DB
        if (userExists) {
            return res.status(400).json({message: 'Email already in use'})
        }

        const hashedPswd = await bcrypt.hash(password, 10) //hash the password to store in the DB

        //creates the new user and saves it to MongoDB w/ the hashed password
        const user = await User.create({
            username, 
            email,
            password: hashedPswd
        })

        //sends the new user's info with the JWT
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }catch (error) {
        res.status(500).json({message: 'Server error', error: error.message})}
})

//login checks for a valid email and password
router.post('/login', async (req,res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }) //find the email address
        if (!user) {
            //message should not specify which field was wrong, could be a security issue
            return res.status(400).json({message: 'Invalid email or password'})
        }
        //to compare the passwords, hash the password input and check the db
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid email or password' })
        }

        //response if credentials match
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }catch(error){
        res.status(500).json({message: 'Server error', error: error.message})
    }
})

module.exports = router