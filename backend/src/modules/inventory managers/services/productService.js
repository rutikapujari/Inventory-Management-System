const Product = require("../../../models/inventary manager/Product");

// Create Product
const createProductService = async (data) => {
  return await Product.create(data);
};

// Get All Products
const getProductsService = async () => {
  return await Product.find();
};


// Get Single Product
const getProductByIdService = async (id) => {
  return await Product.findById(id);
};


// Update Product
const updateProductService = async (id, data) => {
  return await Product.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};


// Delete Product
const deleteProductService = async (id) => {
  return await Product.findByIdAndDelete(id);
};


module.exports = {
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};