const express = require("express");

const router = express.Router();

const protect = require("../../../middlewares/authMiddleware");

const authorizeRoles = require("../../../middlewares/roleMiddleware");

const { getOrders } = require("../controllers/orderController");

router.get("/orders", protect, authorizeRoles("cashier"), getOrders);

module.exports = router;
