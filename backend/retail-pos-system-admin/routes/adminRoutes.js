const express = require('express');
const Product = require('../models/Product.js');
const User = require('../models/User.js');
const Stats = require('../models/Stats.js');
const ChartData = require('../models/ChartData.js');

const router = express.Router();

// Inventory Management
router.get('/products', async (req, res) => {
  try { res.json(await Product.find({})); } 
  catch (err) { res.status(500).json({ error: 'Failed to fetch items.' }); }
});

router.post('/products', async (req, res) => {
  try { res.status(201).json(await Product.create(req.body)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

// User Profiles
router.get('/users', async (req, res) => {
  try { res.json(await User.find({})); } 
  catch (err) { res.status(500).json({ error: 'Failed to fetch users.' }); }
});

router.post('/users', async (req, res) => {
  try { res.status(201).json(await User.create(req.body)); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

// Analytics Dashboard
router.get('/dashboard/stats', async (req, res) => {
  try { res.json(await Stats.findOne({}) || {}); } 
  catch (err) { res.status(500).json({ error: 'Failed to fetch dashboard stats.' }); }
});

router.get('/dashboard/charts-and-orders', async (req, res) => {
  try { res.json(await ChartData.findOne({}) || { salesData: [], revenueData: [], recentOrders: [] }); } 
  catch (err) { res.status(500).json({ error: 'Failed to load chart matrices.' }); }
});

module.exports = router;