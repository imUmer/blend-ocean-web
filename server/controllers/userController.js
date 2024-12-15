const User = require('../models/User');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    // Add registration logic here
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Add login logic here
};

module.exports = { registerUser, loginUser };
