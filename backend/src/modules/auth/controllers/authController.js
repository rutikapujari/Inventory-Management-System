const User = require("../../../models/auth/userModel");

const generateToken = require("../../../utils/generateToken");
const sendEmail = require("../../../utils/sendEmail");

const sanitizeUser = (user) => {
  const safeUser = user.toObject();
  delete safeUser.password;
  return safeUser;
};

const normalizePublicRole = (role) => {
  const normalized = String(role || "cashier")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

  if (normalized === "manager" || normalized === "inventory") {
    return "inventory-manager";
  }

  if (["cashier", "inventory-manager"].includes(normalized)) {
    return normalized;
  }

  return "";
};

const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email?.trim().toLowerCase();
    const role = normalizePublicRole(req.body.role);

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Invalid role selected",
      });
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/login`;
    const subject = "Password reset request";
    const text = [
      `Hello ${user.name},`,
      "",
      "We received a request to reset your password.",
      `Open this link to continue: ${resetLink}`,
      "",
      "If you did not request this, you can ignore this email.",
    ].join("\n");

    try {
      await sendEmail({
        to: user.email,
        subject,
        text,
        html: `
          <p>Hello ${user.name},</p>
          <p>We received a request to reset your password.</p>
          <p><a href="${resetLink}">Reset your password</a></p>
          <p>If you did not request this, you can ignore this email.</p>
        `,
      });
    } catch (error) {
      const canFallbackToConsole =
        process.env.NODE_ENV !== "production" &&
        ["MAIL_CONFIG_MISSING", "MAIL_PASSWORD_PLACEHOLDER", "MAIL_PASSWORD_INVALID"].includes(error.code);

      if (!canFallbackToConsole) {
        throw error;
      }

      console.log("Password reset email fallback:");
      console.log(`To: ${user.email}`);
      console.log(`Subject: ${subject}`);
      console.log(text);
    }

    res.status(200).json({
      success: true,
      message: "Password reset message sent to your email",
    });
  } catch (error) {
    if (error.code === "MAIL_CONFIG_MISSING") {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please add SMTP settings in backend .env file.",
      });
    }

    if (error.code === "MAIL_PASSWORD_PLACEHOLDER") {
      return res.status(500).json({
        success: false,
        message: "SMTP_PASS still has a placeholder value. Add your 16-character Gmail App Password in backend .env.",
      });
    }

    if (error.code === "MAIL_PASSWORD_INVALID") {
      return res.status(500).json({
        success: false,
        message: "Invalid Gmail App Password. SMTP_PASS must be the 16-character App Password, not your Gmail login password.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "email",
      "phone",
      "location",
      "title",
      "bio",
      "skills",
      "avatar",
    ];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (typeof updates.email === "string") {
      updates.email = updates.email.trim().toLowerCase();
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  getProfile,
  updateProfile,
};
