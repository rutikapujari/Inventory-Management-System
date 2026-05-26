const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  //updateInvoice,
  //deleteInvoice,
} = require("../controllers/invoiceController");

router.post("/create", createInvoice);
router.get("/", getInvoices);
//router.put("/update/:id", updateInvoice);
//router.delete("/delete/:id", deleteInvoice);

module.exports = router;
