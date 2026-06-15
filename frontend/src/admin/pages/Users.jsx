import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Loader2, Users as UsersIcon, Shield, Lock, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AddUserModal from '../components/AddUserModal';
import { deleteUser } from '../controllers/userController';

const roleLabels = {
  admin: 'Admin',
  cashier: 'Cashier',
  'inventory-manager': 'Inventory Manager',
};

const normalizeRole = (role = '') => {
  const normalized = String(role).toLowerCase().trim();

  if (normalized === 'manager' || normalized === 'inventory') {
    return 'inventory-manager';
  }

  return normalized;
};
const getRoleLabel = (role) => roleLabels[normalizeRole(role)] || role || 'User';
const getStatus = (user) => user.status || 'Active';

export default function Users() {
  const {
    usersList: initialUsersList,
    setUsersList,
    fetchUsers,
    loadingStates = {},
    errorStates = {},
  } = useApp() || {};
  const usersList = initialUsersList || [];
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  if (loadingStates.users) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (errorStates.users) return <div className="text-red-600 p-6">Error: {errorStates.users}</div>;

  const adminCount = usersList.filter(u => normalizeRole(u.role) === 'admin').length;
  const managerCount = usersList.filter(u => normalizeRole(u.role) === 'inventory-manager').length;
  const cashierCount = usersList.filter(u => normalizeRole(u.role) === 'cashier').length;

  const filtered = usersList.filter(u => {
    const query = search.toLowerCase();
    const matchesSearch =
      (u.name || '').toLowerCase().includes(query) ||
      (u.email || '').toLowerCase().includes(query);
    const matchesRole = roleFilter === 'All' || normalizeRole(u.role) === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDelete = async (usr) => {
    if (!confirm(`Delete user ${usr.name}?`)) return;

    try {
      await deleteUser(usr._id || usr.id);
      setUsersList?.((current) => current.filter((item) => (item._id || item.id) !== (usr._id || usr.id)));
    } catch (error) {
      alert(error?.response?.data?.message || error.message || 'Failed to delete user');
    }
  };

  const statCards = [
    { label: 'Total Users', count: usersList.length, icon: UsersIcon, gradient: 'from-indigo-600 to-blue-600', lightGradient: 'from-indigo-50 to-blue-50' },
    { label: 'Admins', count: adminCount, icon: Shield, gradient: 'from-purple-600 to-pink-600', lightGradient: 'from-purple-50 to-pink-50' },
    { label: 'Managers', count: managerCount, icon: Lock, gradient: 'from-amber-600 to-orange-600', lightGradient: 'from-amber-50 to-orange-50' },
    { label: 'Cashiers', count: cashierCount, icon: LogIn, gradient: 'from-emerald-600 to-teal-600', lightGradient: 'from-emerald-50 to-teal-50' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
        <p className="text-slate-600 text-sm mt-1">Manage system users, roles, and permissions</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">{stat.count}</h3>
                </div>
                <div className={`bg-gradient-to-br ${stat.lightGradient} p-3 rounded-2xl`}>
                  <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Roles</option>
            <option value="admin">Admin</option>
            <option value="inventory-manager">Inventory Manager</option>
            <option value="cashier">Cashier</option>
          </select>
          <button
            onClick={() => { setEditingUser(null); setIsOpen(true); }}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={18} /> Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        {filtered.length > 0 ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
              <tr className="text-slate-600 font-bold text-xs uppercase tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((usr) => (
                <tr key={usr._id || usr.id || usr.email} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{usr.name}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{usr.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      normalizeRole(usr.role) === 'admin' ? 'bg-purple-50 text-purple-700' :
                      normalizeRole(usr.role) === 'inventory-manager' ? 'bg-amber-50 text-amber-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      {getRoleLabel(usr.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      getStatus(usr).toLowerCase() === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getStatus(usr)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs">{usr.login || 'Never'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => { setEditingUser(usr); setIsOpen(true); }}
                        className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-all font-bold"
                        title="Edit user"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(usr)}
                        className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all font-bold"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <UsersIcon size={48} className="text-slate-300 mb-3" />
            <p className="font-medium">No users found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <AddUserModal
        isOpen={isOpen}
        onClose={() => { setIsOpen(false); setEditingUser(null); }}
        onSaved={() => fetchUsers?.()}
        user={editingUser}
      />
    </div>
  );
}
