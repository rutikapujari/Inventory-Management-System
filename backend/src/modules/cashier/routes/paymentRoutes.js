const express = require("express");

const router = express.Router();

const {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

router.post("/create", createPayment);
router.get("/", getPayments);
router.put("/update/:id", updatePayment);
router.delete("/delete/:id", deletePayment);

module.exports = router;
