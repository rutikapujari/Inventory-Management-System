const mongoose = require("mongoose");

const currencySettingSchema = new mongoose.Schema(
  {
    currencyName: {
      type: String,
      default: "Indian Rupee",
    },

    currencyCode: {
      type: String,
      default: "INR",
    },

    currencySymbol: {
      type: String,
      default: "₹",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CurrencySetting", currencySettingSchema);
