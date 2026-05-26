const mongoose = require("mongoose");

const inventoryTransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  type: String,
  quantity: Number,
});

module.exports = mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema
);