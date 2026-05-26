const Stock = require("../../../models/inventaryManagers/Stock");


// Create Stock
const createStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);

    res.status(201).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Stocks
const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .populate("productId")
      .populate("warehouse");

    res.status(200).json({
      success: true,
      data: stocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createStock,
  getStocks,
};
