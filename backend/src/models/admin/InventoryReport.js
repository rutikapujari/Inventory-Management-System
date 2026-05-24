const mongoose = require("mongoose");

const inventoryReportSchema = new mongoose.Schema(
  {
    totalProducts: {
      type: Number,
      default: 0,
    },

    lowStock: {
      type: Number,
      default: 0,
    },

    warehouseData: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("InventoryReport", inventoryReportSchema);
