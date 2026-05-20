const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
  salesData: [{ name: String, value: Number }],
  revenueData: [{ name: String, value: Number }],
  recentOrders: [{ id: String, name: String, items: Number, total: String, status: String, color: String }]
});

module.exports = mongoose.model('ChartData', chartDataSchema);