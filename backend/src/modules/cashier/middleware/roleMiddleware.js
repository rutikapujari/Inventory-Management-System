const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      // Step 1: Check if user exists (from authMiddleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User not found",
        });
      }

      // Step 2: Get user role
      const userRole = req.user.role;

      // Step 3: Check permission
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
      }

      // Step 4: Allow request
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

module.exports = roleMiddleware;
