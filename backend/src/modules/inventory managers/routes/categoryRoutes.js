const router = require("express").Router();

const {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const validationHandler = require("../middleware/validationHandler");
const {
  createCategoryValidation,
} = require("../validations/categoryValidation");

router.post("/create", createCategoryValidation, validationHandler, createCategory);

router.get("/", getCategories);

router.get("/:id", getSingleCategory);

router.put("/update/:id", updateCategory);
router.put("/delete/:id", deleteCategory);

router.delete("/delete/:id", deleteCategory);

module.exports = router;
