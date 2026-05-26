const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const {
  registerAdmin,
  loginAdmin,
  getDashboard,
  getAllAdmins,
} = require("../controllers/adminController");

// ================= MIDDLEWARES =================

const protect = require("../../../middlewares/authMiddleware");

const authorizeRoles = require("../../../middlewares/roleMiddleware");

// ================= ADMIN AUTH =================

router.get("/", getAllAdmins);

// ================= REGISTER ADMIN =================

router.get("/register", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Use POST /api/admin/register to register an admin.",
  });
});

router.post("/register", registerAdmin);

// ================= LOGIN ADMIN =================

router.get("/login", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Use POST /api/admin/login to login.",
  });
});

router.post("/login", loginAdmin);

// ================= ADMIN DASHBOARD =================

router.get("/dashboard", protect, authorizeRoles("admin"), getDashboard);

// ================= GET ALL ADMINS =================

router.get("/admins", protect, authorizeRoles("admin"), getAllAdmins);

module.exports = router;
