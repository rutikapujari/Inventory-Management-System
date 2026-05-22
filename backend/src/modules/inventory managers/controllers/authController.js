const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Imports your compiled User model directly
const User = require("../../../models/auth/User");

// Register Controller
const register = async (req, res) => {
  try {
    // 1. Destructure all fields including phone, role, and isActive
    const { name, email, password, phone, role, isActive } = req.body;

    // 2. Check if the user already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Initialize the Mongoose document instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      role: role || "cashier", // Defaults to 'cashier' if none is passed
      isActive: isActive !== undefined ? isActive : true,
    });

    // 4. Save the document into your MongoDB Compass collection
    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        isActive: newUser.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials (User not found)",
      });
    }

    // 2. Compare the plain text password with the hashed password in the DB
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials (Wrong password)",
      });
    }

    // 3. Verify that the account isn't deactivated
    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is deactivated. Please contact an admin.",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
