const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  sku: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  sellingPrice: {
    type: Number,
    required: true,
  },

  costPrice: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    default: "",
  },

  brand: {
    type: String,
    default: "",
  },
  
});

module.exports = mongoose.model("Product", productSchema);
