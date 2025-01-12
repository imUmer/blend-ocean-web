const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  releaseDate: { type: Date, default: Date.now }, // Store the release date
  downloads: { type: Number, default: 0 },
  exportFormats: { type: [String], required: true }, // Array of formats (e.g., ['.obj', '.blend'])
  earlyAccess: { type: Boolean, default: false },
  isNew: { type: Boolean, default: true }, // Whether it's new or old
  images: { type: [String], default: [] }, 
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;