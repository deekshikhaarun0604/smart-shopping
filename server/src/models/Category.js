const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Folder' },
    color: { type: String, default: '#6366f1' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
