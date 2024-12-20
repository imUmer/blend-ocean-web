const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  console.log(user);
  
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      photoUrl: user.photoUrl,
      role: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.username = req.body.username || user.username;
//     user.email = req.body.email || user.email;
//     user.isAdmin = req.body.isAdmin || user.isAdmin;

//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(req.body.password, salt);
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser.id,
//       name: updatedUser.name,
//       username: updatedUser.username,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });
const updateUserProfile = asyncHandler(async (req, res) => {
  // const { id, username, email, password } = req.body;
  const user = await User.findById(req.body.id);
  
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.body.id,
    {
      $set: {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );

  // const { password, ...rest } = updatedUser._doc;

  res.status(200).json(
    { 
      username: updatedUser.username,
      email: updatedUser.email,
      message: "Profile updated successfully",}
  );
// res.json({
//   message: "here " + user.username + " id: " + user.email + " id: " + user.password + " id: " + id ,
// });
});

const updateUserProfile1 = asyncHandler(async (req, res) => {
  console.log('here');
  const { id, username, email, password } = req.body;
  
  // Find user by id
  const user = await User.findById(req.body.id);
  console.log(req.body);
  
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check if the password is being updated
  if (req.body.password) {
    // Hash the new password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Update the password with the hashed value
    user.password = hashedPassword;
  }

  // Update other user information (username, email)
  user.username = username || user.username;
  user.email = email || user.email;

  // Save the updated user details
  const updatedUser = await user.save();

  res.json({
    _id: updatedUser.id,
    username: updatedUser.username,
    email: updatedUser.email,
    message: "Profile updated successfully",
  });
});

//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjAyYjAzODVmMGM5OWJmOTMzODEzMiIsInVzZXJuYW1lIjoiYXNhIiwiZW1haWwiOiJhMUBhLmNvbSIsImlhdCI6MTczNDM4MjAwNCwiZXhwIjoxNzM0MzgyOTA0fQ.rmexVU4xiv-aov6MDnwWrGeeyosbesIVzVFf89UEDaA"


// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password'); // Exclude password field
  res.json(users);
});

// @desc    Delete a user by ID (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
