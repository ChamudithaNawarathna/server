const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const InventoryItem = require('../models/InventoryItem');

const inventoryItems = [
    {
        name: "Anchor Full Cream Milk Powder",
        imageUrl: "https://www.anchordairy.com/ph/en/products/milk-powders-and-uht/anchor-full-cream-milk/_jcr_content/root/container/image.coreimg.png/1669235696033/full-cream-milk.png"
    },
    {
        name: "Milo Drink Chocolate 180ml",
        imageUrl: "https://www.milo.com.my/sites/default/files/pack-image/milouht-125.png"
    },
    {
        name: "Maggi Papare Kottu Noodles",
        imageUrl: "https://th.bing.com/th/id/OIP.V7fwDICDAMrHyzuwhigG6wAAAA?rs=1&pid=ImgDetMain"
    },
    {
        name: "Nestomalt 300g",
        imageUrl: "https://www.nestle.lk/sites/g/files/pydnoa551/files/nestomalt-new-01.png"
    }
];

async function seedInventory() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing inventory
        await InventoryItem.deleteMany({});
        console.log('Cleared existing inventory items');

        // Insert new items
        const insertedItems = await InventoryItem.insertMany(inventoryItems);
        console.log('Inserted inventory items:', insertedItems);

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error seeding inventory:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seedInventory();
