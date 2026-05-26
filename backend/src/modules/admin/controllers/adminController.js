// src/modules/admin/controllers/adminController.js

const User = require("../../../models/auth/userModel");

const jwt = require("jsonwebtoken");
const getPanelConfig = require("../../../utils/getPanelConfig");

// ================= REGISTER ADMIN =================

const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, phone, role = "admin" } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: `${role} registered successfully`,
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

// ================= LOGIN ADMIN =================

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      role: { $in: ["admin", "manager", "inventory-manager", "cashier"] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    const userResponse = user.toObject();
    delete userResponse.password;
    const panelConfig = getPanelConfig(user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse,
      panel: panelConfig.panel,
      dashboardRoute: panelConfig.dashboardRoute,
    });
  } catch (error) {
    next(error);
  }
};

// ================= ADMIN DASHBOARD =================

const getDashboard = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Admin Dashboard Working",
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET ALL ADMINS =================

const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({
      role: "admin",
    }).select("-password");

    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getDashboard,
  getAllAdmins,
};
