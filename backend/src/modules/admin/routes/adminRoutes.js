const express = require("express");

const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
} = require("../controllers/adminController");


// Register
router.post("/register", registerAdmin);
router.get("/register", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Use POST /api/admin/register to register an admin.",
  });
});

// Login
router.post("/login", loginAdmin);
router.get("/login", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Use POST /api/admin/login to login an admin.",
  });
});

// Get all admins
router.get("/", getAllAdmins);

module.exports = router;
