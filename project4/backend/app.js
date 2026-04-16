const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/listings', require('./routes/listing'))

app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})