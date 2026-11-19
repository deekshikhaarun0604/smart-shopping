const graphService = require('../services/graphService');

exports.getGraph = async (req, res, next) => {
  try {
    const { customerId, productId, entityType } = req.query;
    const graphData = await graphService.getGraphData({
      customerId,
      productId,
      entityType
    });
    res.json({ success: true, ...graphData });
  } catch (error) {
    next(error);
  }
};
