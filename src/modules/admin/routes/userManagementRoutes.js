const express = require("express");

const router = express.Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userManagementController");


// GET all users
router.get("/", getUsers);

// GET single user
router.get("/:id", getSingleUser);

// CREATE user
router.post("/", createUser);

// UPDATE user
router.put("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;