const mongoose = require("mongoose");

const userAnalyticsSchema = new mongoose.Schema(
  {
    totalAdmins: {
      type: Number,
      default: 0,
    },

    totalCashiers: {
      type: Number,
      default: 0,
    },

    totalInventoryManagers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("UserAnalytics", userAnalyticsSchema);
