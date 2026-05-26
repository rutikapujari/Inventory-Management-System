// src/modules/admin/controllers/adminController.js

const User = require("../../../models/auth/userModel");

const jwt = require("jsonwebtoken");

// ================= REGISTER ADMIN =================

const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await User.create({
      name,
      email,
      password,
      phone,
      role: "admin",
    });

    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: adminResponse,
    });
  } catch (error) {
    next(error);
  }
};

// ================= LOGIN ADMIN =================

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({
      email,
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: adminResponse,
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
