const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

// GET Dashboard Data
router.get("/", getDashboardStats);

// API ROUTE
router.get("/stats", getDashboardStats);


module.exports = router;
