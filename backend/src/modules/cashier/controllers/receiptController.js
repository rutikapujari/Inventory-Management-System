const Receipt = require("../../../models/cashier/Receipt");

//
// 🟢 CREATE RECEIPT
//
const createReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Receipt generated successfully",
      receipt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🟡 GET ALL RECEIPTS
//
const getReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find()
      .populate({
        path: "order",
        populate: [
          { path: "customer" },
          { path: "cashier" },
          { path: "products.productId" },
        ],
      })
      .populate("payment");

    return res.status(200).json({
      success: true,
      receipts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ✏️ UPDATE RECEIPT
//
// const updateReceipt = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const receipt = await Receipt.findById(id);

//     if (!receipt) {
//       return res.status(404).json({
//         success: false,
//         message: "Receipt not found",
//       });
//     }

//     const updatedReceipt = await Receipt.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Receipt updated successfully",
//       receipt: updatedReceipt,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

//
// 🔴 DELETE RECEIPT
//
// const deleteReceipt = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const receipt = await Receipt.findById(id);

//     if (!receipt) {
//       return res.status(404).json({
//         success: false,
//         message: "Receipt not found",
//       });
//     }

//     await Receipt.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message: "Receipt deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  createReceipt,
  getReceipts,
  // updateReceipt,
  //deleteReceipt,
};
