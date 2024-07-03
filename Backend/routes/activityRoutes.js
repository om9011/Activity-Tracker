const express = require('express');
const router = express.Router();
const { getUserActivities, recordActivity } = require('../controllers/activityController.js');
const { verifyToken } = require('../middlewares/authMiddleware.js');

// Route: POST /api/activities
// Description: Record user activity with middleware inside the request
router.post('/record', verifyToken, recordActivity);

// Route: GET /api/activities
// Description: Get user activities
router.get('/get', verifyToken, getUserActivities);

module.exports = router;
