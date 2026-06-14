# API Documentation

Backend: Express + MongoDB  
Default local base URL: `http://localhost:5000`

## Common Rules

- Request and response body format: JSON
- Authenticated endpoints require:

```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

- Most endpoints return JSON objects. Error responses commonly use:

```json
{
  "success": false,
  "message": "Error message"
}
```

- Server health/root route:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Returns API running message |

## Authentication

Base path: `/api/auth`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/register` | No | Register cashier or inventory-manager user |
| POST | `/login` | No | Login user and receive token |
| POST | `/forgot-password` | No | Start forgot-password flow |
| POST | `/logout` | No | Logout response helper |
| GET | `/profile` | Yes | Get logged-in user profile |
| PUT | `/profile` | Yes | Update logged-in user profile |

Register body:

```json
{
  "name": "Cashier User",
  "email": "cashier@example.com",
  "password": "secret123",
  "role": "cashier"
}
```

Login body:

```json
{
  "email": "cashier@example.com",
  "password": "secret123"
}
```

Allowed user roles: `admin`, `cashier`, `inventory-manager`.

## Admin Auth And Dashboard

Base path: `/api/admin`

| Method | Endpoint | Auth | Roles | Description |
| --- | --- | --- | --- | --- |
| POST | `/register` | No | - | Register admin |
| POST | `/login` | No | - | Login admin |
| GET | `/dashboard` | Yes | admin | Admin dashboard data |
| GET | `/admins` | Yes | admin | List all admins |

Admin register/login bodies follow the same shape as auth register/login.

Additional admin paths mounted from `server.js`:

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/dashboard` | No | Dashboard stats |
| GET | `/api/dashboard/stats` | No | Dashboard stats |
| GET | `/api/analytics` | No | Analytics summary |

## User Management

Base path: `/api/users`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List users |
| GET | `/:id` | No | Get one user |
| POST | `/` | No | Create user |
| PUT | `/:id` | No | Update user |
| DELETE | `/:id` | No | Delete user |

Typical create/update body:

```json
{
  "name": "Store Staff",
  "email": "staff@example.com",
  "password": "secret123",
  "role": "cashier",
  "phone": "9999999999",
  "location": "Pune"
}
```

## Access Control

Base path: `/api/access`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List access entries |
| GET | `/:id` | No | Get one access entry |
| POST | `/` | No | Create access entry |
| PUT | `/:id` | No | Update access entry |
| DELETE | `/:id` | No | Delete access entry |

## Settings And Tax

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/settings` | No | Get system settings |
| PUT | `/api/settings` | No | Update system settings |
| GET | `/api/tax-settings` | No | Get tax settings |
| PUT | `/api/tax-settings` | No | Update tax settings |

Typical tax body:

```json
{
  "gstRate": 18,
  "cgstRate": 9,
  "sgstRate": 9,
  "isTaxEnabled": true
}
```

## Reports And Notifications

Reports base path: `/api/reports`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/stock` | No | Stock report |
| GET | `/low-stock` | No | Low-stock report |
| GET | `/purchases` | No | Purchase report |
| GET | `/suppliers` | No | Supplier report |

Notifications base path: `/api/notifications`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List notifications |
| GET | `/unread` | No | List unread notifications |
| GET | `/low-stock` | No | Low-stock notifications |
| GET | `/orders` | No | Order notifications |
| GET | `/employees` | No | Employee notifications |
| GET | `/system` | No | System notifications |
| GET | `/stats` | No | Notification stats |
| GET | `/search/:keyword` | No | Search notifications |
| GET | `/:id` | No | Get notification by ID |
| POST | `/` | No | Create notification |
| PUT | `/:id` | No | Update notification |
| PATCH | `/mark-all-read` | No | Mark all notifications as read |
| PATCH | `/:id/read` | No | Mark one notification as read |
| DELETE | `/delete-all` | No | Delete all notifications |
| DELETE | `/:id` | No | Delete notification |

## Products

Primary base path: `/api/products`  
Alias base path: `/api/product`

| Method | Endpoint | Auth | Roles | Description |
| --- | --- | --- | --- | --- |
| GET | `/` | Yes | any authenticated user | List products |
| GET | `/:id` | Yes | any authenticated user | Get one product |
| POST | `/` | Yes | admin, inventory-manager | Create product |
| POST | `/create` | Yes | admin, inventory-manager | Create product |
| PUT | `/:id` | Yes | admin, inventory-manager | Update product |
| DELETE | `/:id` | Yes | admin, inventory-manager | Delete product |

Extra create aliases mounted directly:

| Method | Endpoint |
| --- | --- |
| POST | `/api/createProduct` |
| POST | `/api/products/create` |
| POST | `/api/products/createProduct` |

Create product body:

```json
{
  "name": "Wireless Mouse",
  "sku": "MOUSE-001",
  "sellingPrice": 799,
  "costPrice": 520,
  "stock": 50,
  "minStock": 10,
  "category": "Accessories",
  "brand": "Logitech",
  "barcode": "8900000000012",
  "warehouse": "Main",
  "supplier": "ABC Suppliers",
  "supplierContact": "9999999999",
  "discount": 5,
  "tags": ["electronics", "mouse"]
}
```

Required fields: `name`, `sku`, `sellingPrice`, `costPrice`.

## Categories

Base path: `/api/categories`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List categories |
| GET | `/:id` | No | Get one category |
| POST | `/create` | No | Create category |
| PUT | `/update/:id` | No | Update category |
| DELETE | `/delete/:id` | No | Delete category |
| DELETE | `/:id` | No | Delete category |

Body:

```json
{
  "name": "Electronics",
  "description": "Electronic products"
}
```

## Suppliers

Base path: `/api/suppliers`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List suppliers |
| GET | `/:id` | No | Get one supplier |
| POST | `/` | No | Create supplier |
| PUT | `/:id` | No | Update supplier |
| DELETE | `/:id` | No | Delete supplier |

Body:

```json
{
  "name": "ABC Suppliers",
  "email": "abc@example.com",
  "phone": "9999999999",
  "products": 12,
  "rating": 4.5,
  "status": "Active"
}
```

Allowed supplier statuses: `Active`, `Pending`, `Inactive`.

## Stock

Base path: `/api/stocks`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List stock records |
| POST | `/` | No | Create stock record |
| PUT | `/:id` | No | Update stock record |
| DELETE | `/:id` | No | Delete stock record |

Body:

```json
{
  "productId": "665f00000000000000000000",
  "qty": 10,
  "reason": "New purchase"
}
```

## Warehouses

Base path: `/api/warehouses`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List warehouses |
| POST | `/` | No | Create warehouse |

Typical body:

```json
{
  "name": "Main Warehouse",
  "location": "Pune"
}
```

## Purchase Orders

Base path: `/api/purchase-orders`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List purchase orders |
| POST | `/` | No | Create purchase order |
| PUT | `/:id` | No | Update purchase order |
| DELETE | `/:id` | No | Delete purchase order |

## Sales And Manager Dashboard

| Method | Endpoint | Auth | Roles | Description |
| --- | --- | --- | --- | --- |
| GET | `/api/sales` | Yes | admin, inventory-manager, manager | List sales |
| GET | `/api/sales/stats` | Yes | admin, inventory-manager, manager | Sales stats |
| GET | `/api/manager/dashboard/reports` | No | - | Manager dashboard report data |
| GET | `/api/manager/dashboard/profile-activities` | No | - | Manager profile activities |

## Cashier Orders

Primary base path: `/api/orders`  
Alias base path: `/api/order`

| Method | Endpoint | Auth | Roles | Description |
| --- | --- | --- | --- | --- |
| GET | `/` | Yes | cashier, admin, inventory-manager, manager | List orders |
| GET | `/:id` | Yes | cashier, admin, inventory-manager, manager | Get one order |
| POST | `/` | Yes | cashier, admin, inventory-manager, manager | Create order |
| POST | `/create` | Yes | cashier, admin, inventory-manager, manager | Create order |
| PUT | `/:id` | Yes | cashier, admin, inventory-manager, manager | Update order |
| PUT | `/update/:id` | Yes | cashier, admin, inventory-manager, manager | Update order |
| DELETE | `/:id` | Yes | cashier, admin, inventory-manager, manager | Delete order |
| DELETE | `/delete/:id` | Yes | cashier, admin, inventory-manager, manager | Delete order |

Create order body:

```json
{
  "customer": "665f00000000000000000001",
  "products": [
    {
      "productId": "665f00000000000000000002",
      "price": 799,
      "quantity": 2
    }
  ],
  "totalAmount": 1598,
  "paymentStatus": "PENDING",
  "orderStatus": "PLACED"
}
```

Allowed payment statuses: `PENDING`, `PAID`, `FAILED`.  
Allowed order statuses: `PLACED`, `COMPLETED`, `CANCELLED`.

## Payments

Base path: `/api/payment`

| Method | Endpoint | Auth | Roles | Description |
| --- | --- | --- | --- | --- |
| GET | `/` | Yes | admin, cashier | List payments |
| GET | `/:id` | Yes | admin, cashier | Get one payment |
| POST | `/create` | Yes | admin, cashier | Create payment |
| POST | `/razorpay/qr` | Yes | admin, cashier | Create Razorpay QR |
| PUT | `/update/:id` | Yes | admin, cashier | Update payment |
| DELETE | `/delete/:id` | Yes | admin | Delete payment |

Create payment body:

```json
{
  "order": "665f00000000000000000003",
  "amount": 1598,
  "paymentMethod": "UPI",
  "paymentStatus": "SUCCESS",
  "transactionId": "TXN123",
  "paymentReference": "upi-ref-123",
  "paymentGateway": "Razorpay"
}
```

Required fields: `amount`, `paymentMethod`.  
Allowed payment methods: `CASH`, `CARD`, `UPI`.  
Allowed payment statuses: `SUCCESS`, `FAILED`, `PENDING`.

## Customers

Base path: `/api/customer`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | List customers |
| POST | `/create` | No | Create customer |
| PUT | `/update/:id` | No | Update customer |
| DELETE | `/delete/:id` | No | Delete customer |

Body:

```json
{
  "name": "Sneha Patil",
  "email": "sneha@example.com",
  "phone": "9999999999",
  "address": "Pune",
  "loyaltyPoints": 25
}
```

## Cart

Base path: `/api/cart`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | Get cart |
| POST | `/create` | No | Create cart |
| PUT | `/update/:id` | No | Update cart |
| DELETE | `/delete/:id` | No | Delete cart |

## Invoices, Receipts, Refunds, Discounts

These modules share the same CRUD route shape.

| Resource | Base Path | Create | List | Update | Delete |
| --- | --- | --- | --- | --- | --- |
| Invoice | `/api/invoice` | `POST /create` | `GET /` | `PUT /update/:id` | `DELETE /delete/:id` |
| Receipt | `/api/receipt` | `POST /create` | `GET /` | `PUT /update/:id` | `DELETE /delete/:id` |
| Refund | `/api/refund` | `POST /create` | `GET /` | `PUT /update/:id` | `DELETE /delete/:id` |
| Discount | `/api/discount` | `POST /create` | `GET /` | `PUT /update/:id` | `DELETE /delete/:id` |

## Example cURL

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"cashier@example.com\",\"password\":\"secret123\"}"
```

Create product:

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d "{\"name\":\"Wireless Mouse\",\"sku\":\"MOUSE-001\",\"sellingPrice\":799,\"costPrice\":520}"
```

List orders:

```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer <jwt-token>"
```

## Notes For Developers

- `server.js` mounts a few admin routes in addition to the routes already mounted in `app.js`.
- Some endpoints currently have no auth middleware even though they manage sensitive data. The `Auth` column documents the current code, not the recommended production policy.
- Product and order APIs include legacy aliases. Prefer `/api/products` and `/api/orders` for new frontend code.
