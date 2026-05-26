const Order = require("../../../models/cashier/Order");

const {
  calculateTotal,
  generateOrderNumber,
} = require("../services/orderService");

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
        message: "Products must be a non-empty array",
      });
    }

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

    res.status(201).json({
      success: true,
      message: "Order created successfully",
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
    const orders = await Order.find()
      .populate("customer")
      .populate("cashier")
      .populate("products.productId");

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

    const updatedData = { ...req.body };

    if (Array.isArray(req.body.products) && req.body.products.length > 0) {
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

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
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
  updateOrder,
  deleteOrder,
};
