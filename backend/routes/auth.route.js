// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/auth.controller.js');
const auth = require('../middleware/auth.middleware.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
