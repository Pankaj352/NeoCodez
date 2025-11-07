const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  readTime: {
    type: Number,
    default: 10,
  },
  views: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps: true,
});

// Create slug from title before saving
guideSchema.pre('save', function(next) {
  if (!this.isModified('title')) {
    return next();
  }
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  next();
});

module.exports = mongoose.model('Guide', guideSchema); 