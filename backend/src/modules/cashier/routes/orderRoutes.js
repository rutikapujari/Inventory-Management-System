const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/", getOrders);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);

module.exports = router;
