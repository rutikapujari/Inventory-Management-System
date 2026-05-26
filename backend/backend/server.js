require("dotenv").config();
const app = require("./app");
const dashboardRoutes = require("./src/modules/admin/routes/dashboardRoutes");
const adminRoutes = require("./src/modules/admin/routes/adminRoutes");
const analyticsRoutes = require("./src/modules/admin/routes/analyticsRoutes");
const reportRoutes = require("./src/modules/admin/routes/reportRoutes");
const settingsRoutes = require("./src/modules/admin/routes/settingsRoutes");
const notificationRoutes = require("./src/modules/admin/routes/notificationRoutes");
const userManagementRoutes = require("./src/modules/admin/routes/userManagementRoutes");
const accessRoutes = require("./src/modules/admin/routes/accessRoutes");






app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userManagementRoutes);
app.use("/api/access", accessRoutes);
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
