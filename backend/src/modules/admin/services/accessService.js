const User = require("../../../models/users/User");
const Role = require("../../../models/admin/Role");

// 👤 ASSIGN ROLE
const assignRoleService = async (userId, roleName) => {
  const role = await Role.findOne({ name: roleName });

  if (!role) {
    throw new Error("Role not found");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role: role.name, permissions: role.permissions },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// 🔐 CHECK PERMISSION
const checkPermissionService = (user, requiredPermission) => {
  if (!user.permissions || !user.permissions.includes(requiredPermission)) {
    return false;
  }

  return true;
};

// 👁️ GET ACCESS INFO
const getUserAccessService = async (userId) => {
  const user = await User.findById(userId).select("role permissions");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    role: user.role,
    permissions: user.permissions,
  };
};

// ✏️ UPDATE PERMISSIONS
const updatePermissionsService = async (roleName, permissions) => {
  const role = await Role.findOneAndUpdate(
    { name: roleName },
    { permissions },
    { new: true }
  );

  if (!role) {
    throw new Error("Role not found");
  }

  return role;
};

// 🚫 REMOVE ACCESS
const removeAccessService = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      role: null,
      permissions: [],
    },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = {
  assignRoleService,
  checkPermissionService,
  getUserAccessService,
  updatePermissionsService,
  removeAccessService,
};