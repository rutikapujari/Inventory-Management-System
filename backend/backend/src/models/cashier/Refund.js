//Stores refund information.
const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    refundAmount: {
      type: Number,
      required: true,
    },

    refundReason: {
      type: String,
      required: true,
    },

    refundStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Refund", refundSchema);
