const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { protect, admin } = require('../middlewares/authMiddleware');

// @desc    Upload image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router; 