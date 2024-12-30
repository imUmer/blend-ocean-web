const mongoose = require('mongoose');


// Define submenu schema
const submenuSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Parent menu ID
  name: { type: String, required: true }, // Parent menu name or submenu name
  subname: { type: String, required: true }, // Submenu name (e.g., "Furnitures")
  count: { type: Number, required: true }, // Item count
  path: { type: String, required: true }, // Submenu path
  submenus: [
    {
      id: { type: Number, required: true }, // Same as parent ID for nested submenus
      name: { type: String, required: true }, // Parent submenu name
      subname: { type: String, required: true }, // Nested submenu name (e.g., "Tables")
      count: { type: Number, required: true }, // Item count for nested submenu
      path: { type: String, required: true }, // Nested submenu path
      submenus: { type: Array, default: [] }, // Allow further nesting if required
    },
  ],
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