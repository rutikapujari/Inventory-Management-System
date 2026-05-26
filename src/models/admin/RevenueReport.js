const mongoose = require("mongoose");

const revenueReportSchema = new mongoose.Schema(
  {
    monthlyRevenue: {
      type: Number,
      default: 0,
    },

    yearlyRevenue: {
      type: Number,
      default: 0,
    },

    taxCollected: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("RevenueReport", revenueReportSchema);
