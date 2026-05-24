const Product = require("../../../models/inventaryManagers/Product");
const Category = require("../../../models/inventaryManagers/Category");
const Supplier = require("../../../models/inventaryManagers/Supplier");
const Stock = require("../../../models/inventaryManagers/Stock");


// Dashboard Summary
const getDashboardData = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalSuppliers = await Supplier.countDocuments();

    const totalStocks = await Stock.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalSuppliers,
        totalStocks,
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
  getDashboardData,
};
