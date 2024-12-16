const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ 
      id: user._id, 
      name: user.username, 
      email: user.email
   }, 
   process.env.JWT_SECRET, {
  expiresIn: '7d', // Example: 7 days expiration
  });
};

module.exports = generateToken;