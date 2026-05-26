const express = require("express");

const router = express.Router();

const {
  createRefund,
  getRefunds,
  //updateRefund,
  //deleteRefund,
} = require("../controllers/refundController");

//
// 🟢 CREATE REFUND
//
router.post("/create", createRefund);

//
// 🟡 GET ALL REFUNDS
//
router.get("/", getRefunds);

//
// ✏️ UPDATE REFUND
//
//router.put("/update/:id", updateRefund);

//
// 🔴 DELETE REFUND
//
//router.delete("/delete/:id", deleteRefund);

module.exports = router;
