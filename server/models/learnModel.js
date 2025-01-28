const mongoose = require("mongoose");

const learnSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoSrc: { type: String },
  tutorial: { type: String, required: true },
  category: { type: String, required: true },
  categoryname: { type: String, required: true },
  date: { type: String },
  downloadLink: { type: String, required: true },
  supportLink: { type: String, required: true },
  isNew: {type: Boolean},
});

module.exports = mongoose.model("Learn", learnSchema);