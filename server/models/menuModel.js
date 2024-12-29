const mongoose = require('mongoose');


// Define submenu schema
const submenuSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  subname: { type: String, required: true },
  count: { type: Number, required: true },
  path: { type: String, required: true },
});

const menuSchema = new mongoose.Schema({
  id: Number,
  name: String,
  submenus: [], // Array of submenu objects
  path: String,
});

const Submenu = mongoose.model("Submenu", submenuSchema);
const Menu = mongoose.model('Menu', menuSchema);
module.exports = {Menu, Submenu};