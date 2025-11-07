const express = require('express');
const router = express.Router();
const {
  createGuide,
  getGuides,
  getGuideBySlug,
  getGuidesByProject,
  updateGuide,
  deleteGuide,
} = require('../controllers/guideController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getGuides);
router.get('/:slug', getGuideBySlug);
router.get('/project/:projectId', getGuidesByProject);

// Protected routes (admin only)
router.post('/', protect, admin, createGuide);
router.put('/:id', protect, admin, updateGuide);
router.delete('/:id', protect, admin, deleteGuide);

module.exports = router; 