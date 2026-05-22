const validateCart = (req, res, next) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart items required",
    });
  }

  next();
};

module.exports = validateCart;
