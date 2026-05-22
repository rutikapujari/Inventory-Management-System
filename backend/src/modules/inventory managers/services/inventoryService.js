const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");
const Stock = require("../models/Stock");


// Dashboard Data
const getDashboardService = async () => {

  const totalProducts =
    await Product.countDocuments();

  const totalCategories =
    await Category.countDocuments();

  const totalSuppliers =
    await Supplier.countDocuments();

  const totalStocks =
    await Stock.countDocuments();

  return {
    totalProducts,
    totalCategories,
    totalSuppliers,
    totalStocks,
  };
};


module.exports = {
  getDashboardService,
};