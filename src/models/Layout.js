const mongoose = require('mongoose');

const layoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fixtureLayout: {
        type: String, // JSON string of the fixture layout
        required: true
    },
    itemMap: {
        type: String, // JSON string of the item map
        required: true
    }
}, {
    timestamps: true
});

// Ensure each user only has one layout
layoutSchema.index({ userId: 1 }, { unique: true });

const Layout = mongoose.model('Layout', layoutSchema);
module.exports = Layout;
