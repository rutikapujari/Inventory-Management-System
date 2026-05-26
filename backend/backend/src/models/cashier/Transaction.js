//Stores transaction information.
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },

    transactionType: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
      required: true,
    },

    transactionStatus: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Transaction", transactionSchema);
