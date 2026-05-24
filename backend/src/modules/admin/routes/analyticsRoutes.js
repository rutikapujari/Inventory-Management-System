const express = require("express");

const router = express.Router();

const {
  getAnalytics,
} = require("../controllers/analyticsController");


// GET Analytics
router.get("/", getAnalytics);

module.exports = router;