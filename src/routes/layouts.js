const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Layout = require('../models/Layout');

// @route   GET /api/layouts
// @desc    Get user's layout
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const layout = await Layout.findOne({ userId: req.user._id });
        if (!layout) {
            return res.json({ fixtureLayout: null, itemMap: null });
        }
        res.json({
            fixtureLayout: JSON.parse(layout.fixtureLayout),
            itemMap: JSON.parse(layout.itemMap)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/layouts
// @desc    Save/Update layout
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { fixtureLayout, itemMap } = req.body;
        
        const layout = await Layout.findOneAndUpdate(
            { userId: req.user._id },
            {
                fixtureLayout: JSON.stringify(fixtureLayout),
                itemMap: JSON.stringify(itemMap)
            },
            { new: true, upsert: true }
        );

        res.json({
            fixtureLayout: JSON.parse(layout.fixtureLayout),
            itemMap: JSON.parse(layout.itemMap)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/layouts
// @desc    Clear user's layout
// @access  Private
router.delete('/', protect, async (req, res) => {
    try {
        await Layout.findOneAndDelete({ userId: req.user._id });
        res.json({ message: 'Layout cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
