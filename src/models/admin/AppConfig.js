const mongoose = require("mongoose");

const appConfigSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      required: true,
    },

    version: {
      type: String,
      default: "1.0.0",
    },

    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("AppConfig", appConfigSchema);
