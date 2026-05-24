const mongoose = require("mongoose");

const stockHistorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  action: String,

  quantity: Number,
});

module.exports = mongoose.model("StockHistory", stockHistorySchema);