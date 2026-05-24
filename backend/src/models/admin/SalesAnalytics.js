const mongoose = require("mongoose");

const salesAnalyticsSchema = new mongoose.Schema(
  {
    totalSales: {
      type: Number,
      default: 0,
    },

    topSellingProducts: [
      {
        type: String,
      },
    ],

    salesGrowth: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SalesAnalytics", salesAnalyticsSchema);
