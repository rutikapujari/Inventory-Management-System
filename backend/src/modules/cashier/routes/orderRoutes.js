const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const {
  createOrder,
  getOrders,
  //updateOrder,
  //deleteOrder,
} = require("../controllers/orderController");

// ================= CREATE ORDER =================

router.post(
  "/create",
  createOrder,
);

// ================= GET ORDERS =================

router.get(
  "/",
  getOrders,
);

// ================= UPDATE ORDER =================

// router.put(
//   "/update/:id",

//   protect,

//   authorizeRoles("cashier", "admin"),

//   updateOrder,
// );

// ================= DELETE ORDER =================

// router.delete(
//   "/delete/:id",

//   protect,

//   authorizeRoles("admin"),

//   deleteOrder,
// );

module.exports = router;
