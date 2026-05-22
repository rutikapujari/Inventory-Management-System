const Category = require("../models/Category");


// Create Category
const createCategoryService = async (data) => {
  return await Category.create(data);
};


// Get All Categories
const getCategoriesService = async () => {
  return await Category.find();
};


module.exports = {
  createCategoryService,
  getCategoriesService,
};