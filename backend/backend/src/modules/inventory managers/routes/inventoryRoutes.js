const express = require("express");

const router = express.Router();

const {
  getDashboardData,
} = require("../controllers/inventoryDashboardController");


// Dashboard API
router.get("/", getDashboardData);


module.exports = router;