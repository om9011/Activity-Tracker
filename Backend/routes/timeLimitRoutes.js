const express = require('express');
const router = express.Router();
const { setTimerForWebsite, removeTimerForWebsite } = require('../controllers/restrictController.js');

// POST route to set a time limit for a website
router.post('/', setTimerForWebsite);

// DELETE route to remove a time limit for a website
router.delete('/:id', removeTimerForWebsite);

module.exports = router;
