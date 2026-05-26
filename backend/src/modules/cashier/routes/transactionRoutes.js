const express = require("express");

const router = express.Router();

const {
  createTransaction,
  getTransactions,
  getSingleTransaction,
} = require("../controllers/transactionController");

router.post("/", createTransaction);

router.post("/create", createTransaction);

router.get("/", getTransactions);

router.get("/:id", getSingleTransaction);

module.exports = router;
