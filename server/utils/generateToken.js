const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d", // Example: 7 days expiration
    }
  );
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  ); // Short-lived token
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  ); // Long-lived token
};

module.exports = {generateToken, generateAccessToken, generateRefreshToken};
