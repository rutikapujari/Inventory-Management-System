const mongoose = require("mongoose");

const dashboardStatsSchema = new mongoose.Schema(
  {
    totalUsers: {
      type: Number,
      default: 0,
    },

    totalProducts: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },

    totalRevenue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("DashboardStats", dashboardStatsSchema);
