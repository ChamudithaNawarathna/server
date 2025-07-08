const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const connectDB = require('../src/config/db');
const authRoutes = require('../src/routes/auth');
const layoutRoutes = require('../src/routes/layouts');
const inventoryRoutes = require('../src/routes/inventory');

const app = express();

connectDB();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Smart Shopping Cart API' });
});

// This is the correct way to mount your API routes
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/layouts', layoutRoutes);
apiRouter.use('/inventory', inventoryRoutes);

app.use('/api', apiRouter); // All routes under apiRouter will be prefixed with /api


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

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

module.exports = serverless(app);