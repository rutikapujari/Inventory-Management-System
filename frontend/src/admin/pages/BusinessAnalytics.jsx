import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Boxes,
  ChartNoAxesCombined,
  IndianRupee,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getBusinessAnalytics } from "../controllers/analyticsController";

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");
const panelClass =
  "!block rounded-[28px] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60";

export default function BusinessAnalytics() {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAnalytics() {
      setLoading(true);
      setError("");

      try {
        const response = await getBusinessAnalytics();
        setAnalytics(response?.data?.analytics || {});
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  const cards = [
    {
      label: "Products",
      value: analytics.totalProducts,
      icon: Boxes,
      color: "text-blue-700 bg-blue-50",
      tone: "from-blue-600 to-indigo-600",
      note: "Inventory items",
    },
    {
      label: "Categories",
      value: analytics.totalCategories,
      icon: BarChart3,
      color: "text-indigo-700 bg-indigo-50",
      tone: "from-indigo-600 to-violet-600",
      note: "Catalog groups",
    },
    {
      label: "Suppliers",
      value: analytics.totalSuppliers,
      icon: Truck,
      color: "text-emerald-700 bg-emerald-50",
      tone: "from-emerald-600 to-teal-600",
      note: "Vendor network",
    },
    {
      label: "Purchase Orders",
      value: analytics.totalPurchaseOrders,
      icon: ShoppingBag,
      color: "text-amber-700 bg-amber-50",
      tone: "from-amber-500 to-orange-600",
      note: "Procurement flow",
    },
  ];

  const chartData = useMemo(
    () => [
      { name: "Products", value: Number(analytics.totalProducts || 0) },
      { name: "Categories", value: Number(analytics.totalCategories || 0) },
      { name: "Suppliers", value: Number(analytics.totalSuppliers || 0) },
      { name: "Orders", value: Number(analytics.totalPurchaseOrders || 0) },
      { name: "Low Stock", value: Number(analytics.lowStockCount || 0) },
    ],
    [analytics],
  );

  return (
    <div className="!block min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="mx-auto !block max-w-7xl space-y-6">
        <div className="!flex !w-full !flex-col !justify-between gap-6 overflow-hidden rounded-[30px] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200 lg:!flex-row lg:!items-center">
          <div className="!flex !items-center gap-4">
            <div className="!flex h-14 w-14 shrink-0 !items-center !justify-center rounded-2xl bg-white/10 text-cyan-200 ring-1 ring-white/10">
              <ChartNoAxesCombined size={28} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Business Intelligence</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Business Analytics</h1>
              <p className="mt-1 text-sm text-slate-300">
                Track inventory, purchasing, suppliers, and stock health from one admin view.
              </p>
            </div>
          </div>

          <div className="!grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-slate-300">Stock Value</p>
              <p className="mt-1 text-xl font-bold text-white">INR {formatNumber(analytics.totalStockValue)}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-slate-300">Low Stock</p>
              <p className="mt-1 text-xl font-bold text-white">{formatNumber(analytics.lowStockCount)}</p>
            </div>
            <div className="rounded-2xl bg-emerald-400/15 px-4 py-3 text-emerald-100 ring-1 ring-emerald-300/20">
              <p className="text-xs text-emerald-100/80">Status</p>
              <p className="mt-1 text-xl font-bold">{loading ? "Loading" : "Live"}</p>
            </div>
          </div>
        </div>

        {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div> : null}

        <div className="!grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="!block overflow-hidden rounded-[26px] border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
                <div className={`h-1.5 bg-gradient-to-r ${card.tone}`} />
                <div className="p-5">
                  <div className="!flex !items-start !justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                      <h2 className="mt-2 text-3xl font-bold text-slate-950">{loading ? "..." : formatNumber(card.value)}</h2>
                      <p className="mt-1 text-xs text-slate-400">{card.note}</p>
                    </div>
                    <div className={`!flex h-12 w-12 !items-center !justify-center rounded-2xl ${card.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="!grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
          <section className={panelClass}>
            <div className="mb-6 !flex !items-center !justify-between gap-4">
              <div className="!flex !items-center gap-3">
                <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Activity size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Operational Snapshot</h2>
                  <p className="mt-1 text-sm text-slate-500">Core business metrics compared side-by-side.</p>
                </div>
              </div>
              <Sparkles className="text-cyan-600" size={22} />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className={panelClass}>
            <div className="!flex !items-center gap-3">
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <IndianRupee size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Stock Value</h2>
                <p className="text-sm text-slate-500">Current valuation and risk status.</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Current value</p>
              <p className="mt-2 text-3xl font-bold">INR {formatNumber(analytics.totalStockValue)}</p>
              <div className="mt-4 !flex !items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-sm text-slate-200">
                <AlertTriangle size={16} className="text-amber-300" />
                Low stock products: {formatNumber(analytics.lowStockCount)}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="!flex !items-center gap-2">
                <PackageCheck size={18} className="text-emerald-600" />
                <h3 className="font-bold text-slate-900">Recent Orders</h3>
              </div>
              {(analytics.recentOrders || []).slice(0, 5).map((order) => (
                <div key={order._id || order.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{order.orderNumber || order._id || "Purchase order"}</p>
                  <p className="text-sm text-slate-500">Recent purchase activity</p>
                </div>
              ))}
              {!analytics.recentOrders?.length ? (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No recent purchase orders found.</p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
