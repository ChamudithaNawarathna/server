const express = require('express');
const cors = require('cors');
const connectDB = require('../src/config/db');
const authRoutes = require('../src/routes/auth');
const layoutRoutes = require('../src/routes/layouts');
const inventoryRoutes = require('../src/routes/inventory');

const app = express();

connectDB(); // Just call it, do not wrap in async IIFE

app.use(cors({ origin: '*'}));
app.options('*', cors({ origin: '*'})); // <-- Add this line

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Smart Shopping Cart API' });
});
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/layouts', layoutRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
  console.error('Express error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

module.exports = app;