const mongoose = require('mongoose');

const submenuSchema = new mongoose.Schema({
  name: String,
  link: String, // Link for navigation
});

const menuSchema = new mongoose.Schema({
  name: String,
  submenus: [submenuSchema], // Array of submenu objects
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;