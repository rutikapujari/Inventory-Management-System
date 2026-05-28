import React, { useState } from 'react';
import { Search, ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function POSTerminal() {
  const { products, loadingStates, errorStates, cart, addToCart, removeFromCart } = useApp();
  const [search, setSearch] = useState('');

  if (loadingStates.products) return <div className="flex h-full w-full items-center justify-center"><Loader2 className="w-8 h-8 text-brand animate-spin" /></div>;
  if (errorStates.products) return <div className="text-red-600">Error: {errorStates.products}</div>;

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex h-full gap-6 items-start">
      <div className="flex-1 space-y-6 overflow-y-auto h-full pr-1">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          <input type="text" placeholder="Search products or scan barcode..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <div key={product.sku} onClick={() => addToCart(product)} className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md group flex flex-col justify-between">
              <div className="h-40 bg-slate-100 overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4 space-y-2">
                <h5 className="font-bold text-slate-800 text-sm">{product.name}</h5><p className="text-xs text-slate-400">SKU: {product.sku}</p>
                <div className="flex justify-between items-center"><span className="font-bold text-brand">${product.price.toFixed(2)}</span><span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{product.stock} in stock</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[380px] bg-white border border-slate-200 rounded-2xl flex flex-col h-full shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100"><h4 className="font-bold text-slate-800 text-base">Current Sale</h4></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2"><ShoppingCart size={36} className="text-slate-300" /><p className="text-sm font-medium">Cart is empty</p></div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-3 text-sm">
                  <img src={item.image} className="w-10 h-10 object-cover rounded-lg" alt="" />
                  <div><p className="font-bold text-slate-800 leading-tight">{item.name}</p><p className="text-xs text-slate-400 mt-0.5">${item.price.toFixed(2)} x {item.quantity}</p></div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-1.5 rounded-xl hover:bg-red-50"><Trash2 size={16} /></button>
              </div>
            ))
          )}
        </div>
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between text-slate-500"><span>Subtotal</span><span className="font-semibold text-slate-700">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-slate-500"><span>Tax (8%)</span><span className="font-semibold text-slate-700">${tax.toFixed(2)}</span></div>
            <hr className="border-slate-200 my-1" />
            <div className="flex justify-between text-base font-bold text-slate-900"><span>Total</span><span className="text-brand">${total.toFixed(2)}</span></div>
          </div>
          <button disabled={cart.length === 0} className="w-full bg-brand hover:bg-brand-hover disabled:bg-slate-200 text-white py-3 rounded-xl font-bold">Checkout</button>
        </div>
      </div>
    </div>
  );
}