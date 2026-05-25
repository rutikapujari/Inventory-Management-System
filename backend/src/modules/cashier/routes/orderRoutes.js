const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// ================= MIDDLEWARES =================

const protect = require("../../../middlewares/authMiddleware");

const authorizeRoles = require("../../../middlewares/roleMiddleware");

// ================= CREATE ORDER =================

router.post(
  "/create",

  protect,

  authorizeRoles("cashier", "admin"),

  createOrder,
);

// ================= GET ORDERS =================

router.get(
  "/",

  protect,

  authorizeRoles("cashier", "admin"),

  getOrders,
);

// ================= UPDATE ORDER =================

router.put(
  "/update/:id",

  protect,

  authorizeRoles("cashier", "admin"),

  updateOrder,
);

// ================= DELETE ORDER =================

router.delete(
  "/delete/:id",

  protect,

  authorizeRoles("admin"),

  deleteOrder,
);

module.exports = router;
