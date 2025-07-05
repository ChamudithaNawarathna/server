const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');
const { protect } = require('../middleware/authMiddleware'); 
router.use(protect); 

// @route   GET /api/inventory
// @desc    Get all inventory items
// @access  Public
router.get('/', async (req, res) => {
    try {
        const items = await InventoryItem.find({});
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/inventory
// @desc    Add one or more inventory items
// @access  Public (should be protected in production)
router.post('/', async (req, res) => {
    try {
        const { inventoryItems } = req.body;

        if (!Array.isArray(inventoryItems)) {
            return res.status(400).json({ message: "Expected 'inventoryItems' to be an array" });
        }

        const savedItems = await InventoryItem.insertMany(inventoryItems, { ordered: false }); // ordered: false skips duplicates
        res.status(201).json(savedItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
