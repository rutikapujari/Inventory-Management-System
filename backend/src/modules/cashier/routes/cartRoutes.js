const express = require("express");
const router = express.Router();

//const authMiddleware = require("./middlewares/authMiddleware");
//const roleMiddleware = require("./middlewares/roleMiddleware");

const {
  createCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");

//
// 🟢 CREATE CART
//
// router.post(
//   "/create",
//   authMiddleware,
//   roleMiddleware(["ADMIN", "CASHIER"]),
//   createCart,
// );

//
// 🟡 GET CART
//
router.get("/", authMiddleware, roleMiddleware(["ADMIN", "CASHIER"]), getCart);

//
// ✏️ UPDATE CART
//
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["ADMIN", "CASHIER"]),
  updateCart,
);

//
// 🔴 DELETE CART
//
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["ADMIN", "CASHIER"]),
  deleteCart,
);

module.exports = router;
