const express = require("express");

const router = express.Router();

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");


// GET Settings
router.get("/", getSettings);

// UPDATE Settings
router.put("/", updateSettings);

module.exports = router;