const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 0 },
    image: { type: String, default: '' },
    description: { type: String, required: true },
    features: [{ type: String }],
    inStock: { type: Boolean, default: true },
    inventoryCount: { type: Number, default: 50 },
    badge: { type: String, default: '' },
    accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    matchingInterests: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
