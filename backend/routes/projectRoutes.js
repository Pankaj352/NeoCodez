const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Protected routes (admin only)
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);

module.exports = router; 