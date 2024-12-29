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
// @route   POST /api/auth/register
// @access  Public
const createMenu = async (req, res, next) => {
  const { name, submenus  } = req.body;

  try {
    const menu = new Menu({name, submenus});
    await menu.save();

    res.status(201).json({ message: 'Menu Created successfully' });
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

// @desc    Create a SubMenu by ID (Admin only)
// @route   Create /api/submenu/create
// @access  Private/Admin
const createSubMenu = asyncHandler(async (req, res, next) => {
  
  const { submenus  } = req.body;

  try {
    const data_submenus = new Submenu({submenus});
    // await data_submenus.save();

    await Submenu.deleteMany();

    const documents = [];

    submenus.forEach((submenu) => {
      const parentPath = submenu.name.toLowerCase().replace(/\s+/g, "-"); // Convert name to lowercase and hyphenate

      submenu.submenu.forEach((item) => {
        const path = `/${parentPath}/${item.name.toLowerCase()}`;
        documents.push({
          id: submenu.id,
          name: submenu.name,
          subname: item.name,
          count: item.count,
          path: path,
        });
      });
    });

    // Insert transformed data into MongoDB
    await Submenu.insertMany(documents);

    res.status(201).json({ message: 'SubMenu Created successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getAllMenu,
  createMenu,
  deleteMenu,
  createSubMenu,
};
