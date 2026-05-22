const express = require("express");
const router = express.Router();

const {
  createCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");

// IMPORT VALIDATION
const validateCart = require("../validations/cartValidation");

//
// 🛒 CREATE CART
//
router.post("/create", validateCart, createCart);

//
// 📦 GET ALL CARTS
//
router.get("/", getCart);

//
// ✏️ UPDATE CART
//
router.put("/update/:id", updateCart);

//
// 🗑️ DELETE CART
//
router.delete("/delete/:id", deleteCart);

module.exports = router;
