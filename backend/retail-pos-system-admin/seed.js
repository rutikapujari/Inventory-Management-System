const mongoose = require('mongoose');
require('dotenv').config();
const Stats = require('./models/Stats.js');
const ChartData = require('./models/ChartData.js');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Stats.deleteMany({});
    await ChartData.deleteMany({});

    await Stats.create({
      totalRevenue: "$24,500", revenueChange: "+12.5% from last month",
      totalOrders: "1,247", ordersChange: "+8.2% from last month",
      totalProductsCount: 342, productsSubtitle: "8 categories",
      growthRate: "23.4%", growthChange: "+3.1% from last month"
    });

    await ChartData.create({
      salesData: [{ name: 'Jan', value: 12500 }, { name: 'Feb', value: 15200 }, { name: 'Mar', value: 18900 }, { name: 'Apr', value: 16400 }, { name: 'May', value: 21000 }, { name: 'Jun', value: 24500 }],
      revenueData: [{ name: 'Mon', value: 3200 }, { name: 'Tue', value: 4100 }, { name: 'Wed', value: 3800 }, { name: 'Thu', value: 4500 }, { name: 'Fri', value: 5200 }, { name: 'Sat', value: 6800 }, { name: 'Sun', value: 5100 }],
      recentOrders: [
        { id: '#ORD-001', name: 'John Doe', items: 3, total: '$189.97', status: 'Completed', color: 'bg-emerald-50 text-emerald-700' },
        { id: '#ORD-002', name: 'Jane Smith', items: 1, total: '$299.99', status: 'Completed', color: 'bg-emerald-50 text-emerald-700' }
      ]
    });

    console.log('✅ Baseline cloud dataset initialized!');
    process.exit(0);
  } catch (err) { console.error(err); process.exit(1); }
};
seedData();