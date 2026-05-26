const Order = require("../../../models/orders/Order");
const User = require("../../../models/users/User");
const Product = require("../../../models/products/Product");

// 💰 REVENUE ANALYTICS
const getRevenueAnalyticsService = async () => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  return revenue[0] || { totalRevenue: 0, totalOrders: 0 };
};

// 📦 SALES ANALYTICS
const getSalesAnalyticsService = async () => {
  const sales = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  return sales;
};

// 👥 USER ANALYTICS
const getUserAnalyticsService = async () => {
  const totalUsers = await User.countDocuments();

  const activeUsers = await User.countDocuments({
    isActive: true,
  });

  return {
    totalUsers,
    activeUsers,
  };
};

// 📦 INVENTORY ANALYTICS
const getInventoryAnalyticsService = async () => {
  const lowStockProducts = await Product.find({
    stock: { $lt: 10 },
  });

  const totalProducts = await Product.countDocuments();

  return {
    lowStockProductsCount: lowStockProducts.length,
    totalProducts,
  };
};

module.exports = {
  getRevenueAnalyticsService,
  getSalesAnalyticsService,
  getUserAnalyticsService,
  getInventoryAnalyticsService,
};