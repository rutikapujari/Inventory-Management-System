import React, { useState } from 'react';
import { Search, Plus, AlertCircle, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AddProductModal from '../components/AddProductModal';

export default function Inventory() {
  const { products, loadingStates, errorStates } = useApp();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  if (loadingStates.products) return <div className="flex h-full w-full items-center justify-center"><Loader2 className="w-8 h-8 text-brand animate-spin" /></div>;
  if (errorStates.products) return <div className="text-red-600">Error: {errorStates.products}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3 text-slate-400" size={16} />
          <input type="text" placeholder="Search by name, SKU, or category..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
        </div>
        <button onClick={() => setIsOpen(true)} className="bg-brand hover:bg-brand-hover text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center space-x-2"><Plus size={16} /><span>Add Product</span></button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 text-xs">
            <tr><th>PRODUCT</th><th>SKU</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th><th>STATUS</th><th className="pr-6 text-right">ACTIONS</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
              <tr key={product.sku} className="hover:bg-slate-50/50">
                <td className="p-4 pl-6 font-bold text-slate-900">{product.name}</td><td>{product.sku}</td>
                <td><span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">{product.category}</span></td>
                <td className="font-bold">${product.price.toFixed(2)}</td><td>{product.stock}</td>
                <td><span className={`px-2 py-0.5 rounded text-xs font-medium ${product.stock > 15 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{product.stock > 15 ? 'In Stock' : 'Low Stock'}</span></td>
                <td className="p-4 pr-6 text-right space-x-2"><button className="text-slate-400 hover:text-brand"><Edit2 size={15} /></button><button className="text-slate-400 hover:text-red-500"><Trash2 size={15} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}