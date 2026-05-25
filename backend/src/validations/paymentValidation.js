const { body } = require("express-validator");

// ================= CREATE PAYMENT VALIDATION =================

exports.createPaymentValidation = [
  body("amount").notEmpty().withMessage("Amount is required"),

  body("paymentMethod").notEmpty().withMessage("Payment method is required"),

  body("status").notEmpty().withMessage("Payment status is required"),
];
