//Stores receipt details.
const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Receipt", receiptSchema);
