import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-screen bg-[#EEF2FF] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white mb-3"><ShoppingCart size={24} /></div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">RetailPOS</h1>
          <p className="text-sm text-slate-500">Omnichannel Retail Management</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Email</label>
            <input type="email" defaultValue="admin@retailpos.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand text-sm" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Password</label>
            <input type="password" defaultValue="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand text-sm" required />
          </div>
          <button type="submit" className="w-full bg-brand hover:bg-brand-hover text-white py-2.5 rounded-xl font-bold shadow-md shadow-indigo-100 transition-colors text-sm">Login</button>
        </form>
      </div>
      <p className="text-center text-xs text-slate-400 mt-6">© 2026 RetailPOS. All rights reserved.</p>
    </div>
  );
}