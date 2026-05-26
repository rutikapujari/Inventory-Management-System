const getPanelConfig = (role) => {
  if (role === "admin") {
    return {
      panel: "admin",
      dashboardRoute: "/api/admin/dashboard",
    };
  }

  if (role === "manager" || role === "inventory-manager") {
    return {
      panel: "manager",
      dashboardRoute: "/api/manager/dashboard",
    };
  }

  if (role === "cashier") {
    return {
      panel: "cashier",
      dashboardRoute: "/api/cashier/orders",
    };
  }

  return {
    panel: role,
    dashboardRoute: "/",
  };
};

module.exports = getPanelConfig;
