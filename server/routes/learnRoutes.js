const express = require("express");
const router = express.Router();
const { 
  getAllTutorials, getByCategory, getTutorialById, createTutorial, updateTutorial, deleteTutorial 
} = require("../controllers/learnController"); // Destructuring functions directly

// Define routes /users/:id
router.get("/", getAllTutorials); // Directly using the function
router.get("/category/:name", getByCategory); // Directly using the function
router.get("/:id", getTutorialById); // Directly using the function
router.post("/", createTutorial); // Directly using the function
router.put("/:id", updateTutorial); // Directly using the function
router.delete("/:id", deleteTutorial); // Directly using the function

module.exports = router;