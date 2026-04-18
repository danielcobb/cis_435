const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    listingType: {
        type: String,
        required: true,
        enum: ['bike', 'part']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true
    },
    price: {
        type: Number, 
        required: [true, 'Price is required'],
        min: [1, 'Price must be greater than 0']
    },
    condition: {
        type: String,
        required: true,
        enum: ['new', 'like new', 'good', 'fair', 'poor']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlenght: [1000, 'Description cannot be more than 1000 characters']
    },

    //bike specific fields
    frameSize: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', null],
        default: null
    },
    wheelSize: {
        type: String,
        enum: ['26"', '27.5"', '27.5+"', '29"', null],
        default: null
    },
    suspensionType: {
        type: String,
        enum: ['hardtail', 'full suspension', 'rigid', null],
        default: null
    },

    //part specific fields
    partCategory: {
        type: String,
        enum: ['fork', 'drivetrain', 'brakes', 'wheels', 'handlebars', 'seat', 'frame', 'other', null],
        default: null
    },
    //reference to a user in the Users table
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        default:null
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Listing', listingSchema)