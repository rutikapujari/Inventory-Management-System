// app.js

const express = require("express");

require("dotenv").config();

const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// =========================
// DATABASE CONNECTION
// =========================

connectDB();

// =========================
// MIDDLEWARES
// =========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =========================
// LOAD MODELS (CASHIER)
// =========================

require("./src/models/cashier/Cart");

require("./src/models/cashier/Customer");

require("./src/models/cashier/Discount");

require("./src/models/cashier/Invoice");

require("./src/models/cashier/Order");

require("./src/models/cashier/OrderItem");

require("./src/models/cashier/Payment");

require("./src/models/cashier/Receipt");

require("./src/models/cashier/Refund");

require("./src/models/cashier/product");

// =========================
// ROUTES IMPORTS
// =========================

// AUTH

const authRoutes = require("./src/modules/auth/routes/authRoutes");

const logoutRoutes = require("./src/modules/auth/routes/logoutRoutes");

// ADMIN

const adminRoutes = require("./src/modules/admin/routes/adminRoutes");

// CASHIER

const cartRoutes = require("./src/modules/cashier/routes/cartRoutes");

const cashierOrderRoutes = require("./src/modules/cashier/routes/orderRoutes");

const paymentRoutes = require("./src/modules/cashier/routes/paymentRoutes");

const receiptRoutes = require("./src/modules/cashier/routes/receiptRoutes");

const invoiceRoutes = require("./src/modules/cashier/routes/invoiceRoutes");

const refundRoutes = require("./src/modules/cashier/routes/refundRoutes");

const customerRoutes = require("./src/modules/cashier/routes/customerRoutes");

const discountRoutes = require("./src/modules/cashier/routes/discountRoutes");

// INVENTORY

const productRoutes = require("./src/modules/inventory managers/routes/productRoutes");

const categoryRoutes = require("./src/modules/inventory managers/routes/categoryRoutes");

const warehouseRoutes = require("./src/modules/inventory managers/routes/warehouseRoutes");

const supplierRoutes = require("./src/modules/inventory managers/routes/supplierRoutes");

const stockRoutes = require("./src/modules/inventory managers/routes/stockRoutes");

const purchaseOrderRoutes = require("./src/modules/inventory managers/routes/purchaseOrderRoutes");

// =========================
// CONTROLLERS
// =========================

const {
  createProduct,
} = require("./src/modules/inventory managers/controllers/productController");

// =========================
// ROUTES USAGE
// =========================

// AUTH

app.use("/api/auth", authRoutes);

app.use("/api/auth", logoutRoutes);

// ADMIN

app.use("/api/admin", adminRoutes);

// CASHIER

app.use("/api/cart", cartRoutes);

app.use("/api/order", cashierOrderRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/receipt", receiptRoutes);

app.use("/api/invoice", invoiceRoutes);

app.use("/api/refund", refundRoutes);

app.use("/api/customer", customerRoutes);

app.use("/api/discount", discountRoutes);

// INVENTORY

app.use("/api/products", productRoutes);

app.use("/api/product", productRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/warehouses", warehouseRoutes);

app.use("/api/suppliers", supplierRoutes);

app.use("/api/stocks", stockRoutes);

app.use("/api/purchase-orders", purchaseOrderRoutes);

// =========================
// EXTRA PRODUCT ROUTES
// =========================

app.post("/api/createProduct", createProduct);

app.post("/api/products/create", createProduct);

app.post("/api/products/createProduct", createProduct);

// =========================
// DEFAULT ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("Inventory Management + Cashier + Admin API Running...");
});

// =========================
// ERROR MIDDLEWARE
// =========================

const errorMiddleware = require("./src/middlewares/errorMiddleware");

app.use(errorMiddleware);

// =========================
// EXPORT APP
// =========================

module.exports = app;
