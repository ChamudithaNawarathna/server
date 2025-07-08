try {
    require('dotenv').config();
} catch (err) {
    console.log('dotenv not found, using process.env');
}
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const layoutRoutes = require('./routes/layouts');
const inventoryRoutes = require('./routes/inventory');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware

// Allow requests from any origin
app.use(cors());
// app.use(corsMiddleware);

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Smart Shopping Cart API' });
});

// Test route to verify API is working
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/layouts', layoutRoutes);
app.use('/api/inventory', inventoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
