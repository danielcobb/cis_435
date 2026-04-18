const express = require('express')
const router = express.Router()
const Listing = require('../models/Listing')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')
/*
This file handles all the routes relating to listings. protected argument is used to verify 
that users are logged in. 
*/

//get all the listings, and applies filter from the URL query string if they're passed in
router.get('/', async (req,res) => {
    try {
        const { listingType, condition, search } = req.query

        //this block creates a filter that searches for the items in MongoDB
        const filter = {}
        if (listingType) filter.listingType = listingType
        if (condition) filter.condition = condition
        if (search) {
            filter.$or = [
                {title: { $regex: search, $options: 'i'} },
                {brand: { $regex: search, $options: 'i'} },
                {description: { $regex: search, $options: 'i'}}
            ]
        }
        
        //finds all the listings based on the fiter, and attaches the usernames to the listings
        const listings = await Listing.find(filter)
        .populate('seller', 'username')
        .sort( {createdAt: -1}) //displays newest listings first

        res.json(listings)
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.mesage })
    }
})

//get a single listing, also includes the user name of the lister
router.get('/:id', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id) //find the listing with corresponding id from request
        .populate('seller', 'username')

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' })
        }

        res.json(listing)
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

//create a listing, user must be logged in
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        const listingData = {
            ...req.body, //get the listing data from the request
            seller: req.user._id //used to display the username in the listing
        }

        if (req.file) { //used to display the image for the listing
            listingData.imageUrl = `/uploads/${req.file.filename}`
        }

        //save the listing in MongoDB
        const listing = await Listing.create(listingData) 

        res.status(201).json(listing)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

//delete a listing, user must be logged in and own the listing
router.delete('/:id', protect, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found'})
        }

        //check if the user owns the listing
        if (listing.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can\'t delete a listing you don\'t own' })
        }

        await listing.deleteOne() //deletes the listing from MongoDB
        res.json({ message: 'Listing removed' })
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

module.exports = router