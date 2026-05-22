const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const decoded = jwt.verify(token, "mysecretkey");

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;

module.exports = authMiddleware;