const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
