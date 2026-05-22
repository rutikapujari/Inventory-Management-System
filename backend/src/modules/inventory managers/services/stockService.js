const Stock = require("../models/Stock");


// Create Stock
const createStockService = async (data) => {
  return await Stock.create(data);
};


// Get All Stocks
const getStocksService = async () => {
  return await Stock.find()
    .populate("product")
    .populate("warehouse");
};


module.exports = {
  createStockService,
  getStocksService,
};