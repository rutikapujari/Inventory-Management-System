const { body } = require("express-validator");

exports.createPOValidation = [
  body("supplier")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid supplier required"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Items array required"),

  body("items.*.qtyOrdered")
    .isInt({ gt: 0 })
    .withMessage("Qty ordered must be greater than 0"),
];