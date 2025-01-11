const express = require('express');
const {getAllMenus, createMenu, updateMenu, deleteMenu, createSubMenu, createItem} = require('../controllers/menuController');
const { protect, admin } = require("../middlewares/authMiddleware"); // Protect routes with middleware
const router = express.Router();

// Menu
// Routes for Menu CRUD operations 
router.post("/create",protect, admin, createMenu); // Create a new menu
router.post("/createsub",protect, admin, createSubMenu); // Create a new menu
router.post("/item",protect, admin, createItem); // Create a new menu
router.get("/", getAllMenus); // Get all menus
router.put("/:id",protect, admin, updateMenu); // Update a menu by ID
router.delete("/:id",protect, admin, deleteMenu); // Delete a menu by ID

module.exports = router;