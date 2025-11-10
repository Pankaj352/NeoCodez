const express = require('express');
const router = express.Router();
const { sendContactForm, getContacts, deleteContact } = require('../controllers/contactController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Public route
router.post('/', sendContactForm);

// Admin routes
router.get('/', protect, admin, getContacts);
router.delete('/:id', protect, admin, deleteContact);

module.exports = router; 