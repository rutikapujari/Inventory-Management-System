const mongoose = require("mongoose");

const salesReportSchema = new mongoose.Schema(
  {
    totalSales: {
      type: Number,
      default: 0,
    },

    profit: {
      type: Number,
      default: 0,
    },

    reportDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SalesReport", salesReportSchema);
