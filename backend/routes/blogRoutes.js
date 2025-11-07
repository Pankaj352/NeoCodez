const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Protected routes (admin only)
router.post('/', protect, admin, createBlog);
router.put('/:id', protect, admin, updateBlog);
router.delete('/:id', protect, admin, deleteBlog);

module.exports = router; 