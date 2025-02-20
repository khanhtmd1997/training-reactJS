const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  children: {
    type: Array,
  },
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("categories", dataSchema);
