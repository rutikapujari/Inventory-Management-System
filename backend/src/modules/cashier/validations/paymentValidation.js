// payment validation

const validatePayment = (req, res, next) => {
  const { order, amount, paymentMethod } = req.body;

  // ORDER CHECK
  if (!order) {
    return res.status(400).json({
      success: false,
      message: "Order ID required",
    });
  }

  // AMOUNT CHECK
  if (!amount) {
    return res.status(400).json({
      success: false,
      message: "Amount required",
    });
  }

  // PAYMENT METHOD CHECK
  if (!paymentMethod) {
    return res.status(400).json({
      success: false,
      message: "Payment method required",
    });
  }

  // VALID PAYMENT METHODS
  const methods = ["CASH", "CARD", "UPI"];

  if (!methods.includes(paymentMethod)) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment method",
    });
  }

  next();
};

module.exports = validatePayment;
