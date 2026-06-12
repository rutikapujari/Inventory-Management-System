import { useEffect, useMemo, useState } from "react";
import { Eye, Printer, RotateCcw, XCircle } from "lucide-react";
import API from "../../api/axios";
import { CASHIER_ENDPOINTS } from "../api/config";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refundOrder, setRefundOrder] = useState(null);
  const [refundForm, setRefundForm] = useState({ refundAmount: "", refundReason: "" });

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await API.get(CASHIER_ENDPOINTS.ORDERS);
        setOrders(response.data?.orders || response.data?.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Unable to load orders",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const orderId = order.orderNumber || order._id || order.id || "";
        const customerName =
          order.customer?.name || order.customer || "Unknown customer";
        const matchSearch =
          orderId.toString().toLowerCase().includes(search.toLowerCase()) ||
          customerName.toLowerCase().includes(search.toLowerCase());
        const status = order.status || order.orderStatus || "Pending";
        const matchFilter = filter === "All" || status === filter;
        return matchSearch && matchFilter;
      }),
    [orders, search, filter],
  );

  const formatOrderId = (order) => order.orderNumber || order._id || order.id || "—";

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setMessage("Order selected for review.");
  };

  const handlePrintOrder = (order) => {
    const orderId = formatOrderId(order);
    const orderDetails = `Order ID: ${orderId}\nCustomer: ${order.customer?.name || order.customer || "—"}\nAmount: ₹${order.totalAmount || order.amount || "—"}\nStatus: ${order.status || order.orderStatus || "Pending"}`;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print Order ${orderId}</title></head>
          <body style="font-family:Arial,sans-serif; padding:20px;">
            <pre>${orderDetails}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    } else {
      setMessage("Please allow pop-ups to print orders.");
    }
  };

  const handleCancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        formatOrderId(order) === orderId
          ? { ...order, status: "Cancelled", orderStatus: "Cancelled" }
          : order,
      ),
    );
    setMessage(`Order ${orderId} cancelled.`);
  };

  const openRefund = (order) => {
    const amount = order.totalAmount || order.amount || 0;
    setRefundOrder(order);
    setRefundForm({ refundAmount: amount, refundReason: "" });
    setMessage("");
    setError("");
  };

  const submitRefund = async () => {
    const orderId = refundOrder?._id || refundOrder?.id;

    if (!orderId) {
      setError("Cannot create refund because order ID is missing.");
      return;
    }

    if (!Number(refundForm.refundAmount || 0) || !refundForm.refundReason.trim()) {
      setError("Enter refund amount and reason.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await API.post(CASHIER_ENDPOINTS.REFUND_CREATE, {
        order: orderId,
        refundAmount: Number(refundForm.refundAmount),
        refundReason: refundForm.refundReason,
        refundStatus: "PENDING",
      });

      setMessage(`Refund request created for order ${formatOrderId(refundOrder)}.`);
      setRefundOrder(null);
      setRefundForm({ refundAmount: "", refundReason: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to create refund",
      );
    } finally {
      setLoading(false);
    }
  };

  const actionButtonClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-500">
            View, print, refund, and manage order status.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Orders"
            className="border rounded-2xl px-4 py-3"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-2xl px-4 py-3"
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {message ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {message}
        </div>
      ) : null}

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading orders...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length ? (
                filteredOrders.map((order) => {
                  const orderId = formatOrderId(order);
                  const customerName = order.customer?.name || order.customer || "—";
                  const amount = order.totalAmount || order.amount || "—";
                  const status = order.status || order.orderStatus || "Pending";
                  const date = new Date(order.createdAt || order.date || "").toLocaleDateString();

                  return (
                    <tr key={orderId} className="border-b last:border-b-0">
                      <td className="p-4">{orderId}</td>
                      <td className="p-4">{customerName}</td>
                      <td className="p-4">₹{amount}</td>
                      <td className="p-4">{status}</td>
                      <td className="p-4">{date}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewOrder(order)}
                          title="View order"
                          aria-label="View order"
                          className={`${actionButtonClass} bg-blue-600 focus:ring-blue-500`}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePrintOrder(order)}
                          title="Print order"
                          aria-label="Print order"
                          className={`${actionButtonClass} bg-indigo-600 focus:ring-indigo-500`}
                        >
                          <Printer size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openRefund(order)}
                          title="Refund order"
                          aria-label="Refund order"
                          className={`${actionButtonClass} bg-amber-500 focus:ring-amber-500`}
                        >
                          <RotateCcw size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancelOrder(orderId)}
                          title="Cancel order"
                          aria-label="Cancel order"
                          className={`${actionButtonClass} bg-red-600 focus:ring-red-500`}
                        >
                          <XCircle size={18} />
                        </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {selectedOrder ? (
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{formatOrderId(selectedOrder)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{selectedOrder.customer?.name || selectedOrder.customer || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-medium">₹{selectedOrder.totalAmount || selectedOrder.amount || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{selectedOrder.status || selectedOrder.orderStatus || "Pending"}</p>
            </div>
          </div>
        </div>
      ) : null}

      {refundOrder ? (
        <div className="bg-white rounded-3xl shadow p-6 border border-amber-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-semibold">Create Refund</h2>
              <p className="text-sm text-gray-500">
                Order {formatOrderId(refundOrder)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRefundOrder(null)}
              className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-[180px_1fr_auto]">
            <input
              type="number"
              min="1"
              value={refundForm.refundAmount}
              onChange={(e) =>
                setRefundForm((current) => ({
                  ...current,
                  refundAmount: e.target.value,
                }))
              }
              placeholder="Refund amount"
              className="border rounded-2xl px-4 py-3"
            />
            <input
              type="text"
              value={refundForm.refundReason}
              onChange={(e) =>
                setRefundForm((current) => ({
                  ...current,
                  refundReason: e.target.value,
                }))
              }
              placeholder="Refund reason"
              className="border rounded-2xl px-4 py-3"
            />
            <button
              type="button"
              disabled={loading}
              onClick={submitRefund}
              className="rounded-2xl bg-amber-500 text-white px-5 py-3 disabled:opacity-50"
            >
              Submit Refund
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Orders;
