const validateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Product name required",
    });
  }

  if (!price) {
    return res.status(400).json({
      success: false,
      message: "Price required",
    });
  }

  if (!stock) {
    return res.status(400).json({
      success: false,
      message: "Stock required",
    });
  }

  next();
};

module.exports = validateProduct;
