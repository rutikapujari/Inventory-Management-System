const mongoose = require("mongoose");

const revenueAnalyticsSchema = new mongoose.Schema(
  {
    dailyRevenue: {
      type: Number,
      default: 0,
    },

    monthlyRevenue: {
      type: Number,
      default: 0,
    },

    yearlyRevenue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("RevenueAnalytics", revenueAnalyticsSchema);
