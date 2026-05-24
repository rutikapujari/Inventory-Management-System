const express = require("express");
const router = express.Router();

const {
  createCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");

// CREATE
router.post("/create", createCart);

// GET
router.get("/", getCart);

// UPDATE
router.put("/update/:id", updateCart);

// DELETE
router.delete("/delete/:id", deleteCart);

module.exports = router;
