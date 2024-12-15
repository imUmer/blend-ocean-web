
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config({ path: '../.env' });  // Load .env file from the root directory


const app = express();

app.use(cors());
app.use(bodyParser.json());

const connectDB = require('./config/db');
connectDB();


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
