const express = require('express');
const {getAllMenus, createMenu, updateMenu, deleteMenu, createSubMenu, createItem} = require('../controllers/menuController');
const router = express.Router();

// Menu
// Routes for Menu CRUD operations 
router.post("/create", createMenu); // Create a new menu
router.post("/createsub", createSubMenu); // Create a new menu
router.post("/item", createItem); // Create a new menu
router.get("/", getAllMenus); // Get all menus
router.put("/:id", updateMenu); // Update a menu by ID
router.delete("/:id", deleteMenu); // Delete a menu by ID

module.exports = router;