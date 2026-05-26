const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({
  errorMessage: {
    type: String,
    required: true,
  },

  stackTrace: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ErrorLog", errorLogSchema);
