import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CashierThemeContext = createContext(null);
const STORAGE_KEY = "cashierDarkMode";

const getStoredDarkMode = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(STORAGE_KEY) === "true";
};

export function CashierThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(getStoredDarkMode);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(darkMode));
    document.documentElement.classList.toggle("cashier-dark-mode", darkMode);
  }, [darkMode]);

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,
      toggleDarkMode: () => setDarkMode((current) => !current),
    }),
    [darkMode],
  );

  return (
    <CashierThemeContext.Provider value={value}>
      {children}
    </CashierThemeContext.Provider>
  );
}

export function useCashierTheme() {
  const context = useContext(CashierThemeContext);

  if (!context) {
    throw new Error("useCashierTheme must be used inside CashierThemeProvider");
  }

  return context;
}
