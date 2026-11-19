const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Category = require('../models/Category');
const Interest = require('../models/Interest');
const Relationship = require('../models/Relationship');
const Purchase = require('../models/Purchase');
const { getDBStatus } = require('../config/db');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProducts,
      totalCustomers,
      totalCategories,
      totalInterests,
      totalRelationships,
      totalPurchases,
      popularProducts,
      recentPurchases
    ] = await Promise.all([
      Product.countDocuments(),
      Customer.countDocuments(),
      Category.countDocuments(),
      Interest.countDocuments(),
      Relationship.countDocuments(),
      Purchase.countDocuments(),
      Product.find({}).sort({ rating: -1, reviewsCount: -1 }).limit(4),
      Purchase.find({}).sort({ purchaseDate: -1 }).limit(5)
    ]);

    // Breakdown of relationships by type
    const relationshipBreakdown = await Relationship.aggregate([
      { $group: { _id: '$relationshipType', count: { $sum: 1 } } }
    ]);

    const dbStatus = getDBStatus();

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalCustomers,
        totalCategories,
        totalInterests,
        totalRelationships,
        totalPurchases,
        recommendationRulesCount: 4,
        relationshipBreakdown: relationshipBreakdown.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {})
      },
      popularProducts,
      recentPurchases,
      dbStatus
    });
  } catch (error) {
    next(error);
  }
};
