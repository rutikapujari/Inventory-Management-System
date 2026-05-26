const Admin = require("../../../models/admin/Admin");

// GET ADMIN BY ID
const getAdminByIdService = async (adminId) => {
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new Error("Admin not found");
  }

  return admin;
};

// UPDATE ADMIN
const updateAdminProfileService = async (adminId, updateData) => {
  const updatedAdmin = await Admin.findByIdAndUpdate(
    adminId,
    updateData,
    { new: true }
  );

  if (!updatedAdmin) {
    throw new Error("Failed to update admin");
  }

  return updatedAdmin;
};

// DELETE ADMIN
const deleteAdminService = async (adminId) => {
  const deletedAdmin = await Admin.findByIdAndDelete(adminId);

  if (!deletedAdmin) {
    throw new Error("Admin not found or already deleted");
  }

  return deletedAdmin;
};

// GET ALL ADMINS
const getAllAdminsService = async () => {
  const admins = await Admin.find();
  return admins;
};

module.exports = {
  getAdminByIdService,
  updateAdminProfileService,
  deleteAdminService,
  getAllAdminsService,
};