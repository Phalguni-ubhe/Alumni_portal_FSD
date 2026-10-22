const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middleware/auth');

// Apply admin-only guard to all routes in this file
router.use(verifyToken(['admin']));

router.get('/stats', adminController.getStats);
router.put('/users/:userId/suspend', adminController.suspendUser);

module.exports = router;