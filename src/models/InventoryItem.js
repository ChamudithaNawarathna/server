const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
module.exports = InventoryItem;
