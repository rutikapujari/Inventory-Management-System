const Invoice = require("../../../models/cashier/Invoice");

//
// 🟢 CREATE INVOICE
//
const createInvoice = async (req, res) => {
  try {
    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = await Invoice.create({
      ...req.body,
      invoiceNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// 🟡 GET ALL INVOICES
//
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("order")
      .populate("customer");

    return res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ✏️ UPDATE INVOICE
//
// const updateInvoice = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const invoice = await Invoice.findById(id);

//     if (!invoice) {
//       return res.status(404).json({
//         success: false,
//         message: "Invoice not found",
//       });
//     }

//     const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Invoice updated successfully",
//       invoice: updatedInvoice,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

//
// 🔴 DELETE INVOICE
//
// const deleteInvoice = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const invoice = await Invoice.findById(id);

//     if (!invoice) {
//       return res.status(404).json({
//         success: false,
//         message: "Invoice not found",
//       });
//     }

//     await Invoice.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message: "Invoice deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  createInvoice,
  getInvoices,
  //updateInvoice,
  //deleteInvoice,
};
