const User = require('../models/userModel');
const isValidPassword = require('../utils/passwordValidation');
const isValidEmail = require('../utils/emailValidator');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;
  try {

    // Check if all fields are provided
    if (!username || !email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }

    if (!isValidEmail(email)) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    if (username.length < 3) {
      res.status(400);
      throw new Error('Username must be at least 3 characters long');
    }

    // Existing password validation function
    // if (!isValidPassword(password)) {
    //   res.status(400);
    //   throw new Error(
    //     'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    //   );
    // }

    // Check if user already exists
    const userExists = await User.findOne({ username, email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
 
    // Create a new user
    const user = new User({ username, email, password, isAdmin: isAdmin || false, });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Log in a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});


module.exports = { registerUser, loginUser };