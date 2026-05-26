const Product = require("../../../models/inventaryManagers/Product");
const Category = require("../../../models/inventaryManagers/Category");
const Supplier = require("../../../models/inventaryManagers/Supplier");
const Stock = require("../../../models/inventaryManagers/Stock");


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
