import { FaBell, FaUserCircle } from "react-icons/fa";
import { useCashierTheme } from "../context/CashierThemeContext";

function Navbar() {
  const { darkMode } = useCashierTheme();

  return (
    <div
      className={`shadow-md px-6 py-4 flex justify-between items-center transition-colors duration-300 ${
        darkMode ? "bg-slate-900 text-slate-100 shadow-slate-950/40" : "bg-white text-slate-900"
      }`}
    >
      {/* Left Side */}
      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? "text-slate-100" : "text-gray-800"}`}>
          Cashier Dashboard
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <button className={`text-2xl ${darkMode ? "text-slate-200" : "text-gray-700"}`}>
          <FaBell />
        </button>

        <div className="flex items-center gap-2">
          <FaUserCircle className={`text-3xl ${darkMode ? "text-slate-200" : "text-gray-700"}`} />

          <div>
            <h3 className="font-semibold">Cashier</h3>

            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>Employee</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
