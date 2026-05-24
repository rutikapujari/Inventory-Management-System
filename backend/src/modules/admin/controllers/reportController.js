// controllers/reportController.js

const Product = require("../../../models/inventaryManagers/Product");

const PurchaseOrder = require("../../../models/inventaryManagers/PurchaseOrder");

const Supplier = require("../../../models/inventaryManagers/Supplier");


// ================= STOCK REPORT =================

const getStockReport = async (req, res) => {
  try {

    const products = await Product.find();

    res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= LOW STOCK REPORT =================

const getLowStockReport = async (req, res) => {
  try {

    const lowStockProducts = await Product.find({
      stock: { $lt: 10 },
    });

    res.status(200).json({
      success: true,
      totalLowStock: lowStockProducts.length,
      lowStockProducts,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= PURCHASE REPORT =================

const getPurchaseReport = async (req, res) => {
  try {

    const purchases = await PurchaseOrder.find()
      .populate("supplier")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalPurchases: purchases.length,
      purchases,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= SUPPLIER REPORT =================

const getSupplierReport = async (req, res) => {
  try {

    const suppliers = await Supplier.find();

    res.status(200).json({
      success: true,
      totalSuppliers: suppliers.length,
      suppliers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  getStockReport,
  getLowStockReport,
  getPurchaseReport,
  getSupplierReport,
};
