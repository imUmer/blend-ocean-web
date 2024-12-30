const asyncHandler = require('express-async-handler');
const {Menu, Submenu} = require('../models/menuModel');
const bcrypt = require('bcryptjs');

// @desc    Get logged-in menu
// @route   GET /api/menu/
// @access  Menu
const getMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.user.id);

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all menu
// @route   GET /api/menu
// @access  Public
const getAllMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.find(); 
  res.json(menu);
});

// @desc    Create a new menu
// @route   POST /api/menu/create
// @access  Public
const createMenu = async (req, res, next) => {
  const { name, submenus } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Please provide a Menu name' });
  }

  try {
    // Find the menu with the highest ID
    const lastMenu = await Menu.findOne().sort({ id: -1 }).exec();
    const newId = lastMenu ? lastMenu.id + 1 : 1; // Increment ID or start with 1

    // Create a new menu
    const menu = new Menu({
      id: newId,
      name,
      submenus: submenus || [], // Default to an empty array if submenus are not provided
      path: `/${name.toLowerCase().replace(/\s+/g, '-')}` // Auto-generate the path
    });

    await menu.save();

    res.status(201).json({ message: 'Menu created successfully', menu });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a menu by ID (Admin only)
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (menu) {
    await menu.remove();
    res.json({ message: 'Menu removed successfully' });
  } else {
    res.status(404);
    throw new Error('Menu not found');
  }
});

// @desc    Create Submenus for an existing Menu
// @route   POST /api/menu/:menuId/submenu/create
// @access  Private/Admin
const createSubMenu = asyncHandler(async (req, res, next) => {
  const { menuId } = req.params; // Parent menu ID
  const { submenus } = req.body; // Submenu data to add

  if (!menuId || !submenus || submenus.length === 0) {
    return res.status(400).json({ message: 'Please provide a valid Menu ID and submenus' });
  }

  try {
    // Verify the parent menu exists
    const parentMenu = await Menu.findOne({ id: Number(menuId) });
    if (!parentMenu) {
      return res.status(404).json({ message: 'Parent Menu not found' });
    }

    const documents = []; // Store submenu documents to be created

    // Process each submenu
    submenus.forEach((submenu) => {
      const parentPath = parentMenu.name.toLowerCase().replace(/\s+/g, "-"); // Convert parent menu name to path format
      const submenuPath = `/${parentPath}/${submenu.name.toLowerCase().replace(/\s+/g, "-")}`;

      // Process nested submenus, if present
      const nestedSubmenus = [];
      let totalCount = submenu.count || 0; // Initialize total count for nested submenus

      if (submenu.submenus && submenu.submenus.length > 0) {
        submenu.submenus.forEach((nested) => {
          const nestedPath = `${submenuPath}/${nested.subname.toLowerCase().replace(/\s+/g, "-")}`;
          totalCount += nested.count;
          nestedSubmenus.push({
            id: Number(menuId), // Parent menu ID for nested submenu
            name: submenu.name, // Parent submenu name
            subname: nested.subname, // Nested submenu name
            count: nested.count, // Nested submenu count
            path: nestedPath, // Nested submenu path
            submenus: [], // Further nesting can be added if required
          });
        });
      }

      // Push the processed submenu with its nested submenus
      documents.push({
        id: Number(menuId),
        name: parentMenu.name,
        subname: submenu.name, // Submenu name
        count: totalCount, // Total count including nested submenus
        path: submenuPath, // Path for the submenu
        submenus: nestedSubmenus, // Nested submenus
      });
    });

    // Insert documents into Submenu collection
    await Submenu.insertMany(documents);

    res.status(201).json({ message: 'Submenus created successfully', submenus: documents });
  } catch (error) {
    next(error);
  }
});

// @desc    Get Menu with Populated Submenus
// @route   GET /api/menu/:menuId
// @access  Public
const getMenuWithSubmenus = asyncHandler(async (req, res) => {
  const { menuId } = req.params;

  try {
    // Find the menu by ID
    const menu = await Menu.findOne({ id: Number(menuId) });
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    // Fetch submenus associated with this menu ID
    const submenus = await Submenu.find({ id: Number(menuId) });

    // Attach the submenus directly to the menu object
    const result = {
      ...menu.toObject(), // Convert Mongoose document to plain JS object
      submenus: submenus.map((submenu) => ({
        id: submenu.id,
        name: submenu.name,
        subname: submenu.subname,
        count: submenu.count,
        path: submenu.path,
        submenus: submenu.submenus, // Nested submenus
      })),
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = {
  getAllMenu,
  createMenu,
  deleteMenu,
  createSubMenu,
  getMenuWithSubmenus,
};
