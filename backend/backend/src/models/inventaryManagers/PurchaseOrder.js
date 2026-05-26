const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qtyOrdered: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        default: 0,
      },
    },
  ],

  totalAmount: Number,
}, { timestamps: true });

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
