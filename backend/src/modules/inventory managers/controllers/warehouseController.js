const Warehouse = require("../../../models/inventaryManagers/Warehouse");


// Create Warehouse
const createWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);

    res.status(201).json({
      success: true,
      data: warehouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Warehouses
const getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();

    res.status(200).json({
      success: true,
      data: warehouses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createWarehouse,
  getWarehouses,
};
