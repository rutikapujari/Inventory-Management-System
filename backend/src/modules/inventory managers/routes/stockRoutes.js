const express = require("express");

const router = express.Router();

const {
  createStock,
  getStocks,
} = require("../controllers/stockController");
const validationHandler = require("../middleware/validationHandler");
const {
  addStockValidation,
} = require("../validations/stockValidation");


// Create Stock
router.post("/", addStockValidation, validationHandler, createStock);


// Get All Stocks
router.get("/", getStocks);


module.exports = router;
