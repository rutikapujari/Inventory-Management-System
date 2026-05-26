//Stores discount information.
const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    discountName: {
      type: String,
      required: true,
    },

    discountType: {
      type: String,
      enum: ["PERCENTAGE", "FIXED"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
    },

    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Discount", discountSchema);
