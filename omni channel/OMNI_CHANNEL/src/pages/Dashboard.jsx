import React from 'react';
import { DollarSign, ShoppingBag, Layers, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { dashboardStats, dashboardDetails, loadingStates, errorStates, products } = useApp();

  if (loadingStates.dashboard) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  if (errorStates.dashboard) return <div className="text-red-600 text-sm">Error: {errorStates.dashboard}</div>;

  const cards = [
    { title: 'Total Revenue', value: dashboardStats.totalRevenue, change: dashboardStats.revenueChange, icon: DollarSign, color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Total Orders', value: dashboardStats.totalOrders, change: dashboardStats.ordersChange, icon: ShoppingBag, color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Products', value: products.length, change: dashboardStats.productsSubtitle, icon: Layers, color: 'bg-purple-50 text-purple-600' },
    { title: 'Growth Rate', value: dashboardStats.growthRate, change: dashboardStats.growthChange, icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl flex items-start justify-between shadow-xs">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{card.value}</h3>
              <p className={`text-xs ${card.change.includes('+') ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>{card.change}</p>
            </div>
            <div className={`p-3 rounded-xl ${card.color}`}><card.icon size={22} /></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl">
          <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase">Monthly Sales</h4>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={dashboardDetails.salesData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" /><XAxis dataKey="name" tickLine={false} stroke="#94A3B8" /><YAxis tickLine={false} stroke="#94A3B8" /><Tooltip /><Bar dataKey="value" fill="#5046E5" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl">
          <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase">Weekly Revenue</h4>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={dashboardDetails.revenueData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" /><XAxis dataKey="name" tickLine={false} stroke="#94A3B8" /><YAxis tickLine={false} stroke="#94A3B8" /><Tooltip /><Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} /></LineChart></ResponsiveContainer></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 text-xs">
              <tr><th className="p-4 pl-6">ORDER ID</th><th className="p-4">CUSTOMER</th><th className="p-4">ITEMS</th><th className="p-4">TOTAL</th><th className="p-4 pr-6">STATUS</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dashboardDetails.recentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-4 pl-6 font-bold">{order.id}</td><td className="p-4">{order.name}</td><td>{order.items}</td><td className="font-bold">{order.total}</td>
                  <td className="p-4 pr-6"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${order.color}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 text-red-600 font-bold"><AlertCircle size={18} /><h4>Low Stock Alert</h4></div>
          <div className="space-y-3">
            {products.filter(p => p.stock <= 25).map((item) => (
              <div key={item.sku} className="p-4 rounded-xl bg-red-50/50 flex justify-between items-center text-sm">
                <div><p className="font-semibold text-slate-900">{item.name}</p><p className="text-xs text-slate-400">SKU: {item.sku}</p></div>
                <span className="text-xs font-bold text-red-600 bg-white px-2 py-1 rounded-md">{item.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}