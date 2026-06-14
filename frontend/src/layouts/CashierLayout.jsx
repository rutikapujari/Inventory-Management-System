import Sidebar from "../cashier/components/Sidebar";
import Navbar from "../cashier/components/Navbar";
import { CashierThemeProvider, useCashierTheme } from "../cashier/context/CashierThemeContext";
import { Outlet } from "react-router-dom";

function CashierLayoutShell() {
  const { darkMode } = useCashierTheme();

  return (
    <div
      className={`cashier-shell min-h-screen flex transition-colors duration-300 ${
        darkMode ? "cashier-dark bg-slate-950 text-slate-100" : "bg-gray-100 text-slate-900"
      }`}
    >
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        {/* Pages will load here */}
        <Outlet />
      </div>
    </div>
  );
}

function CashierLayout() {
  return (
    <CashierThemeProvider>
      <CashierLayoutShell />
    </CashierThemeProvider>
  );
}

export default CashierLayout;
