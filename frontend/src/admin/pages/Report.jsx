import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  CheckCircle2,
  Download,
  FileText,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getLowStockReport,
  getPurchaseReport,
  getStockReport,
  getSupplierReport,
} from "../controllers/reportController";

const currency = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "INR",
});

const statusColors = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];
const chartCardClass =
  "!block rounded-[28px] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60";

const getArray = (response, key) => {
  const data = response?.data || {};
  return Array.isArray(data) ? data : data[key] || data.data || [];
};

export default function Report() {
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setLoading(true);
    setError("");

    try {
      const [stockResponse, lowStockResponse, purchaseResponse, supplierResponse] =
        await Promise.all([
          getStockReport(),
          getLowStockReport(),
          getPurchaseReport(),
          getSupplierReport(),
        ]);

      setProducts(getArray(stockResponse, "products"));
      setLowStockProducts(getArray(lowStockResponse, "lowStockProducts"));
      setPurchases(getArray(purchaseResponse, "purchases"));
      setSuppliers(getArray(supplierResponse, "suppliers"));
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  const totalStockValue = useMemo(
    () =>
      products.reduce(
        (sum, item) =>
          sum + Number(item.sellingPrice || item.price || 0) * Number(item.stock || 0),
        0,
      ),
    [products],
  );

  const categoryData = useMemo(() => {
    const grouped = products.reduce((acc, product) => {
      const category = product.category?.name || product.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + Number(product.stock || 0);
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [products]);

  const purchaseTrend = useMemo(() => {
    const grouped = purchases.reduce((acc, purchase) => {
      const date = purchase.createdAt ? new Date(purchase.createdAt) : new Date();
      const name = date.toLocaleString("en-US", { month: "short" });
      const total = Number(purchase.totalAmount || purchase.total || purchase.amount || 0);
      acc[name] = (acc[name] || 0) + total;
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [purchases]);

  const stockHealth = [
    { name: "Healthy Stock", value: Math.max(products.length - lowStockProducts.length, 0) },
    { name: "Low Stock", value: lowStockProducts.length },
  ];

  const reportCards = [
    {
      label: "Total Products",
      value: products.length,
      note: "Inventory records",
      icon: Boxes,
      tone: "from-blue-600 to-indigo-600",
      soft: "bg-blue-50 text-blue-700",
    },
    {
      label: "Low Stock",
      value: lowStockProducts.length,
      note: "Needs attention",
      icon: AlertTriangle,
      tone: "from-amber-500 to-orange-600",
      soft: "bg-amber-50 text-amber-700",
    },
    {
      label: "Suppliers",
      value: suppliers.length,
      note: "Vendor network",
      icon: Truck,
      tone: "from-emerald-600 to-teal-600",
      soft: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Stock Value",
      value: currency.format(totalStockValue),
      note: "Current valuation",
      icon: ShoppingBag,
      tone: "from-violet-600 to-fuchsia-600",
      soft: "bg-violet-50 text-violet-700",
    },
  ];

  const handleExport = () => {
    const rows = [
      ["Name", "SKU", "Category", "Stock", "Selling Price", "Cost Price"],
      ...products.map((product) => [
        product.name || "",
        product.sku || "",
        product.category?.name || product.category || "",
        product.stock ?? 0,
        product.sellingPrice ?? product.price ?? "",
        product.costPrice ?? "",
      ]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "admin-inventory-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="!block min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="mx-auto !block max-w-7xl space-y-6">
        <div className="!flex !w-full !flex-col !justify-between gap-6 overflow-hidden rounded-[30px] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200 lg:!flex-row lg:!items-center">
          <div className="!flex !items-center gap-4">
            <div className="!flex h-14 w-14 shrink-0 !items-center !justify-center rounded-2xl bg-white/10 text-cyan-200 ring-1 ring-white/10">
              <FileText size={28} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Admin Analytics</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Reports</h1>
              <p className="mt-1 text-sm text-slate-300">
                Track stock health, purchase trends, supplier coverage, and inventory value.
              </p>
            </div>
          </div>

          <div className="!flex !flex-col gap-3 sm:!flex-row">
            <button
              type="button"
              onClick={fetchReports}
              className="!flex !items-center !justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-bold text-white ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-950/30 transition hover:from-cyan-400 hover:to-blue-500"
            >
              <Download size={17} />
              Export
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="!grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reportCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="!block overflow-hidden rounded-[26px] border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
                <div className={`h-1.5 bg-gradient-to-r ${card.tone}`} />
                <div className="p-5">
                  <div className="!flex !items-start !justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                      <h2 className="mt-2 text-2xl font-bold text-slate-950">{loading ? "..." : card.value}</h2>
                      <p className="mt-1 text-xs text-slate-400">{card.note}</p>
                    </div>
                    <div className={`!flex h-12 w-12 !items-center !justify-center rounded-2xl ${card.soft}`}>
                      <Icon size={22} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="!grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className={`${chartCardClass} xl:col-span-2`}>
            <div className="mb-6 !flex !items-center !justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Stock by Category</h2>
                <p className="mt-1 text-sm text-slate-500">Available quantity grouped by category.</p>
              </div>
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <BarChart3 size={24} />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className={chartCardClass}>
            <div className="mb-6 !flex !items-center !justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Stock Health</h2>
                <p className="mt-1 text-sm text-slate-500">Low stock versus healthy items.</p>
              </div>
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stockHealth} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={4}>
                    {stockHealth.map((entry, index) => (
                      <Cell key={entry.name} fill={statusColors[index % statusColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="!grid grid-cols-2 gap-3">
              {stockHealth.map((item, index) => (
                <div key={item.name} className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-500">{item.name}</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{item.value}</p>
                  <div className="mt-2 h-1.5 rounded-full" style={{ backgroundColor: statusColors[index] }} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="!grid grid-cols-1 gap-6 xl:grid-cols-2">
          <section className={chartCardClass}>
            <div className="mb-6 !flex !items-center !justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Purchase Trend</h2>
                <p className="mt-1 text-sm text-slate-500">Purchase amount grouped by month.</p>
              </div>
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <Sparkles size={24} />
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={purchaseTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => currency.format(value)} />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="!block overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-xl shadow-slate-200/60">
            <div className="border-b border-slate-100 p-6 !flex !items-center !justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Low Stock Items</h2>
                <p className="mt-1 text-sm text-slate-500">Products below minimum threshold.</p>
              </div>
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-amber-50 text-amber-600">
                <PackageCheck size={24} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">Product</th>
                    <th className="px-6 py-4 font-bold">SKU</th>
                    <th className="px-6 py-4 font-bold">Stock</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lowStockProducts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                        No low stock products found.
                      </td>
                    </tr>
                  ) : (
                    lowStockProducts.slice(0, 6).map((product) => (
                      <tr key={product._id || product.id || product.sku} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-900">{product.name}</td>
                        <td className="px-6 py-4 text-slate-600">{product.sku || "-"}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">{product.stock ?? 0}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                            Reorder
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
