const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

module.exports = errorMiddleware;
