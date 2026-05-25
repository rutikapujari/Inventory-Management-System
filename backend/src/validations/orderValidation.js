const { body } = require("express-validator");

// ================= CREATE ORDER VALIDATION =================

exports.createOrderValidation = [
  body("customer").notEmpty().withMessage("Customer required"),

  body("items").isArray({ min: 1 }).withMessage("Order items required"),

  body("totalAmount").notEmpty().withMessage("Total amount required"),

  body("paymentMethod").notEmpty().withMessage("Payment method required"),
];
