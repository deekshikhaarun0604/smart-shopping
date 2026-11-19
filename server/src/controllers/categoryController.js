const Category = require('../models/Category');
const Interest = require('../models/Interest');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

exports.getAllInterests = async (req, res, next) => {
  try {
    const interests = await Interest.find({}).sort({ name: 1 });
    res.json({ success: true, count: interests.length, data: interests });
  } catch (error) {
    next(error);
  }
};
