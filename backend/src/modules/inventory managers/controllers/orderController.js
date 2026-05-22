const Order = require("../../admin/models/Order");

const createOrder = async (req, res) => {
  try {
    // accept either `productName` or `product` in request body
    const {
      productName: pn,
      product: pAlias,
      customerName,
      quantity,
      price,
      status,
    } = req.body;

    const productName = pn || pAlias;

    if (!productName || !quantity || !price) {
      return res.status(400).json({ message: "productName, quantity and price are required" });
    }

    const order = new Order({
      productName,
      customerName: customerName || "",
      quantity,
      price,
      total: quantity * price,
      status: status || "pending",
    });

    await order.save();
    return res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
