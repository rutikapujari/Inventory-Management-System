const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const { registerUser, loginUser } = require("../controllers/authController");

// ================= VALIDATIONS =================

const {
  registerValidation,
  loginValidation,
} = require("../../../validations/authValidation");

// ================= MIDDLEWARE =================

const validationMiddleware = require("../../../middlewares/validationMiddleware");

// ================= REGISTER ROUTE =================

router.post(
  "/register",

  registerValidation,

  validationMiddleware,

  registerUser,
);

// ================= LOGIN ROUTE =================

router.post(
  "/login",

  loginValidation,

  validationMiddleware,

  loginUser,
);

module.exports = router;
