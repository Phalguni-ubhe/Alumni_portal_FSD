const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const { verifyToken } = require('../middleware/auth');

router.get('/directory', verifyToken(['student', 'alumni', 'admin']), alumniController.getDirectory);
router.post('/profile', verifyToken(['alumni']), alumniController.updateProfile);

module.exports = router;