import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AddUserModal from '../components/AddUserModal';

export default function Users() {
  const { usersList, loadingStates, errorStates } = useApp();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  if (loadingStates.users) return <div className="flex h-full w-full items-center justify-center"><Loader2 className="w-8 h-8 text-brand animate-spin" /></div>;
  if (errorStates.users) return <div className="text-red-600">Error: {errorStates.users}</div>;

  const filtered = usersList.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', count: usersList.length },
          { label: 'Admins', count: usersList.filter(u => u.role === 'Admin').length },
          { label: 'Managers', count: usersList.filter(u => u.role === 'Manager').length },
          { label: 'Cashiers', count: usersList.filter(u => u.role === 'Cashier').length }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-xs">
            <p className="text-xs font-medium text-slate-400">{stat.label}</p><h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.count}</h3>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3 text-slate-400" size={16} />
          <input type="text" placeholder="Search by name, email, or role..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand" />
        </div>
        <button onClick={() => setIsOpen(true)} className="bg-brand hover:bg-brand-hover text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center space-x-2"><Plus size={16} /><span>Add User</span></button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 font-semibold text-xs">
            <tr><th>USER</th><th>EMAIL</th><th>ROLE</th><th>STATUS</th><th>LAST LOGIN</th><th className="pr-6 text-right">ACTIONS</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((usr) => (
              <tr key={usr.email} className="hover:bg-slate-50/50">
                <td className="p-4 pl-6 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-brand flex items-center justify-center font-bold text-xs uppercase">{usr.name.charAt(0)}</div>
                  <span className="font-bold text-slate-900">{usr.name}</span>
                </td>
                <td>{usr.email}</td>
                <td><span className={`px-2 py-0.5 rounded text-xs font-semibold ${usr.role === 'Admin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>{usr.role}</span></td>
                <td><span className={`px-2 py-0.5 rounded text-xs font-medium ${usr.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{usr.status}</span></td>
                <td>{usr.login || 'Never'}</td>
                <td className="p-4 pr-6 text-right space-x-2"><button className="text-slate-400 hover:text-brand"><Edit2 size={15} /></button><button className="text-slate-400 hover:text-red-500"><Trash2 size={15} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}