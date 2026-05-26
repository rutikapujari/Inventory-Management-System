const express = require("express");

const router = express.Router();

const {
  getAccessList,
  getSingleAccess,
  createAccess,
  updateAccess,
  deleteAccess,
} = require("../controllers/accessController");


// GET all access roles
router.get("/", getAccessList);

// GET single access role
router.get("/:id", getSingleAccess);

// CREATE access role
router.post("/", createAccess);

// UPDATE access role
router.put("/:id", updateAccess);

// DELETE access role
router.delete("/:id", deleteAccess);

module.exports = router;