const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken(['student', 'alumni', 'admin']), eventController.getAllEvents);
router.post('/:eventId/register', verifyToken(['student']), eventController.registerForEvent);

module.exports = router;