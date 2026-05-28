import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Boxes, Users, LogOut, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'POS Terminal', path: '/terminal', icon: ShoppingCart },
    { name: 'Inventory', path: '/inventory', icon: Boxes },
    { name: 'Users', path: '/users', icon: Users },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 h-full flex-shrink-0">
        <div>
          <div className="mb-8 px-2 py-1">
            <h1 className="text-xl font-bold text-brand tracking-tight">RetailPOS</h1>
            <p className="text-xs text-slate-400">Omnichannel Management</p>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive ? 'bg-brand-light text-brand' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut size={18} /><span>Logout</span>
        </button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800">
            {menuItems.find(m => m.path === location.pathname)?.name || 'Control Panel'}
          </h2>
          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer p-1 rounded-full hover:bg-slate-50">
              <Bell size={20} className="text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-3 border-l pl-6 border-slate-200">
              <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm">A</div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-none">{user.role}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}