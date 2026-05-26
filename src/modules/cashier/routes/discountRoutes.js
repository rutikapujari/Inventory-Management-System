const express = require("express");

const router = express.Router();

const {
  createDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
} = require("../controllers/discountController");

//
// 🟢 CREATE DISCOUNT
//
router.post("/create", createDiscount);

//
// 🟡 GET ALL DISCOUNTS
//
router.get("/", getDiscounts);

//
// ✏️ UPDATE DISCOUNT
//
router.put("/update/:id", updateDiscount);

//
// 🔴 DELETE DISCOUNT
//
router.delete("/delete/:id", deleteDiscount);

module.exports = router;
