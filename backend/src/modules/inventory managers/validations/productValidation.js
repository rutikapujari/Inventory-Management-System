const { body } = require("express-validator");

exports.createProductValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required"),

  body("sellingPrice")
    .notEmpty()
    .withMessage("Selling price is required")
    .bail()
    .isNumeric()
    .withMessage("Selling price must be a number"),

  body("costPrice")
    .notEmpty()
    .withMessage("Cost price is required")
    .bail()
    .isNumeric()
    .withMessage("Cost price must be a number"),

  body("category")
    .optional()
    .trim()
    .isString()
    .withMessage("Category must be a string"),

  body("brand")
    .optional()
    .trim()
    .isString()
    .withMessage("Brand must be a string"),
];

exports.updateProductValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("sku")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("SKU cannot be empty"),

  body("sellingPrice")
    .optional()
    .isNumeric()
    .withMessage("Selling price must be a number"),

  body("costPrice")
    .optional()
    .isNumeric()
    .withMessage("Cost price must be a number"),

  body("category")
    .optional()
    .trim()
    .isString()
    .withMessage("Category must be a string"),

  body("brand")
    .optional()
    .trim()
    .isString()
    .withMessage("Brand must be a string"),
];
