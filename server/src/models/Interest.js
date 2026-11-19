const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    categoryHint: { type: String, default: '' },
    color: { type: String, default: '#f59e0b' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interest', interestSchema);
