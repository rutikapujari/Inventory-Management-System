<<<<<<< HEAD
﻿// manage customer orders
=======
﻿const Order = require("../../admin/models/Order");

const createOrder = async (req, res) => {
  try {
    const { productName, customerName, quantity, price, status } = req.body;
>>>>>>> 4e31da7eac91c44b1e29d803566903314d3bfa9c

const Order = require("../../../models/cashier/Order");

const {
  calculateTotal,
  generateOrderNumber,
} = require("../services/orderService");

//
// 🟢 CREATE ORDER
//
const createOrder = async (req, res) => {
  try {
    const { customer, cashier, products } = req.body;

    if (!customer || !cashier) {
      return res.status(400).json({
        success: false,
        message: "Customer and cashier are required",
      });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "products must be a non-empty array",
      });
    }

    // sanitize products
    const sanitizedProducts = products.map((item) => ({
      productId: item.productId,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
    }));

    const totalAmount = calculateTotal(sanitizedProducts);
    const orderNumber = generateOrderNumber();

    const order = await Order.create({
      customer,
      cashier,
      products: sanitizedProducts,
      totalAmount,
      orderNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🟡 GET ALL ORDERS
//
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer")
      .populate("cashier")
      .populate("products.productId");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ✏️ UPDATE ORDER
//
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    let updatedData = { ...req.body };

    // update products safely
    if (req.body.products) {
      const sanitizedProducts = req.body.products.map((item) => ({
        productId: item.productId,
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
      }));

      updatedData.products = sanitizedProducts;
      updatedData.totalAmount = calculateTotal(sanitizedProducts);
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🔴 DELETE ORDER
//
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
