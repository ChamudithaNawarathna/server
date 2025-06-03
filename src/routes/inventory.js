const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

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
// @desc    Add new inventory item (for admin use)
// @access  Public (should be protected in production)
router.post('/', async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        const item = new InventoryItem({
            name,
            imageUrl
        });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
