const mongoose = require('mongoose');

const menuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu name is required'],
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      default: null, // Allows for null if it's a top-level menu
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['menu', 'submenu', 'item'], // Ensure valid values
    },
    count: {
      type: Number,
      default: null, // Allows null for top-level menus or submenus without count
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model('Menu', menuSchema);

module.exports = {Menu};
