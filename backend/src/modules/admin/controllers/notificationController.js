// controllers/notificationController.js

// Dummy notifications data
let notifications = [
  {
    id: 1,
    message: "Low stock alert for Rice",
    type: "warning",
  },

  {
    id: 2,
    message: "New supplier added",
    type: "success",
  },
];


// ================= GET ALL NOTIFICATIONS =================

const getNotifications = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= CREATE NOTIFICATION =================

const createNotification = async (req, res) => {
  try {

    const { message, type } = req.body;

    const newNotification = {
      id: notifications.length + 1,
      message,
      type,
    };

    notifications.push(newNotification);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification: newNotification,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= DELETE NOTIFICATION =================

const deleteNotification = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    notifications = notifications.filter(
      (notification) => notification.id !== id
    );

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getNotifications,
  createNotification,
  deleteNotification,
};