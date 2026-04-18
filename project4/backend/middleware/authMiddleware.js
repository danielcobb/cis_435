const jwt = require('jsonwebtoken')
const User = require ('../models/User')

const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { //check if the request has an auth header that begins with Bearer
        try {
            token = req.headers.authorization.split(' ')[1] //extract the token string

            const decoded = jwt.verify(token, process.env.JWT_SECRET) //check if the token was signed with the JWT_secret in env file

            req.user = await User.findById(decoded.id).select('-password') //get the user from the id in the token

            next() //sned the request to the route handler
        }catch(error){
            res.status(401).json({message: 'Not authorized, token failed'})
        }
    }
    if (!token) {
        res.status(401).json({message: 'Not authorized, no token'})
    }
}

module.exports = {protect}