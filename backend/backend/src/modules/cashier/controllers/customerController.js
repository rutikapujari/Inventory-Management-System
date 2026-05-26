// manage customers

const Customer = require("../../../models/cashier/Customer");

const {
  addLoyaltyPoints,
  getCustomerType,
} = require("../services/customerService");

//
// 🟢 CREATE CUSTOMER
//
const createCustomer = async (req, res) => {
  try {
    const loyaltyPoints = addLoyaltyPoints(req.body.totalSpent || 0);
    const customerType = getCustomerType(loyaltyPoints);

    const customer = await Customer.create({
      ...req.body,
      loyaltyPoints,
      customerType,
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🟡 GET ALL CUSTOMERS
//
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ✏️ UPDATE CUSTOMER
//
const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const existingCustomer = await Customer.findById(customerId);

    if (!existingCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    let updatedData = { ...req.body };

    // recalculate loyalty if totalSpent is updated
    if (req.body.totalSpent !== undefined) {
      const loyaltyPoints = addLoyaltyPoints(req.body.totalSpent);
      const customerType = getCustomerType(loyaltyPoints);

      updatedData.loyaltyPoints = loyaltyPoints;
      updatedData.customerType = customerType;
    }

    const customer = await Customer.findByIdAndUpdate(customerId, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🔴 DELETE CUSTOMER
//
const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    await Customer.findByIdAndDelete(customerId);

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// EXPORT ALL
//
module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};
