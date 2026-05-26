const express = require("express");

const router = express.Router();

const {
  getNotifications,
  createNotification,
  deleteNotification,
} = require("../controllers/notificationController");


// GET all notifications
router.get("/", getNotifications);

// CREATE notification
router.post("/", createNotification);

// DELETE notification
router.delete("/:id", deleteNotification);

module.exports = router;