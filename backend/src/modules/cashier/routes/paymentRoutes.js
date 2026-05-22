const express = require("express");

const router = express.Router();

const {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const validatePayment = require("../validations/paymentValidation");

//
// 🟢 CREATE PAYMENT
//
router.post("/create", validatePayment, createPayment);

//
// 🟡 GET ALL PAYMENTS
//
router.get("/", getPayments);

//
// ✏️ UPDATE PAYMENT
//
router.put("/update/:id", updatePayment);

//
// 🔴 DELETE PAYMENT
//
router.delete("/delete/:id", deletePayment);

module.exports = router;
