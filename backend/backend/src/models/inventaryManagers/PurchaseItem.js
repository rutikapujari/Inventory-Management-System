const mongoose = require("mongoose");

const purchaseItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  quantity: Number,
  price: Number,
});

module.exports = mongoose.model("PurchaseItem", purchaseItemSchema);