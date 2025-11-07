const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  image: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  order: {
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
projectSchema.pre('save', function(next) {
  if (!this.isModified('title')) {
    return next();
  }
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  next();
});

module.exports = mongoose.model('Project', projectSchema); 