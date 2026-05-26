const mongoose = require("mongoose");

const inventoryAnalyticsSchema = new mongoose.Schema(
  {
    totalStock: {
      type: Number,
      default: 0,
    },

    lowStockProducts: [
      {
        type: String,
      },
    ],

    outOfStockProducts: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("InventoryAnalytics", inventoryAnalyticsSchema);
