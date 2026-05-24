// controllers/analyticsController.js

const Product = require("../../../models/inventaryManagers/Product");
const Category = require("../../../models/inventaryManagers/Category");
const Supplier = require("../../../models/inventaryManagers/Supplier");
const PurchaseOrder = require("../../../models/inventaryManagers/PurchaseOrder");


// ================= GET ANALYTICS =================

const getAnalytics = async (req, res) => {
  try {

    // Total Products
    const totalProducts = await Product.countDocuments();

    // Total Categories
    const totalCategories = await Category.countDocuments();

    // Total Suppliers
    const totalSuppliers = await Supplier.countDocuments();

    // Total Purchase Orders
    const totalPurchaseOrders = await PurchaseOrder.countDocuments();

    // Total Stock Value
    const products = await Product.find();

    let totalStockValue = 0;

    products.forEach((product) => {
      totalStockValue += product.stock * product.sellingPrice;
    });

    // Low Stock Products
    const lowStockProducts = await Product.find({
      stock: { $lt: 10 },
    });

    // Recent Purchase Orders
    const recentOrders = await PurchaseOrder.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      analytics: {
        totalProducts,
        totalCategories,
        totalSuppliers,
        totalPurchaseOrders,
        totalStockValue,
        lowStockCount: lowStockProducts.length,
        recentOrders,
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
  getAnalytics,
};
