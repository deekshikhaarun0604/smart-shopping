require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const { connectDB, getDBStatus } = require('./config/db');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const Product = require('./models/Product');
const seedDatabase = require('./seeds/seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins in development and production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));

// 1. Mount API routes FIRST so they take precedence over static files and SPA fallback
app.use('/api', apiRoutes);

// 2. Catch-all JSON 404 handler for any unhandled /api requests
app.all(['/api', '/api/*'], (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// 3. Locate compiled frontend client/dist directory
const candidateDistPaths = [
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(process.cwd(), 'client/dist'),
  path.resolve(process.cwd(), '../client/dist'),
  path.resolve(__dirname, '../client/dist')
];

const clientDistPath = candidateDistPaths.find(p => fs.existsSync(path.join(p, 'index.html')));

if (clientDistPath) {
  const indexHtmlPath = path.join(clientDistPath, 'index.html');
  console.log(`[Static] Serving React production build from: ${clientDistPath}`);

  // Serve static assets (JS, CSS, images, etc.) from client/dist
  app.use(express.static(clientDistPath));

  // Explicit SPA routes defined in React Router
  const spaRoutes = [
    '/',
    '/dashboard',
    '/shop',
    '/customers',
    '/graph',
    '/recommendations',
    '/how-it-works'
  ];

  spaRoutes.forEach(route => {
    app.get(route, (req, res) => {
      res.sendFile(indexHtmlPath);
    });
  });

  // Catch-all SPA fallback for any other client route
  app.get('*', (req, res) => {
    res.sendFile(indexHtmlPath);
  });
} else {
  console.warn('[Static] Frontend build (client/dist/index.html) not found. Serving API root.');
  app.get('/', (req, res) => {
    res.json({
      name: 'SmartShop Knowledge Graph API',
      tagline: 'Transforming Information into Intelligent Solutions',
      version: '1.0.0',
      database: getDBStatus(),
      docs: '/api/health',
      warning: 'Frontend build not found at client/dist. Run `npm run build` to compile the React frontend.'
    });
  });
}

// 4. Global Error handling middleware
app.use(errorHandler);

// Start Server and Connect DB
const startServer = async () => {
  const isConnected = await connectDB();

  // If connected and database is empty, auto-seed the initial Knowledge Graph demo data
  if (isConnected) {
    try {
      const productCount = await Product.countDocuments();
      if (productCount === 0) {
        console.log('[Auto-Seed] Empty database detected. Populating initial demo knowledge graph...');
        await seedDatabase();
      } else {
        console.log(`[Database] Connected with ${productCount} existing products. Initial seed skipped to preserve records.`);
      }
    } catch (e) {
      console.warn('[Auto-Seed] Could not check or auto-seed:', e.message);
    }
  }

  // Bind to 0.0.0.0 for Render cloud web service compatibility
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(` SmartShop Full-Stack Server running on port ${PORT}`);
    console.log(` Listening on: http://0.0.0.0:${PORT}`);
    console.log(` Health Check: http://0.0.0.0:${PORT}/api/health`);
    console.log(` Environment:  ${process.env.NODE_ENV || 'development'}`);
    console.log(`====================================================`);
  });
};

startServer();
