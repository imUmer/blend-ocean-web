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
  console.log(name, parentId, category);

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
    count: count || 0, // Default to 0 if not provided
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
    res.status(200).json({updatedMenu, ok:"ok"});
  } else {
    res.status(404);
    throw new Error("Menu item not found");
  }
});

// @desc    Delete a menu, submenu, or item by ID
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the entity by ID
  const entity = await Menu.findById(id);

  if (!entity) {
    res.status(404);
    throw new Error("Entity not found");
  }

  // If it's a top-level menu, delete all related submenus and items
  if (entity.category === "menu") {
    // Find all submenus related to this menu
    const submenus = await Menu.find({ parentId: id, category: "submenu" });

    for (const submenu of submenus) {
      // Delete all items related to the submenu
      await Menu.deleteMany({ parentId: submenu._id, category: "item" });
    }

    // Delete all submenus related to this menu
    await Menu.deleteMany({ parentId: id, category: "submenu" });

    // Delete the menu itself
    await Menu.findByIdAndDelete(id);

    res.status(200).json({ message: "Menu and related submenus/items deleted successfully", ok:"ok" });
    return;
  }

  // If it's a submenu, delete all related items and update the parent's count
  if (entity.category === "submenu") {
    // Delete all items related to the submenu
    await Menu.deleteMany({ parentId: id, category: "item" });

    // Delete the submenu itself
    await Menu.findByIdAndDelete(id);

    // Update the count for the parent menu
    const parentMenuId = entity.parentId;
    const remainingSubmenus = await Menu.find({ parentId: parentMenuId, category: "submenu" });

    // Sum the counts of remaining submenus
    const totalSubmenuCount = remainingSubmenus.reduce((sum, submenu) => sum + (submenu.count || 0), 0);
    await Menu.findByIdAndUpdate(parentMenuId, { count: totalSubmenuCount });

    res.status(200).json({ message: "Submenu and related items deleted successfully", ok:"ok" });
    return;
  }

  // If it's an item, update counts for its parent submenu
  if (entity.category === "item") {
    // Delete the item
    await Menu.findByIdAndDelete(id);

    // Update the count for the parent submenu
    const parentSubmenuId = entity.parentId;

    // Get all remaining items in the submenu
    const remainingItems = await Menu.find({ parentId: parentSubmenuId, category: "item" });

    // Sum the counts of remaining items
    const totalItemCount = remainingItems.reduce((sum, item) => sum + (item.count || 0), 0);
    await Menu.findByIdAndUpdate(parentSubmenuId, { count: totalItemCount });

    res.status(200).json({ message: "Item deleted and submenu count updated successfully", ok:"ok" });
    return;
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
