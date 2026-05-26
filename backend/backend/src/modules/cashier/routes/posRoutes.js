const router = require("express").Router();

const {
  createOrder,
} = require("../controllers/orderController");
const {
  getProducts,
} = require("../../inventory managers/controllers/productController");

router.post("/sale", createOrder);
router.get("/products", getProducts);

module.exports = router;
