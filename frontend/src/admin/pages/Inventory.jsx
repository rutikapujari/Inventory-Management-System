import React, { useState } from 'react';
import { Search, Plus, AlertCircle, Edit2, Trash2, Loader2, Package, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AddProductModal from '../components/AddProductModal';

export default function Inventory() {
  const { products, loadingStates, errorStates } = useApp();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  function handleEditProduct(product) {
    setEditingProduct(product);
    setIsOpen(true);
  }

  function handleDeleteProduct(product) {
    if (confirm(`Delete ${product.name}?`)) {
      alert('Product deleted successfully');
    }
  }

  if (loadingStates.products) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (errorStates.products) return <div className="text-red-600 p-6">Error: {errorStates.products}</div>;

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const lowStockCount = products.filter(p => p.stock <= 15).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, gradient: 'from-blue-600 to-indigo-600' },
    { label: 'Low Stock Items', value: lowStockCount, icon: TrendingDown, gradient: 'from-red-600 to-orange-600' },
    { label: 'Total Inventory Value', value: `$${totalValue.toFixed(2)}`, icon: AlertCircle, gradient: 'from-emerald-600 to-teal-600' },
  ];

  return (
    <div className="!block min-h-screen space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="!flex !w-full !flex-col !items-start !justify-between gap-4 md:!flex-row md:!items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-600 text-sm mt-1">Track, manage, and update your product inventory</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="!flex !w-fit !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="absolute -right-8 -top-8 opacity-10 w-32 h-32 bg-white rounded-full" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur">
                <stat.icon size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="!flex !w-full !flex-col !items-stretch gap-4 md:!flex-row md:!items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-4 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by product name, SKU, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
        <div className="!flex gap-2">
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            Filter
          </button>
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="!block overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-700">PRODUCT</th>
                <th className="p-4 font-semibold text-slate-700">SKU</th>
                <th className="p-4 font-semibold text-slate-700">CATEGORY</th>
                <th className="p-4 font-semibold text-slate-700">PRICE</th>
                <th className="p-4 font-semibold text-slate-700">STOCK</th>
                <th className="p-4 font-semibold text-slate-700">STATUS</th>
                <th className="p-4 text-right font-semibold text-slate-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.sku} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                          <Package size={18} className="text-indigo-600" />
                        </div>
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-700">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-medium">{product.sku}</span>
                    </td>
                    <td className="p-4">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">${product.price.toFixed(2)}</td>
                    <td className="p-4 font-bold text-slate-900">{product.stock}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          product.stock > 15
                            ? 'bg-emerald-100 text-emerald-700'
                            : product.stock > 5
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.stock > 15 ? 'In Stock' : product.stock > 5 ? 'Low Stock' : 'Critical'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditProduct(product)} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-xl transition-colors font-bold">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDeleteProduct(product)} className="text-red-600 hover:bg-red-50 p-2 rounded-xl transition-colors font-bold">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <Package size={48} className="text-slate-300 mb-3" />
                      <p className="font-medium">No products found</p>
                      <p className="text-xs mt-1">Try adjusting your search criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal isOpen={isOpen} onClose={() => { setIsOpen(false); setEditingProduct(null); }} product={editingProduct} />
    </div>
  );
}
