const Notification = require("../../../models/admin/Notification");

// 🔔 CREATE NOTIFICATION
const createNotificationService = async (data) => {
  const notification = await Notification.create({
    title: data.title,
    message: data.message,
    type: data.type || "info",
    userId: data.userId || null,
    isRead: false,
  });

  return notification;
};

// 📩 GET ALL NOTIFICATIONS
const getAllNotificationsService = async () => {
  const notifications = await Notification.find().sort({ createdAt: -1 });

  return notifications;
};

// 👤 USER NOTIFICATIONS
const getUserNotificationsService = async (userId) => {
  const notifications = await Notification.find({ userId }).sort({
    createdAt: -1,
  });

  return notifications;
};

// ✔️ MARK AS READ
const markAsReadService = async (notificationId) => {
  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw new Error("Notification not found");
  }

  return notification;
};

// 🗑️ DELETE NOTIFICATION
const deleteNotificationService = async (notificationId) => {
  const deleted = await Notification.findByIdAndDelete(notificationId);

  if (!deleted) {
    throw new Error("Notification not found");
  }

  return deleted;
};

module.exports = {
  createNotificationService,
  getAllNotificationsService,
  getUserNotificationsService,
  markAsReadService,
  deleteNotificationService,
};