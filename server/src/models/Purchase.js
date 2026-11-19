const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    customerName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'COMPLETED' },
    purchaseDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Purchase', purchaseSchema);
