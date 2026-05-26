const Order = require("../../../models/cashier/Order");

const createOrder = async (req, res) => {
  try {
    const { customer, cashier, products } = req.body;

    const order = await Order.create({
      customer,
      cashier,
      products: Array.isArray(products) ? products : [],
      totalAmount: 0,
      orderNumber: `INV-${Date.now()}`,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
