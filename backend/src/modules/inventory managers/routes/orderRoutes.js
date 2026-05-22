const router = require("express").Router();
const { createOrder, getOrders } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);

module.exports = router;
