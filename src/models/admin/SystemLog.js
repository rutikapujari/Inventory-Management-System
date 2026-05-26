const mongoose = require("mongoose");

const systemLogSchema = new mongoose.Schema({
  logType: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SystemLog", systemLogSchema);
