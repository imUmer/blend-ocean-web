const asyncHandler = require('express-async-handler');
const Model = require('../models/modelModel');


// the date setup dynamically
const getRelativeTime = (date) => {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // Time difference in seconds
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
  return `${Math.floor(diff / 31536000)} years ago`;
};



// @desc    Get single models
// @route   GET /api/model/:id
// @access  Public
const getModel = asyncHandler(async (req, res) => {
  try {
    // Query parameters for filtering and pagination
    const { type, category, isNew, earlyAccess, page = 1, limit = 10 } = req.query;

    // Build query filters
    const filters = {};
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (isNew !== undefined) filters.isNew = isNew === 'true';
    if (earlyAccess !== undefined) filters.earlyAccess = earlyAccess === 'true';

    // Paginate results
    const skip = (page - 1) * limit;

    // Fetch models from the database
    const models = await Model.find(filters).skip(skip).limit(parseInt(limit)).lean();

    // Add relative time for releaseDate
    const results = models.map((model) => ({
      ...model,
      release: getRelativeTime(new Date(model.releaseDate)), // Add relative release time
    }));

    // Count total documents for pagination
    const total = await Model.countDocuments(filters);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      results,
    });
  } catch (error) {
    console.error('Failed to fetch models:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @desc    Get all models
// @route   GET /api/model/
// @access  Public
const getAllModel = asyncHandler(async (req, res) => {
  try {
    // Query parameters for filtering and pagination
    const { type, category, isNew, earlyAccess, page = 1, limit = 10 } = req.query;

    // Build query filters
    const filters = {};
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (isNew !== undefined) filters.isNew = isNew === 'true';
    if (earlyAccess !== undefined) filters.earlyAccess = earlyAccess === 'true';

    // Paginate results
    const skip = (page - 1) * limit;

    // Fetch models from the database
    const models = await Model.find(filters).skip(skip).limit(parseInt(limit)).lean();

    // Add relative time for releaseDate
    const results = models.map((model) => ({
      ...model,
      release: getRelativeTime(new Date(model.releaseDate)), // Add relative release time
    }));

    // Count total documents for pagination
    const total = await Model.countDocuments(filters);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      results,
    });
  } catch (error) {
    console.error('Failed to fetch models:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @desc    Create a new model
// @route   POST /api/model/create
// @access  Public
const createModel = async (req, res, next) => {
  const { 
    type,
    title,
    category,
    releaseDate, // Optional; defaults to current date
    downloads = 0, // Optional; defaults to 0
    exportFormats,
    earlyAccess = false, // Optional; defaults to false
    isNew = true,
  } = req.body;

  try {
    if (!type || !title || !category || !exportFormats) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new model
    const model = new Model({
      type,
      title,
      category,
      releaseDate: releaseDate || Date.now(), // Use provided release date or current date
      downloads,
      exportFormats,
      earlyAccess,
      isNew,
    });

    // Save the model to the database
    await model.save();

    res.status(201).json({ message: 'Model created successfully', model });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a model by ID (Admin only)
// @route   DELETE /api/model/:id
// @access  Private/Admin
const deleteModel = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.params.id);

  if (model) {
    await model.remove();
    res.json({ message: 'Menu removed successfully' });
  } else {
    res.status(404);
    throw new Error('Menu not found');
  }
});

module.exports = {
  getAllModel,
  createModel,
  deleteModel,
};
