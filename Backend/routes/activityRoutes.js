const express = require('express');
const router = express.Router();
const { getUserActivities, recordActivity, getTodaysTimeSpent } = require('../controllers/activityController.js');
const { verifyToken } = require('../middlewares/authMiddleware.js');

// Route: POST /api/activities
// Description: Record user activity with middleware inside the request
router.post('/record', verifyToken, recordActivity);

// Route: GET /api/activities
// Description: Get user activities
router.get('/get', verifyToken, getUserActivities);


// Route to get today's time spent on each website
router.get('/today', verifyToken, getTodaysTimeSpent);

module.exports = router;
