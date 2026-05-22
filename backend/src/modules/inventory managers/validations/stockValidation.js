const { body } = require("express-validator");

exports.addStockValidation = [
  body("productId")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid product required"),

  body("qty")
    .isInt({ gt: 0 })
    .withMessage("Qty must be greater than 0"),

  body("reason")
    .notEmpty()
    .withMessage("Reason required for audit"),
];