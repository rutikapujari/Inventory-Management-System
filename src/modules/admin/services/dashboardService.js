const DashboardStats = require("../../../models/admin/DashboardStats");

// SERVICE LAYER (business logic)
const getDashboardStatsService = async () => {
  const stats = await DashboardStats.findOne();

  return stats;
};

module.exports = {
  getDashboardStatsService,
};