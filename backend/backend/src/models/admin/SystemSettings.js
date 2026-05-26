const mongoose = require("mongoose");

const systemSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    currency: {
      type: String,
      default: "INR",
    },

    language: {
      type: String,
      default: "English",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SystemSettings", systemSettingsSchema);
