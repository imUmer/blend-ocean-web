const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/adminController");
const { protect, admin } = require("../middlewares/authMiddleware"); // Protect routes with middleware

// Admin routes
router.get("/users", protect, admin, getAllUsers); // Get all users
router.get("/users/:id", protect, admin, getUserById); // Get user by ID
router.put("/users/:id", protect, admin, updateUserById); // Update user by ID
router.delete("/users/:id", protect, admin, deleteUserById); // Delete user by ID

module.exports = router;