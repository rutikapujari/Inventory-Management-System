const normalizeRole = (role) => {
  if (role === "manager") {
    return "inventory-manager";
  }

  return role;
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated properly",
      });
    }

    const allowedRoles = roles.map(normalizeRole);
    const userRole = normalizeRole(req.user.role);

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient role",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;
