const { body } = require("express-validator");

exports.createSupplierValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Supplier name is required"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isMobilePhone()
    .withMessage("Valid phone number required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Valid email required")
    .normalizeEmail(),
];
