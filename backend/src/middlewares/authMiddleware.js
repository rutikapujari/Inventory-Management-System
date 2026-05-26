const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token =
      req.headers["x-auth-token"] ||
      req.headers["token"] ||
      req.query.token;

    if (
      req.headers.authorization &&
      req.headers.authorization.toLowerCase().startsWith("bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "mysecretkey",
      );

      req.user = decoded;
      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized. Send a valid Bearer token.",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = protect;
