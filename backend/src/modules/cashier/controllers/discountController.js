const Discount = require("../../../models/cashier/Discount");

//
// 🟢 CREATE DISCOUNT
//
const createDiscount = async (req, res) => {
  try {
    const discount = await Discount.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Discount created successfully",
      discount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🟡 GET ALL DISCOUNTS
//
const getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();

    return res.status(200).json({
      success: true,
      discounts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ✏️ UPDATE DISCOUNT
//
const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    const discount = await Discount.findById(id);

    if (!discount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });
    }

    const updatedDiscount = await Discount.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Discount updated successfully",
      discount: updatedDiscount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🔴 DELETE DISCOUNT
//
const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    const discount = await Discount.findById(id);

    if (!discount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });
    }

    await Discount.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Discount deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
};
