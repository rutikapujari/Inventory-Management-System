import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ENDPOINTS } from '../config';

export default function AddUserModal({ isOpen, onClose }) {
  const { fetchUsers } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Cashier', status: 'Active' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(ENDPOINTS.USERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, login: new Date().toISOString().slice(0, 16).replace('T', ' ') })
      });
      if (!response.ok) throw new Error('Submission failed.');
      await fetchUsers();
      onClose();
      setFormData({ name: '', email: '', role: 'Cashier', status: 'Active' });
    } catch (err) { alert(err.message); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h4 className="font-bold text-slate-800 text-base">Add New User</h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
            <input type="text" placeholder="Enter full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
            <input type="email" placeholder="user@retailpos.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Role</label>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-brand">
              <option>Cashier</option><option>Manager</option><option>Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-brand">
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
          <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 justify-end">
            <button type="submit" disabled={isSubmitting} className="bg-brand hover:bg-brand-hover disabled:bg-slate-400 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">{isSubmitting ? 'Adding...' : 'Add User'}</button>
            <button type="button" onClick={onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-medium transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}