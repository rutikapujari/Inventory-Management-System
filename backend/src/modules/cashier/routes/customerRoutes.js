// customerRoutes.js

const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

// IMPORT VALIDATION
const validateCustomer = require("../validations/customerValidation");

//
// 🟢 CREATE CUSTOMER
//
router.post("/create", validateCustomer, createCustomer);

//
// 🟡 GET CUSTOMERS
//
router.get("/", getCustomers);

//
// ✏️ UPDATE CUSTOMER
//
router.put("/update/:id", updateCustomer);

//
// 🔴 DELETE CUSTOMER
//
router.delete("/delete/:id", deleteCustomer);

module.exports = router;
