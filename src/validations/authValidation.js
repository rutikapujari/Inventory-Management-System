const { body } = require("express-validator");

// ================= REGISTER VALIDATION =================

exports.registerValidation = [
  body("name").notEmpty().withMessage("Name required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("password").isLength({ min: 6 }).withMessage("Password minimum 6 chars"),
];

// ================= LOGIN VALIDATION =================

exports.loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),

  body("password").notEmpty().withMessage("Password required"),
];
