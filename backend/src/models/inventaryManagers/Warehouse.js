const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: String,
  location: String,
});

module.exports = mongoose.model("Warehouse", warehouseSchema);