const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/listings', require('./routes/listing'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})