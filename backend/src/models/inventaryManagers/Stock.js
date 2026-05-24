const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  qty: {
    type: Number,
    required: true,
    min: 1,
  },

  reason: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Stock", stockSchema);
