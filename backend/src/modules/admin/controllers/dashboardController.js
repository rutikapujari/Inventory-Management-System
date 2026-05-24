// controllers/dashboardController.js

const Product = require("../../../models/inventaryManagers/Product");
const Category = require("../../../models/inventaryManagers/Category");
const Supplier = require("../../../models/inventaryManagers/Supplier");
const PurchaseOrder = require("../../../models/inventaryManagers/PurchaseOrder");

// ================= DASHBOARD STATS =================

const getDashboardStats = async (req, res) => {
  try {
    // Total Counts
    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalSuppliers = await Supplier.countDocuments();

    const totalPurchaseOrders = await PurchaseOrder.countDocuments();

    // Low Stock Products
    const lowStockProducts = await Product.find({
      stock: { $lt: 10 },
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalProducts,
        totalCategories,
        totalSuppliers,
        totalPurchaseOrders,
        lowStockCount: lowStockProducts.length,
        lowStockProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
