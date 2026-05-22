const validateOrder = (req, res, next) => {
  const { customer, products, totalAmount } = req.body;

  if (!customer) {
    return res.status(400).json({
      success: false,
      message: "Customer required",
    });
  }

  if (!products || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Products required",
    });
  }

  if (!totalAmount) {
    return res.status(400).json({
      success: false,
      message: "Total amount required",
    });
  }

  next();
};

module.exports = validateOrder;
