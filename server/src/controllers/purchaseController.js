const Purchase = require('../models/Purchase');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Relationship = require('../models/Relationship');

exports.simulatePurchase = async (req, res, next) => {
  try {
    const { customerId, productId } = req.body;

    if (!customerId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'customerId and productId are required'
      });
    }

    const [customer, product] = await Promise.all([
      Customer.findById(customerId),
      Product.findById(productId)
    ]);

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if already purchased
    const alreadyPurchased = customer.purchaseHistory.some(
      p => (p.product && p.product.toString() === productId)
    );

    if (alreadyPurchased) {
      return res.status(400).json({
        success: false,
        message: `${customer.name} has already purchased "${product.name}"`
      });
    }

    // Create Purchase record
    const purchase = await Purchase.create({
      customer: customer._id,
      customerName: customer.name,
      product: product._id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      totalAmount: product.price,
      purchaseDate: new Date()
    });

    // Update Customer's purchase history
    customer.purchaseHistory.push({
      product: product._id,
      productName: product.name,
      price: product.price,
      purchaseDate: purchase.purchaseDate
    });
    await customer.save();

    // Dynamically insert PURCHASED relationship edge into Knowledge Graph
    await Relationship.create({
      fromId: customer._id.toString(),
      fromType: 'Customer',
      fromName: customer.name,
      toId: product._id.toString(),
      toType: 'Product',
      toName: product.name,
      relationshipType: 'PURCHASED',
      weight: 5,
      description: `${customer.name} purchased ${product.name}`
    });

    res.status(201).json({
      success: true,
      message: `Purchase completed! ${product.name} has been added to ${customer.name}'s purchase history. Knowledge Graph updated.`,
      data: {
        purchase,
        customerPurchasesCount: customer.purchaseHistory.length
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find({})
      .populate('customer', 'name email avatar')
      .populate('product', 'name category price image')
      .sort({ purchaseDate: -1 })
      .limit(30);

    res.json({ success: true, count: purchases.length, data: purchases });
  } catch (error) {
    next(error);
  }
};
