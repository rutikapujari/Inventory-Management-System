const express = require("express");

const router = express.Router();

const {
  createPurchaseOrder,
  getPurchaseOrders,
} = require("../controllers/purchaseOrderController");
const validationHandler = require("../middleware/validationHandler");
const {
  createPOValidation,
} = require("../validations/poValidation");


// Create Purchase Order
router.post("/", createPOValidation, validationHandler, createPurchaseOrder);


// Get All Purchase Orders
router.get("/", getPurchaseOrders);


module.exports = router;
