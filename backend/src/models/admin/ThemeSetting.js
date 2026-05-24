const mongoose = require("mongoose");

const themeSettingSchema = new mongoose.Schema(
  {
    themeName: {
      type: String,
      default: "Light",
    },

    primaryColor: {
      type: String,
      default: "#000000",
    },

    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ThemeSetting", themeSettingSchema);
