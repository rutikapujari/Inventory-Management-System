import { useNavigate } from "react-router-dom";

const dashboardByRole = {
  admin: "/admin/dashboard",
  cashier: "/cashier/dashboard",
  manager: "/manager/dashboard",
  "inventory-manager": "/manager/dashboard",
};

export default function Unauthorized() {
  const navigate = useNavigate();

  const getCurrentRole = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      return String(user?.role || "").trim().toLowerCase();
    } catch {
      return "";
    }
  };

  const handleAdminLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login", { replace: true });
  };

  const handleDashboardRedirect = () => {
    const role = getCurrentRole();
    navigate(dashboardByRole[role] || "/login", { replace: true });
  };

  return (
    <div className="unauthorized-page flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="unauthorized-card w-full rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl font-bold text-red-600">
          !
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          You are not allowed to access this page
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Your current login does not have admin permission. Sign in with an
          admin account to open the admin dashboard.
        </p>
        <div className="unauthorized-actions mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAdminLogin}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
          >
            Login as Admin
          </button>
          <button
            type="button"
            onClick={handleDashboardRedirect}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
          >
            My Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
