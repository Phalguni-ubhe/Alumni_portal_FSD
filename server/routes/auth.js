const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Clean, readable routes that point to controller methods
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;