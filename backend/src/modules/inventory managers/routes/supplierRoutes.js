const express = require("express");

const router = express.Router();

const {
  createSupplier,
  getSuppliers,
} = require("../controllers/supplierController");
const validationHandler = require("../middleware/validationHandler");
const {
  createSupplierValidation,
} = require("../validations/supplierValidation");


// Create Supplier
router.post("/", createSupplierValidation, validationHandler, createSupplier);


// Get All Suppliers
router.get("/", getSuppliers);


module.exports = router;
