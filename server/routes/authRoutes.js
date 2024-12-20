const express = require('express');
const { registerUser, loginUser, google, refreshAccessToken } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', google);
router.post("/refresh-token", refreshAccessToken);

module.exports = router;