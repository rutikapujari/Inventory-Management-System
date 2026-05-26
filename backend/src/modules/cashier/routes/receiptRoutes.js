const express = require("express");

const router = express.Router();

const {
  createReceipt,
  getReceipts,
  //updateReceipt,
  //deleteReceipt,
} = require("../controllers/receiptController");

//
// 🟢 CREATE RECEIPT
//
router.post("/create", createReceipt);

//
// 🟡 GET ALL RECEIPTS
//
router.get("/", getReceipts);

//
// ✏️ UPDATE RECEIPT
//
//router.put("/update/:id", updateReceipt);

//
// 🔴 DELETE RECEIPT
//
//router.delete("/delete/:id", deleteReceipt);

module.exports = router;
