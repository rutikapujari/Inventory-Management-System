const { body } = require("express-validator");

// ================= CREATE PRODUCT VALIDATION =================

exports.createProductValidation = [
  body("name").notEmpty().withMessage("Product name required"),

  body("sku").notEmpty().withMessage("SKU required"),

  body("sellingPrice")
    .notEmpty()
    .withMessage("Selling price required")
    .isNumeric()
    .withMessage("Selling price must be a number"),

  body("costPrice")
    .notEmpty()
    .withMessage("Cost price required")
    .isNumeric()
    .withMessage("Cost price must be a number"),
];
