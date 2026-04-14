import express from 'express'
import router from express.router
const Listing = require('../models/Listing')
const { protect } = require('../middleware/authMiddleware')

//get all the listings, 
router.get('/', async (req,res) => {
    try {
        const { listingType, condition, search } = req.query

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

        const listings = await Listing.find(filter)
        .populate('seller', 'username')
        .sort( {createdAt: -1}) //displays newest listings first

        res.json(listings)
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.mesage })
    }
})

//get a single listing
router.post('/:id', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
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
router.post('/', protect, async (req, res) => {
    try {
        const listing = await Listing.create({
            ...req.body,
            seller: req.user._id
        })

        res.status(201).json(listing)
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

//update a listing, user must be logged in and own the listing
router.put('/:id', protect, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' })
        }

        if (listing.seller.toString() !== req.user._id.toString()) {
            return res.staus(403).json({ message: 'Can\'t edit a listing you didn\'t create' })
        }
        
        const updated = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        res.json(updated)
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message})
    }
}) 

//delete a listing, user must be logged in and own the listing
router.delete('/:id', protect, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found'})
        }

        if (listing.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can\'t delete a listing you don\'t own' })
        }

        await listing.deleteOne()
        res.json({ message: 'Listing removed' })
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

module.exports = router