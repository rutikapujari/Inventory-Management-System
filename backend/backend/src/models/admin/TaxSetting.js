const mongoose = require("mongoose");

const taxSettingSchema = new mongoose.Schema(
  {
    taxName: {
      type: String,
      default: "GST",
    },

    taxPercentage: {
      type: Number,
      default: 18,
    },

    taxNumber: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TaxSetting", taxSettingSchema);
