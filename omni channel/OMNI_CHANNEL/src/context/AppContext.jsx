import React, { createContext, useContext, useState, useEffect } from 'react';
import { ENDPOINTS } from '../config';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user] = useState({ name: 'Admin User', role: 'Administrator' });
  const [cart, setCart] = useState([]);
  
  const [products, setProducts] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [dashboardDetails, setDashboardDetails] = useState(null);

  const [loadingStates, setLoadingStates] = useState({ products: true, users: true, dashboard: true });
  const [errorStates, setErrorStates] = useState({ products: null, users: null, dashboard: null });

  const fetchProducts = async () => {
    try {
      setLoadingStates(p => ({ ...p, products: true }));
      const res = await fetch(ENDPOINTS.PRODUCTS);
      if (!res.ok) throw new Error('Failed to pull items.');
      setProducts(await res.json());
    } catch (err) { setErrorStates(p => ({ ...p, products: err.message })); }
    finally { setLoadingStates(p => ({ ...p, products: false })); }
  };

  const fetchUsers = async () => {
    try {
      setLoadingStates(p => ({ ...p, users: true }));
      const res = await fetch(ENDPOINTS.USERS);
      if (!res.ok) throw new Error('Failed to pull users.');
      setUsersList(await res.json());
    } catch (err) { setErrorStates(p => ({ ...p, users: err.message })); }
    finally { setLoadingStates(p => ({ ...p, users: false })); }
  };

  const fetchDashboardData = async () => {
    try {
      setLoadingStates(p => ({ ...p, dashboard: true }));
      const [statsRes, detailsRes] = await Promise.all([
        fetch(ENDPOINTS.DASHBOARD_STATS),
        fetch(ENDPOINTS.DASHBOARD_CHARTS)
      ]);
      if (!statsRes.ok || !detailsRes.ok) throw new Error('Failed to pull metrics.');
      setDashboardStats(await statsRes.json());
      setDashboardDetails(await detailsRes.json());
    } catch (err) { setErrorStates(p => ({ ...p, dashboard: err.message })); }
    finally { setLoadingStates(p => ({ ...p, dashboard: false })); }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchDashboardData();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ 
      user, cart, addToCart, removeFromCart, clearCart,
      products, usersList, dashboardStats, dashboardDetails,
      loadingStates, errorStates, fetchProducts, fetchUsers, fetchDashboardData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);