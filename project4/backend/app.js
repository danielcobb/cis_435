const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
/*
this file connects the backend. using 
*/
dotenv.config() //load config from env file

const app = express() //create the app

connectDB() //connect to MongoDB

app.use(cors()) //used for requests from the frontend and connecting to MongoDB
app.use(express.json()) //use json for requests

//routes, using express router
app.use('/api/auth', require('./routes/auth')) 
app.use('/api/listings', require('./routes/listing'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) //used for images

//run the app on the corresponding port, outputting a success message with the port number
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})