const mongoose = require('mongoose')

//connect to mongoDB using the connection link from the website. 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`) //display a success message
    }catch (error) {
        console.error(`Error: ${error.message}`) //display an error if connection is refused
        process.exit(1)
    }
}

module.exports = connectDB