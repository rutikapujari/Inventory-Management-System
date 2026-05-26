// controllers/accessController.js

const Access = require("../../../models/admin/AccessControl");

const formatValidationError = (error) => {
  if (error.name !== "ValidationError") {
    return error.message;
  }

  return Object.values(error.errors)
    .map((fieldError) => fieldError.message)
    .join(", ");
};

// ================= GET ALL ACCESS =================

const getAccessList = async (req, res) => {
  try {

    const accessList = await Access.find();

    res.status(200).json({
      success: true,
      total: accessList.length,
      accessList,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= GET SINGLE ACCESS =================

const getSingleAccess = async (req, res) => {
  try {

    const access = await Access.findById(req.params.id);

    if (!access) {
      return res.status(404).json({
        success: false,
        message: "Access data not found",
      });
    }

    res.status(200).json({
      success: true,
      access,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================= CREATE ACCESS =================

const createAccess = async (req, res) => {
  try {
    const { role, module } = req.body;

    if (!role || !module) {
      return res.status(400).json({
        success: false,
        message: "role and module are required to create access permissions.",
      });
    }

    const access = await Access.create(req.body);

    res.status(201).json({
      success: true,
      message: "Access created successfully",
      access,
    });

  } catch (error) {

    res.status(error.name === "ValidationError" ? 400 : 500).json({
      success: false,
      message: formatValidationError(error),
    });

  }
};


// ================= UPDATE ACCESS =================

const updateAccess = async (req, res) => {
  try {

    const access = await Access.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!access) {
      return res.status(404).json({
        success: false,
        message: "Access not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Access updated successfully",
      access,
    });

  } catch (error) {

    res.status(error.name === "ValidationError" ? 400 : 500).json({
      success: false,
      message: formatValidationError(error),
    });

  }
};


// ================= DELETE ACCESS =================

const deleteAccess = async (req, res) => {
  try {

    const access = await Access.findByIdAndDelete(
      req.params.id
    );

    if (!access) {
      return res.status(404).json({
        success: false,
        message: "Access not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Access deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getAccessList,
  getSingleAccess,
  createAccess,
  updateAccess,
  deleteAccess,
};
