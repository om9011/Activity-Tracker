const express = require('express');
const router = express.Router();
const { addToRestrictedList, removeFromRestrictedList, setTimerForWebsite, removeTimerForWebsite } = require('../controllers/restrictController.js');
const { verifyToken } = require('../middlewares/authMiddleware');


// Description: Add a website to restricted list
router.post('/add', verifyToken, addToRestrictedList);

// Description: Remove a website from restricted list by ID
router.delete('/remove/:id', verifyToken, removeFromRestrictedList);

// Description: Set timer for a website
router.post('/timer', verifyToken, setTimerForWebsite);

// Description: Remove timer for a website by ID
router.delete('/timer/:id', verifyToken, removeTimerForWebsite);

module.exports = router;
