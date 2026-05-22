const { body } = require("express-validator");
const Category = require("../../../models/inventary manager/Category");

exports.createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name required")
    .bail()
    .custom(async (value) => {
      const existing = await Category.findOne({
        name: { $regex: `^${value}$`, $options: "i" },
      });

      if (existing) {
        throw new Error("Category already exists");
      }

      return true;
    }),
];
