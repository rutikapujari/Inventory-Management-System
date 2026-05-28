const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  totalRevenue: String, revenueChange: String,
  totalOrders: String, ordersChange: String,
  totalProductsCount: Number, productsSubtitle: String,
  growthRate: String, growthChange: String
});

module.exports = mongoose.model('Stats', statsSchema);