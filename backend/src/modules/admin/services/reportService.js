const Order = require("../../../models/orders/Order");
const Product = require("../../../models/products/Product");
const User = require("../../../models/users/User");

// 📦 SALES REPORT
const getSalesReportService = async (filters = {}) => {
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.startDate && filters.endDate) {
    query.createdAt = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate),
    };
  }

  const orders = await Order.find(query).sort({ createdAt: -1 });

  return {
    totalOrders: orders.length,
    data: orders,
  };
};

// 💰 REVENUE REPORT
const getRevenueReportService = async (filters = {}) => {
  const match = {};

  if (filters.startDate && filters.endDate) {
    match.createdAt = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate),
    };
  }

  const revenue = await Order.aggregate([
    { $match: match },
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

// 📉 INVENTORY REPORT
const getInventoryReportService = async () => {
  const products = await Product.find();

  const lowStock = products.filter(p => p.stock < 10);
  const outOfStock = products.filter(p => p.stock === 0);

  return {
    totalProducts: products.length,
    lowStockCount: lowStock.length,
    outOfStockCount: outOfStock.length,
    lowStockProducts: lowStock,
    outOfStockProducts: outOfStock,
  };
};

// 👥 USER REPORT
const getUserReportService = async () => {
  const totalUsers = await User.countDocuments();

  const activeUsers = await User.countDocuments({
    isActive: true,
  });

  const inactiveUsers = totalUsers - activeUsers;

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
  };
};

module.exports = {
  getSalesReportService,
  getRevenueReportService,
  getInventoryReportService,
  getUserReportService,
};