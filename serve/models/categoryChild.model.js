const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  categoryId: {
    type: String,
  },
  name: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model("categoryChild", dataSchema);
