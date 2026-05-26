const router = require("express").Router();

const {
  getDashboardData,
} = require("../controllers/inventoryDashboardController");

router.get("/reports", getDashboardData);

module.exports = router;
