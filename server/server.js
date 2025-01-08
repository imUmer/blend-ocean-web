// server.js
const dotenv = require('dotenv'); // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/db');  // Import DB connection
const cors = require('cors');  // For handling cross-origin requests
const apiRoutes = require('./routes/api'); // Import API routes
const adminRoutes = require('./routes/adminRoutes'); // Import Admin routes
const userRoutes = require('./routes/userRoutes'); 
const authRoutes = require('./routes/authRoutes'); 
const menuRoutes = require('./routes/menuRoutes'); 
const modelRoutes = require('./routes/modelRoutes'); 
const errorHandler = require('./middlewares/errorHandler');

/// Create an Express app
const app = express();  

/// Get access env variables
dotenv.config();

/// Connect to MongoDB
connectDB();

/// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable CORS for handling cross-origin requests


///////  ADMIN ROUTES /////
// Admin Api 
app.use('/api/admin/', adminRoutes);

//// Use API routes
// auth routes
app.use('/api/auth', authRoutes); 
// Test Api 
app.use('/api', apiRoutes);
// User Api 
// app.use('/api/user', userRoutes);
app.use('/api/users', userRoutes);
// Menu Api 
app.use('/api/menu', menuRoutes);
// Model Api 
app.use('/api/models', modelRoutes);

/// Error handling middleware
app.use(errorHandler);  
console.log( process.env.MONGO_URI1);

/// Start the server
const PORT = process.env.PORT || 5001;  // Default to 5001 if no port is specified
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
