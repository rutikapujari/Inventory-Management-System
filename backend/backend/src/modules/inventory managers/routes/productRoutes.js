const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ================= MIDDLEWARES =================

const protect = require("../../../middlewares/authMiddleware");

const authorizeRoles = require("../../../middlewares/roleMiddleware");

const validationMiddleware = require("../../../middlewares/validationMiddleware");

// ================= VALIDATIONS =================

const {
  createProductValidation,
} = require("../../../validations/productValidation");

// ================= CREATE PRODUCT =================

const createProductMiddlewares = [
  protect,
  authorizeRoles("admin", "inventory-manager"),
  createProductValidation,
  validationMiddleware,
  createProduct,
];

router.post(
  "/",
  createProductMiddlewares,
);

router.post("/create", createProductMiddlewares);

// ================= GET ALL PRODUCTS =================

router.get("/", protect, getProducts);

// ================= GET SINGLE PRODUCT =================

router.get("/:id", protect, getSingleProduct);

// ================= UPDATE PRODUCT =================

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "inventory-manager"),
  updateProduct,
);

// ================= DELETE PRODUCT =================

router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

module.exports = router;
