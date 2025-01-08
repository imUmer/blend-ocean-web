const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); // Import the User schema

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log('here');
  console.log(user);
    
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserById = asyncHandler(async (req, res) => {
  const { name, username, email, password, isAdmin, photoUrl } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = name || user.name;
  user.username = username || user.username;
  user.email = email || user.email;
  user.photoUrl = photoUrl || user.photoUrl;
  user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

  // Update password only if it's provided
  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    message: "User updated successfully",
    user: updatedUser,
  });
});

// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({ message: "User deleted successfully" });
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};