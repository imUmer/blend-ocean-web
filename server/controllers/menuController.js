const asyncHandler = require('express-async-handler');
const {Menu} = require('../models/menuModel');

// @desc    Create a new item under a submenu
// @route   POST /api/menu/item
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  const { name, category, parentId } = req.body;

  // Check if the submenu exists
  const submenu = await Menu.findById(parentId);
  if (!submenu || submenu.category !== 'submenu') {
    res.status(400);
    throw new Error('Parent submenu not found or invalid category.');
  }

  // Check if the item already exists under this submenu
  const existingItem = await Menu.findOne({ name, parentId: submenu._id });
  if (existingItem) {
    res.status(400);
    throw new Error('Item with this name already exists under this submenu.');
  }

  // Create item
  const item = new Menu({
    name,
    category: 'item',
    parentId: submenu._id,
    count: 1,  // Initial count for the item
  });

  const createdItem = await item.save();

  // Update submenu's count with the new item count
  submenu.count = submenu.count + 1;
  await submenu.save();

  res.status(201).json(createdItem);
});


// @desc    Create a new submenu
// @route   POST /api/menu
// @access  Private
const createSubMenu = asyncHandler(async (req, res) => {
  const { name, category, parentId } = req.body;

  // Check if the parent menu exists
  const parentMenu = await Menu.findById(parentId);
  if (!parentMenu || parentMenu.category !== 'menu') {
    res.status(400);
    throw new Error('Parent menu not found or invalid category.');
  }

  // Create submenu
  const submenu = new Menu({
    name,
    category: 'submenu',
    parentId: parentMenu._id,
    count: 0,  // Initial count
  });

  const createdSubMenu = await submenu.save();

  res.status(201).json(createdSubMenu);
});



// @desc    Create a new menu item
// @route   POST /api/menu
// @access  Private/Admin
const createMenu = asyncHandler(async (req, res) => {
  const { name, parentId, category, count } = req.body;

  // Validate required fields
  if (!name || !category) {
    res.status(400);
    throw new Error('Menu name and category are required');
  }

  // Check if a menu with the same name already exists
  const existingMenu = await Menu.findOne({ name });
  if (existingMenu) {
    res.status(400);
    throw new Error('A menu with the same name already exists');
  }

  // Create the menu
  const menu = new Menu({
    name,
    parentId: parentId || null, // Default to null if not provided
    category,
    count: count || null, // Default to null if not provided
  });

  const createdMenu = await menu.save();
  res.status(201).json(createdMenu);
});


// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getAllMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find().populate("parentId").exec();
  res.status(200).json(menus);
});

// @desc    Update a menu item by ID
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, count } = req.body;

  const menu = await Menu.findById(id);

  if (menu) {
    menu.name = name || menu.name;
    menu.category = category || menu.category;
    menu.count = count !== undefined ? count : menu.count;

    const updatedMenu = await menu.save();
    res.status(200).json(updatedMenu);
  } else {
    res.status(404);
    throw new Error("Menu item not found");
  }
});

// @desc    Delete a menu by ID
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const menu = await Menu.findById(id);
  
  if (menu) {
    await Menu.findByIdAndDelete(id);
    res.status(200).json({ message: "Menu removed successfully", ok:"ok" });
  } else {
    res.status(404);
    throw new Error("Menu item not found");
  }
});

module.exports = {
  createMenu,
  getAllMenus,
  updateMenu,
  deleteMenu,
  createSubMenu,
  createItem,
};
