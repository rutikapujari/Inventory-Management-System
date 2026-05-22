const validateCustomer = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Customer name required",
    });
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email required",
    });
  }

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone required",
    });
  }

  next();
};

module.exports = validateCustomer;
