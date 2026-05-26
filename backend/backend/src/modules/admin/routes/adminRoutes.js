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

<<<<<<< HEAD
// ================= ADMIN AUTH =================

router.post("/register", registerAdmin);

=======
// ================= REGISTER ADMIN =================

router.post("/register", registerAdmin);

// ================= LOGIN ADMIN =================

>>>>>>> 9350bf8dbf02da1bd451b5b9282502f759851cd0
router.post("/login", loginAdmin);

// ================= ADMIN DASHBOARD =================

router.get("/dashboard", protect, authorizeRoles("admin"), getDashboard);

// ================= GET ALL ADMINS =================

router.get("/admins", protect, authorizeRoles("admin"), getAllAdmins);

module.exports = router;
