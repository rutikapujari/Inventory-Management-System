const mongoose = require("mongoose");

const barcodeSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  code: String,
});

module.exports = mongoose.model("Barcode", barcodeSchema);