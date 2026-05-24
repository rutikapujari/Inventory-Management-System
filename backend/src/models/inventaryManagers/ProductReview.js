const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  review: String,

  rating: Number,
});

module.exports = mongoose.model(
  "ProductReview",
  productReviewSchema
);