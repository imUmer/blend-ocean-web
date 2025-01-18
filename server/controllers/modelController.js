const asyncHandler = require('express-async-handler');
const Model = require('../models/modelModel');
const {Menu} = require('../models/menuModel');


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


// @desc    Get Early Access models
// @route   GET /api/model/eamodels
// @access  Public
const getEAModel = asyncHandler(async (req, res) => {
  try {
    // Fetch only models that have earlyAccess set to true
    const models = await Model.find({ earlyAccess: true }).lean();

    // If no models are found
    if (models.length === 0) {
      return res.status(404).json({ message: 'No models found with early access.' });
    }

    // Return the models with early access
    res.json(models);
  } catch (error) {
    console.error('Failed to fetch early access models:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @desc    Get single model
// @route   GET /api/models/:id
// @access  Public
const getModel = asyncHandler(async (req, res) => {

  try {
    // Fetch only model 
    const model = await Model.findById(req.params.id);

    if (model) {
      res.status(200).json(model);
    } else {
      return res.status(404).json({ message: 'No models found.' });
    }

  } catch (error) {
    console.error('Failed to model:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @desc    Get all models
// @route   GET /api/model/
// @access  Public
const getAllModel = asyncHandler(async (req, res) => {
  try {
    // Query parameters for filtering
    const { type, category, images, isNew, earlyAccess } = req.query;
    console.log(category);
    
    // Build query filters
    const filters = {};
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (isNew !== undefined) filters.isNew = isNew === 'true';
    if (earlyAccess !== undefined) filters.earlyAccess = earlyAccess === 'true';
    
    // If images query is provided, filter by the presence of images
    if (images) filters.images = { $in: images.split(',') }; // Assuming images are passed as a comma-separated list

    // Fetch models from the database
    const models = await Model.find(filters).lean();

    // If no models are found
    if (models.length === 0) {
      return res.status(404).json({ message: 'No models found' });
    }

    // Return the models
    res.json(models);
  } catch (error) {
    console.error('Failed to fetch models:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// @desc    Get models with pagination
// @route   GET /api/models
// @access  Public
const getModels = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1; // Default to page 1
  const limit = Number(req.query.limit) || 8; // Default to 8 items per page
  const skip = (page - 1) * limit; // Calculate the number of documents to skip
  const earlyAccess = req.query.earlyaccess;
  console.log("modelController: " + earlyAccess);
   // Build query filters
   const filters = {};
   if (earlyAccess !== undefined) filters.earlyAccess = earlyAccess === 'true';

  try {
    const total = await Model.countDocuments(filters); // Get total number of models
    const models = await Model.find(filters).skip(skip).limit(limit); // Fetch models with pagination

    res.json({
      models,
      page,
      pages: Math.ceil(total / limit), // Total number of pages
      total,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching models');
  }
}); 

const searchModel = asyncHandler(async (req, res) => {
  try {
    // Extract query parameters
    const { searchTerm, page = 1, limit = 8, title, type, selectedType, selectedCollection, category, isNew, earlyAccess, images } = req.query;
    console.log(selectedType, selectedCollection);

    // Pagination setup
    const skip = (page - 1) * limit;

    // Initialize filters
    const filters = {};

    if (title) {
      filters.$or = [
        { title: { $regex: title, $options: "i" } },
      ];
    }

    if (category) {
      filters.$or = [
        { category: { $regex: category, $options: "i" } },
      ];
    }

    // Add specific filters if provided
    if (selectedType) filters.type = selectedType;
    if (category) filters.category = category;
    if (selectedCollection && selectedCollection !== "All") filters.collection = selectedCollection;

    if (earlyAccess !== undefined) filters.earlyAccess = earlyAccess === 'true';
    // Add regex-based search for `title` and `category`
    if (searchTerm) {
      filters.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ]
    console.log('addddd');
  }
    else{
      const total = await Model.countDocuments(filters);
      const models = await Model.find(filters).skip(skip).limit(Number(limit)).lean();
      res.json({
        models,
        page: Number(page),
        pages: Math.ceil(total / limit),
        total,
      });
      return;
    }

    console.log(filters.collection);

    // if (isNew !== undefined) filters.isNew = isNew === 'true';

    // Filter by images if provided (assumes comma-separated list)
    if (images) filters.images = { $in: images.split(",") };

    // Fetch total count and filtered models
    const total = await Model.countDocuments(filters);
    const models = await Model.find(filters).skip(skip).limit(Number(limit)).lean();
    console.log(models);
    
    // Respond with paginated results
    res.json({
      models,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ success: false, message: "Error fetching models" });
  }
});



// @desc    Create a new asset
// @route   POST /api/model/create
// @access  Public
const createModel = async (req, res, next) => {
  const { 
    type,
    title,
    category,
    categoryId,
    collection,
    collectionId,
    images=[],
    assetImagesId,
    releaseDate, // Optional; defaults to current date
    downloads = 0, // Optional; defaults to 0
    exportFormats,
    earlyAccess, // Optional; defaults to false
    isNew = true,
  } = req.body;
  let contentType = "";
  let buffer = "";
  try {
    if (!type || !title || !category || !collection ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (images[0] !== "") {
      const base64Image = images[0];
      // Extract the content type and base64 string
      const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "something gose wrong!!" });
      }
      contentType = matches[1]; // e.g., "image/png"
      const base64Data = matches[2]; // The actual base64 string

      // Convert base64 string to Buffer
      buffer = Buffer.from(base64Data, "base64");
    }
    console.log(contentType, buffer);
    
    // Create a new model
    const model = new Model({
      type,
      title,
      category,
      collection,
      contentType:contentType,
      images:buffer,
      assetImagesId,
      releaseDate: releaseDate || Date.now(), // Use provided release date or current date
      downloads,
      exportFormats,
      earlyAccess,
      isNew,
    });


    // Save the model to the database
    await model.save();

    // // increment the category and collection count to the database
    const categoryCount = await Menu.findById(categoryId);
    const collectionCount = await Menu.findById(collectionId);
    categoryCount.count = categoryCount.count + 1;
    collectionCount.count = collectionCount.count + 1;
    await categoryCount.save();
    await collectionCount.save();

    res.status(201).json({ message: 'Model created successfully', model });
  } catch (error) {
    next(error);
    console.log(error);
    
  }
};

// @desc    update a asset
// @route   POST /api/models/:id
// @access  Private Admin
const updateModel = async (req, res, next) => {
  const { 
    type,
    title,
    category,
    categoryId,
    collection,
    collectionId,
    images=[],
    assetImagesId,
    releaseDate, // Optional; defaults to current date
    downloads = 0, // Optional; defaults to 0
    exportFormats,
    earlyAccess, // Optional; defaults to false
    isNew = true,
  } = req.body;
  console.log(type, req.params.id);
  
  let contentType = "";
  let buffer = "";
  try {
    if (!type || !title || !category || !collection ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (images[0] !== "") {
      const base64Image = images[0];
      // Extract the content type and base64 string
      const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "something gose wrong!!" });
      }
      contentType = matches[1]; // e.g., "image/png"
      const base64Data = matches[2]; // The actual base64 string

      // Convert base64 string to Buffer
      buffer = Buffer.from(base64Data, "base64");
    }
    console.log(contentType, buffer);
    

    // Update Asset
    await Model.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          type,
          title,
          category,
          categoryId,
          collection,
          collectionId,
          contentType,
          images:buffer,
          assetImagesId,
          releaseDate, 
          downloads, 
          exportFormats,
          earlyAccess, 
          isNew,
        },
      },
      { new: true }
    )

    // Updated the Asset to the database
    res.status(200).json(
      { 
        message: "Asset updated successfully",
      }
    );

  } catch (error) {
    next(error);
    console.log(error);
    
  }
};

// @desc    Delete a model by ID (Admin only)
// @route   DELETE /api/model/:id
// @access  Private/Admin
const deleteModel = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.params.id);

  if (model) {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Model removed successfully' });
  } else {
    res.status(404);
    throw new Error('Model not found');
  }
});

module.exports = {
  getAllModel,
  getEAModel,
  createModel,
  updateModel,
  deleteModel,
  getModels,
  getModel,
  searchModel,
};
