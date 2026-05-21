const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, default: 'Electronics' },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  reorderLevel: { type: Number, default: 10 },
  image: { type: String, default: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);