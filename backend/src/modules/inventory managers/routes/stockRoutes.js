const express = require("express");

const router = express.Router();

const {
  createStock,
  getStocks,
} = require("../controllers/stockController");

router.post("/", createStock);
router.get("/", getStocks);

module.exports = router;
