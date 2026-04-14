import express from 'express'
import router from express.router
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const User = require('../models/User')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '7d'})
}

//register 
router.post('/register', async (req, res) => {
    const { username, email, password} = req.body

    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({message: 'Email already in use'})
        }

        const hashedPswd = await bcrypt.hash(password, 10)

        const user = await User.create({
            username, 
            email,
            password: hashedPswd
        })

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }catch (error) {
        res.status(500).json({mesage: 'Server error', error: error.message})}
})

//login 
router.post('/login', async (req,res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid email or password' })
        }

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