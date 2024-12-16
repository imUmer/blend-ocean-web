const User = require('../models/User');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const user = new User({
        username,
        email,
        password,
      });
  
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Add login logic here
};

const createUser = async (req, res) => {
    const { email, password } = req.body;
    // Add login logic here
};

module.exports = { registerUser, loginUser };
