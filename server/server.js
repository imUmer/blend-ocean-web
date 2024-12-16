// server.js
require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/db');  // Import DB connection
const cors = require('cors');  // For handling cross-origin requests
const apiRoutes = require('./routes/api'); // Import API routes
const userRoutes = require('./routes/userRoutes'); 
const authRoutes = require('./routes/authRoutes'); 

const app = express();  // Create an Express app

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable CORS for handling cross-origin requests

//// Use API routes
// auth routes
app.use('/api/auth', authRoutes); 
// Test Api 
app.use('/api', apiRoutes);
// User Api 
app.use('/api/user', userRoutes);


// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5001;  // Default to 5001 if no port is specified
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
