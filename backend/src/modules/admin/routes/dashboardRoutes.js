const express = require("express");
const router = express.Router();
const protect = require("../../../middlewares/authMiddleware");
const authorizeRoles = require("../../../middlewares/roleMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

// GET Dashboard Data
router.get(
  "/",
  protect,
  authorizeRoles("admin", "manager", "inventory-manager"),
  getDashboardStats,
);

// API ROUTE
router.get(
  "/stats",
  protect,
  authorizeRoles("admin", "manager", "inventory-manager"),
  getDashboardStats,
);


module.exports = router;
