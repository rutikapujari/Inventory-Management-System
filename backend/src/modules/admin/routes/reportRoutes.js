const express = require("express");

const router = express.Router();

const {
  getStockReport,
  getLowStockReport,
  getPurchaseReport,
  getSupplierReport,
} = require("../controllers/reportController");


// Stock Report
router.get("/stock", getStockReport);

// Low Stock Report
router.get("/low-stock", getLowStockReport);

// Purchase Report
router.get("/purchases", getPurchaseReport);

// Supplier Report
router.get("/suppliers", getSupplierReport);

module.exports = router;