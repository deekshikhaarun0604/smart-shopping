const Customer = require('../models/Customer');

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({}).populate('purchaseHistory.product');
    res.json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    next(error);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('purchaseHistory.product');
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};
