const express = require('express');
const router = express.Router();
const { sendContactForm } = require('../controllers/contactController');

// Public route
router.post('/', sendContactForm);

module.exports = router; 