const Refund = require("../../../models/cashier/Refund");

//
// 🟢 CREATE REFUND
//
const createRefund = async (req, res) => {
  try {
    const refund = await Refund.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Refund request created",
      refund,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🟡 GET ALL REFUNDS
//
const getRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find().populate("order"); // only this exists

    return res.status(200).json({
      success: true,
      refunds,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//
// ✏️ UPDATE REFUND
//
// const updateRefund = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const refund = await Refund.findById(id);

//     if (!refund) {
//       return res.status(404).json({
//         success: false,
//         message: "Refund not found",
//       });
//     }

//     const updatedRefund = await Refund.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Refund updated successfully",
//       refund: updatedRefund,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

//
// 🔴 DELETE REFUND
//
// const deleteRefund = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const refund = await Refund.findById(id);

//     if (!refund) {
//       return res.status(404).json({
//         success: false,
//         message: "Refund not found",
//       });
//     }

//     await Refund.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message: "Refund deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  createRefund,
  getRefunds,
  //updateRefund,
  //deleteRefund,
};
