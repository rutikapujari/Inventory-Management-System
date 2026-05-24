const express = require("express");

const router = express.Router();

const {
  createPurchaseOrder,
  getPurchaseOrders,
} = require("../controllers/purchaseOrderController");

router.post("/", createPurchaseOrder);
router.get("/", getPurchaseOrders);

module.exports = router;
