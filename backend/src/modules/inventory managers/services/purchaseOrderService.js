const PurchaseOrder = require("../../../models/inventaryManagers/PurchaseOrder");


// Create Purchase Order
const createPurchaseOrderService = async (data) => {
  return await PurchaseOrder.create(data);
};


// Get All Purchase Orders
const getPurchaseOrdersService = async () => {
  return await PurchaseOrder.find()
    .populate("supplier");
};


module.exports = {
  createPurchaseOrderService,
  getPurchaseOrdersService,
};
