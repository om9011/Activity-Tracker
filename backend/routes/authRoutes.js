const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController.js');

// Description: Register a new user
router.post('/register', register);

// Description: User login
router.post('/login', login);

module.exports = router;
