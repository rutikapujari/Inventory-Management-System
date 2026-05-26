const Payment = require("../../../models/cashier/Payment");

const {
  calculateGST,
  calculateFinalAmount,
} = require("../services/paymentService");

// ======================================================
// CREATE PAYMENT
// ======================================================

const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate amount
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    // Calculate GST & Final Amount
    const gst = calculateGST(amount);

    const finalAmount = calculateFinalAmount(amount);

    // Create Payment
    const payment = await Payment.create({
      ...req.body,
      gst,
      finalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL PAYMENTS
// ======================================================

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("order");

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET SINGLE PAYMENT
// ======================================================

const getSinglePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate("order");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE PAYMENT
// ======================================================

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    let updatedData = { ...req.body };

    // Recalculate GST if amount changes
    if (req.body.amount) {
      const gst = calculateGST(req.body.amount);

      const finalAmount = calculateFinalAmount(req.body.amount);

      updatedData.gst = gst;
      updatedData.finalAmount = finalAmount;
    }

    const updatedPayment = await Payment.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE PAYMENT
// ======================================================

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await Payment.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  createPayment,
  getPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
