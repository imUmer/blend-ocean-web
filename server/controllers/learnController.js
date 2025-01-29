const Learn = require("../models/learnModel");

// Fetch all tutorials
const getAllTutorials = async (req, res) => {
  try {
    const tutorials = await Learn.find();
    res.status(200).json(tutorials);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Fetch tutorials by category
const getByCategory = (req, res) => {
    const category = req.params.name; // Get category from URL
    console.log(category);
    res.json([category]);
    // Assuming you have a `Learn` model for the tutorials
    // Learn.find({ category: categoryName }) // Filter by category, not _id
    //   .then((tutorials) => {
    //     if (!tutorials.length) {
    //       return res.status(404).json({ message: "No tutorials found for this category" });
    //     }
    //     res.json(tutorials);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     res.status(500).json({ message: "Error fetching tutorials", error: err });
    //   });
  };
  

// Fetch a single tutorial by ID
const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Learn.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.status(200).json(tutorial);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Add a new tutorial
const createTutorial = async (req, res) => {
  try {
    const newTutorial = new Learn(req.body);
    await newTutorial.save();
    res.status(201).json(newTutorial);
  } catch (error) {
    res.status(400).json({ message: "Error creating tutorial", error });
  }
};

// Update a tutorial by ID
const updateTutorial = async (req, res) => {
  try {
    const updatedTutorial = await Learn.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.status(200).json(updatedTutorial);
  } catch (error) {
    res.status(500).json({ message: "Error updating tutorial", error });
  }
};

// Delete a tutorial by ID
const deleteTutorial = async (req, res) => {
  try {
    const deletedTutorial = await Learn.findByIdAndDelete(req.params.id);
    if (!deletedTutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.status(200).json({ message: "Tutorial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tutorial", error });
  }
};

// Export all controller functions
module.exports = {
  getAllTutorials,
  getByCategory,
  getTutorialById,
  createTutorial,
  updateTutorial,
  deleteTutorial
};