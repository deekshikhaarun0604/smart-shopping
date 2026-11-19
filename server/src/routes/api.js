const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const graphController = require('../controllers/graphController');
const recommendationController = require('../controllers/recommendationController');
const purchaseController = require('../controllers/purchaseController');
const dashboardController = require('../controllers/dashboardController');
const seedController = require('../controllers/seedController');
const { getDBStatus } = require('../config/db');

// Health Check
router.get('/health', (req, res) => {
  const status = getDBStatus();
  res.json({
    status: status.isConnected ? 'HEALTHY' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    service: 'SmartShop Knowledge Graph API',
    database: status
  });
});

// Dashboard
router.get('/dashboard/stats', dashboardController.getDashboardStats);

// Customers
router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:id', customerController.getCustomerById);

// Products
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

// Categories & Interests
router.get('/categories', categoryController.getAllCategories);
router.get('/interests', categoryController.getAllInterests);

// Knowledge Graph
router.get('/graph', graphController.getGraph);

// Recommendations
router.post('/recommendations', recommendationController.generateRecommendations);
router.get('/recommendations/:customerId', recommendationController.getCustomerRecommendations);

// Purchases
router.post('/purchases', purchaseController.simulatePurchase);
router.get('/purchases', purchaseController.getAllPurchases);

// Database Seeding
router.post('/seed', seedController.triggerSeed);

module.exports = router;
