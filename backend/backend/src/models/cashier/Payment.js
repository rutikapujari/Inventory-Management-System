//Stores payment details.
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "CARD", "UPI"],
      required: true,
    },

    transactionId: {
      type: String,
      default: "",
    },

    paymentStatus: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);
module.exports =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
