import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ENDPOINTS } from '../config';

export default function AddProductModal({ isOpen, onClose }) {
  const { fetchProducts } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', sku: '', category: 'Electronics', price: '', stock: '', reorder: '10' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(ENDPOINTS.PRODUCTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, sku: formData.sku, category: formData.category,
          price: parseFloat(formData.price), stock: parseInt(formData.stock), reorderLevel: parseInt(formData.reorder)
        })
      });
      if (!response.ok) throw new Error('Submission failed.');
      await fetchProducts();
      onClose();
      setFormData({ name: '', sku: '', category: 'Electronics', price: '', stock: '', reorder: '10' });
    } catch (err) { alert(err.message); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h4 className="font-bold text-slate-800 text-base">Add New Product</h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Product Name</label>
            <input type="text" placeholder="Enter product name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">SKU</label>
              <input type="text" placeholder="SKU001" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
              <input type="text" placeholder="Electronics" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand" required />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Price</label>
              <input type="number" step="0.01" placeholder="0.00" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stock</label>
              <input type="number" placeholder="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Reorder Level</label>
              <input type="number" placeholder="10" value={formData.reorder} onChange={e => setFormData({...formData, reorder: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand" required />
            </div>
          </div>
          <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 justify-end">
            <button type="submit" disabled={isSubmitting} className="bg-brand hover:bg-brand-hover disabled:bg-slate-400 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">{isSubmitting ? 'Adding...' : 'Add Product'}</button>
            <button type="button" onClick={onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-medium transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}