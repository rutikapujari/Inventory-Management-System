const Supplier = require("../models/Supplier");


// Create Supplier
const createSupplierService = async (data) => {
  return await Supplier.create(data);
};


// Get All Suppliers
const getSuppliersService = async () => {
  return await Supplier.find();
};


module.exports = {
  createSupplierService,
  getSuppliersService,
};     