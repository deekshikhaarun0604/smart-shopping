const recommendationService = require('../services/recommendationService');

exports.generateRecommendations = async (req, res, next) => {
  try {
    const { customerId, weights } = req.body;
    if (!customerId) {
      return res.status(400).json({ success: false, message: 'customerId is required' });
    }

    const result = await recommendationService.generateRecommendations(customerId, weights);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.getCustomerRecommendations = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const result = await recommendationService.generateRecommendations(customerId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
