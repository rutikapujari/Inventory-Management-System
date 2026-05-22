const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Admin', 'Manager', 'Cashier'], default: 'Cashier' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  login: { type: String, default: () => new Date().toISOString().slice(0, 16).replace('T', ' ') }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);