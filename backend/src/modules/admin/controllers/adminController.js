// controllers/adminController.js

const User = require("../../../models/auth/userModel");
const jwt = require("jsonwebtoken");

// ================= REGISTER ADMIN =================
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing admin
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Create admin
    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN ADMIN =================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check admin
    const admin = await User.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Compare password
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL ADMINS =================
const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");

    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
};
