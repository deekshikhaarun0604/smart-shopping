require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB, getDBStatus } = require('./config/db');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const Product = require('./models/Product');
const seedDatabase = require('./seeds/seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Mount API routes
app.use('/api', apiRoutes);

// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'SmartShop Knowledge Graph API',
    tagline: 'Transforming Information into Intelligent Solutions',
    version: '1.0.0',
    dbStatus: getDBStatus(),
    docs: '/api/health'
  });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use(errorHandler);

// Start Server and Connect DB
const startServer = async () => {
  const isConnected = await connectDB();

  if (isConnected) {
    try {
      const productCount = await Product.countDocuments();
      if (productCount === 0) {
        console.log('[Auto-Seed] Empty database detected. Populating demo knowledge graph...');
        await seedDatabase();
      }
    } catch (e) {
      console.warn('[Auto-Seed] Could not check or auto-seed:', e.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` SmartShop Backend Server running on port ${PORT}`);
    console.log(` URL: http://localhost:${PORT}`);
    console.log(` API Health: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
};

startServer();
