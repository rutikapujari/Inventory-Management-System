const express = require("express");

const router = express.Router();

// ================= CONTROLLERS =================

const {
  createPayment,
  getPayments,
  getSinglePayment,
  // updatePayment,
  // deletePayment,
} = require("../controllers/paymentController");

// ================= MIDDLEWARES =================

const protect = require("../../../middlewares/authMiddleware");

const authorizeRoles = require("../../../middlewares/roleMiddleware");

const validationMiddleware = require("../../../middlewares/validationMiddleware");

// ================= VALIDATIONS =================

const {
  createPaymentValidation,
} = require("../../../validations/paymentValidation");

// ================= CREATE PAYMENT =================

router.post(
  "/create",
  protect,
  authorizeRoles("admin", "cashier"),
  createPaymentValidation,
  validationMiddleware,
  createPayment,
);

// ================= GET ALL PAYMENTS =================

router.get("/", protect, authorizeRoles("admin", "cashier"), getPayments);

// ================= GET SINGLE PAYMENT =================

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "cashier"),
  getSinglePayment,
);

// ================= UPDATE PAYMENT =================

// router.put(
//   "/update/:id",
//   protect,
//   authorizeRoles("admin", "cashier"),
//   updatePayment,
// );

// ================= DELETE PAYMENT =================

// router.delete("/delete/:id", protect, authorizeRoles("admin"), deletePayment);

module.exports = router;
