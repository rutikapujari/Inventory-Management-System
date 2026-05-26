const Cart = require("../../../models/cashier/Cart");

const { calculateCartTotal } = require("../services/cartService");

// grand total helper
const calculateGrandTotal = (totalPrice = 0, tax = 0, discount = 0) => {
  return Number(totalPrice) + Number(tax) - Number(discount);
};

//
// 🛒 CREATE CART
//
const createCart = async (req, res) => {
  try {
    const { items = [], tax = 0, discount = 0 } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart items are required",
      });
    }

    const totalPrice = calculateCartTotal(items) || 0;
    const grandTotal = calculateGrandTotal(totalPrice, tax, discount);

    const cart = await Cart.create({
      ...req.body,
      totalPrice,
      tax,
      discount,
      grandTotal,
    });

    return res.status(201).json({
      success: true,
      message: "Cart created successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 📦 GET ALL CARTS
//
const getCart = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("customer")
      .populate("items.product");

    return res.status(200).json({
      success: true,
      carts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ✏️ UPDATE CART
//
const updateCart = async (req, res) => {
  try {
    const cartId = req.params.id;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const { items, tax = 0, discount = 0 } = req.body;

    let updatedData = { ...req.body };

    if (Array.isArray(items) && items.length > 0) {
      const totalPrice = items.reduce((sum, item) => {
        return sum + Number(item.price || 0) * Number(item.quantity || 0);
      }, 0);

      updatedData.totalPrice = totalPrice;
      updatedData.grandTotal = totalPrice + Number(tax) - Number(discount);
    }

    const updatedCart = await Cart.findByIdAndUpdate(cartId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🗑️ DELETE CART
//
const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    await Cart.findByIdAndDelete(cartId);

    return res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// EXPORT
//
module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
