const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    role: { type: String, default: 'Customer' },
    bio: { type: String, default: '' },
    preferredCategories: [{ type: String }],
    interests: [{ type: String }],
    purchaseHistory: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productName: { type: String },
        price: { type: Number },
        purchaseDate: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
