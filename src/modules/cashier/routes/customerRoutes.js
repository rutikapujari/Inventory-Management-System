const express = require("express");

const router = express.Router();

const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.post("/create", createCustomer);
router.get("/", getCustomers);
router.put("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);

module.exports = router;
