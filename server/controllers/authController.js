const User = require("../models/userModel");
const isValidPassword = require("../utils/passwordValidation");
const isValidEmail = require("../utils/emailValidator");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    // Check if all fields are provided
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    if (!isValidEmail(email)) {
      res.status(400);
      throw new Error("Invalid email format");
    }

    if (username.length < 3) {
      res.status(400);
      throw new Error("Username must be at least 3 characters long");
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
      throw new Error("User already exists");
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password,
      isAdmin: isAdmin || false,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Log in a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }); // Store refresh token in an HTTP-only cookie

    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
// @desc    Log in a with Google
// @route   POST /api/auth/google
// @access  Public
const google = asyncHandler(async (req, res, next) => {
  const { name, email, photoUrl } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }); // Store refresh token in an HTTP-only cookie

    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: accessToken,
    });
  } else {
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
    const username =
      req.body.name.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-4);

    // Create a new user
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      photoUrl,
      isAdmin: false,
    });
    await user.save();

    // Generate tokens for the user
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Respond with user details and access token
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: accessToken,
    });
  }
});

const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Retrieve refresh token from cookies

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Refresh token missing, please log in again" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = { registerUser, loginUser, google, refreshAccessToken };
