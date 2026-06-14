import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Clock,
  CreditCard,
  Receipt,
  Smartphone,
} from "lucide-react";
import API from "../../api/axios";
import { CASHIER_ENDPOINTS } from "../api/config";

const formatCurrency = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

const statusStyles = {
  SUCCESS: "border-emerald-100 bg-emerald-50 text-emerald-700",
  PAID: "border-emerald-100 bg-emerald-50 text-emerald-700",
  COMPLETED: "border-emerald-100 bg-emerald-50 text-emerald-700",
  PENDING: "border-amber-100 bg-amber-50 text-amber-700",
  FAILED: "border-red-100 bg-red-50 text-red-700",
  CANCELLED: "border-red-100 bg-red-50 text-red-700",
};

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await API.get(CASHIER_ENDPOINTS.PAYMENTS);
        setPayments(response.data?.payments || response.data?.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Unable to load payments",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const totalBy = (value, field = "paymentMethod") =>
    payments
      .filter((payment) => String(payment[field] || "").toUpperCase() === value)
      .reduce(
        (sum, payment) =>
          sum + Number(payment.amount || payment.finalAmount || 0),
        0,
      );

  const summaryCards = useMemo(
    () => [
      {
        label: "Cash Payments",
        value: formatCurrency(totalBy("CASH")),
        icon: Banknote,
        tone: "border-emerald-100 bg-emerald-50 text-emerald-700",
      },
      {
        label: "UPI Payments",
        value: formatCurrency(totalBy("UPI")),
        icon: Smartphone,
        tone: "border-blue-100 bg-blue-50 text-blue-700",
      },
      {
        label: "Card Payments",
        value: formatCurrency(totalBy("CARD")),
        icon: CreditCard,
        tone: "border-indigo-100 bg-indigo-50 text-indigo-700",
      },
      {
        label: "Pending Payments",
        value: formatCurrency(totalBy("PENDING", "paymentStatus")),
        icon: Clock,
        tone: "border-amber-100 bg-amber-50 text-amber-700",
      },
    ],
    [payments],
  );

  const totalCollected = payments.reduce(
    (sum, payment) =>
      sum + Number(payment.amount || payment.finalAmount || payment.totalAmount || 0),
    0,
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-gray-500">
            Overview of payment activity and recent transactions.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Total Collected
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatCurrency(totalCollected)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="mt-4 text-2xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${card.tone}`}
                >
                  <Icon size={20} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Receipt size={19} />
            </span>
            <div>
              <h2 className="font-semibold text-slate-900">Recent Payments</h2>
              <p className="text-sm text-slate-500">
                {payments.length} transactions available
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading payments...</div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 p-8 text-red-600">
            <AlertCircle size={18} />
            {error}
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full table-fixed text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="w-[24%] p-4">Payment ID</th>
                  <th className="w-[18%] p-4">Customer</th>
                  <th className="w-[15%] p-4">Amount</th>
                  <th className="w-[13%] p-4">Method</th>
                  <th className="w-[16%] p-4">Reference</th>
                  <th className="w-[14%] p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length ? (
                  payments.map((payment) => {
                    const paymentId = payment._id || payment.id || "-";
                    const customerName =
                      payment.order?.customer?.name ||
                      payment.customer?.name ||
                      "-";
                    const amount =
                      payment.amount || payment.finalAmount || payment.totalAmount || 0;
                    const method = payment.method || payment.paymentMethod || "-";
                    const reference =
                      payment.paymentReference || payment.transactionId || "-";
                    const status = String(payment.paymentStatus || "PENDING").toUpperCase();
                    const statusClass =
                      statusStyles[status] ||
                      "border-slate-200 bg-slate-50 text-slate-700";

                    return (
                      <tr
                        key={paymentId}
                        className="border-b last:border-b-0 hover:bg-slate-50"
                      >
                        <td className="truncate p-4 font-mono text-xs text-slate-700">
                          {paymentId}
                        </td>
                        <td className="truncate p-4 font-medium text-slate-900">
                          {customerName}
                        </td>
                        <td className="p-4 font-semibold text-slate-900">
                          {formatCurrency(amount)}
                        </td>
                        <td className="p-4">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {method}
                          </span>
                        </td>
                        <td className="truncate p-4 font-mono text-xs text-slate-600">
                          {reference}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
                          >
                            <CheckCircle2 size={13} />
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payments;
