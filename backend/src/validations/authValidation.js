const { body } = require("express-validator");

// ================= REGISTER VALIDATION =================

exports.registerValidation = [
  body("name").notEmpty().withMessage("Name required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("password").isLength({ min: 6 }).withMessage("Password minimum 6 chars"),

  body("role")
    .optional()
    .isIn(["cashier", "inventory-manager"])
    .withMessage("Role must be cashier or inventory-manager"),
];

// ================= LOGIN VALIDATION =================

exports.loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),

  body("password").notEmpty().withMessage("Password required"),
];

exports.forgotPasswordValidation = [
  body("email").isEmail().withMessage("Valid email required"),
];
