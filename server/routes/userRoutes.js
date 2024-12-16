const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Get or Update logged-in user's profile
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin routes
router.get('/', protect, admin, getAllUsers); // Get all users
router.delete('/:id', protect, admin, deleteUser); // Delete user

module.exports = router;