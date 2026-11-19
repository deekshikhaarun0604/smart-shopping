const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema(
  {
    fromId: { type: String, required: true },
    fromType: {
      type: String,
      enum: ['Customer', 'Product', 'Category', 'Interest'],
      required: true
    },
    fromName: { type: String, required: true },
    toId: { type: String, required: true },
    toType: {
      type: String,
      enum: ['Customer', 'Product', 'Category', 'Interest'],
      required: true
    },
    toName: { type: String, required: true },
    relationshipType: {
      type: String,
      enum: [
        'PURCHASED',
        'INTERESTED_IN',
        'BELONGS_TO',
        'HAS_ACCESSORY',
        'RELATED_TO',
        'PREFERS',
        'MATCHES_INTEREST'
      ],
      required: true
    },
    weight: { type: Number, default: 1 },
    description: { type: String, default: '' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

// Indexes for fast graph traversal
relationshipSchema.index({ fromId: 1, relationshipType: 1 });
relationshipSchema.index({ toId: 1, relationshipType: 1 });
relationshipSchema.index({ fromType: 1, toType: 1 });

module.exports = mongoose.model('Relationship', relationshipSchema);
