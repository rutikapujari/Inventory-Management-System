const Transaction = require("../../../models/cashier/Transaction");
const Payment = require("../../../models/cashier/Payment");
const mongoose = require("mongoose");

const createTransaction = async (req, res) => {
  try {
    const { payment } = req.body;

    if (!mongoose.isValidObjectId(payment)) {
      return res.status(400).json({
        success: false,
        message: "Valid payment id is required",
      });
    }

    const paymentExists = await Payment.findById(payment);

    if (!paymentExists) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("payment");

    return res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id).populate("payment");

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getSingleTransaction,
};
