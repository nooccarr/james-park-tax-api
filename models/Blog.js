const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Tax', 'Insurance'],
    },
    path: {
      type: String,
      required: true,
      enum: ['tax-info', 'insurance-info'],
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },

    article: {
      type: String,
      required: true,
    },
    hidden: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema);
