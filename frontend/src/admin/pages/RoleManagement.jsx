import React, { useMemo, useState } from "react";
import { Save, Shield, Users } from "lucide-react";
import { useApp } from "../context/AppContext";
import { updateUser } from "../controllers/userController";

const roles = [
  { value: "admin", label: "Admin" },
  { value: "inventory-manager", label: "Inventory Manager" },
  { value: "cashier", label: "Cashier" },
];

const normalizeRole = (role = "") => {
  const value = String(role).toLowerCase().trim();
  if (value === "manager" || value === "inventory") return "inventory-manager";
  return value || "cashier";
};

export default function RoleManagement() {
  const { usersList = [], fetchUsers } = useApp() || {};
  const [savingId, setSavingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const roleCounts = useMemo(
    () =>
      roles.map((role) => ({
        ...role,
        count: usersList.filter((user) => normalizeRole(user.role) === role.value).length,
      })),
    [usersList],
  );

  const changeRole = async (user, role) => {
    const id = user._id || user.id;
    setSavingId(id);
    setMessage("");
    setError("");

    try {
      await updateUser(id, { role });
      await fetchUsers?.();
      setMessage(`${user.name || user.email} role updated.`);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to update role");
    } finally {
      setSavingId("");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Manage User Roles</h1>
        <p className="text-sm text-slate-600 mt-1">Assign admin, manager, and cashier access.</p>
      </div>

      {message ? <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700">{message}</div> : null}
      {error ? <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">{error}</div> : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {roleCounts.map((role) => (
          <div key={role.value} className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{role.label}</p>
                <h2 className="text-3xl font-bold text-slate-900 mt-2">{role.count}</h2>
              </div>
              <Shield className="text-indigo-600" size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Current Role</th>
              <th className="p-4">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length ? (
              usersList.map((user) => {
                const id = user._id || user.id;
                return (
                  <tr key={id || user.email} className="group border-b last:border-b-0 transition-all duration-200 hover:bg-blue-50/70 hover:shadow-[inset_4px_0_0_#3b82f6]">
                    <td className="p-4 font-semibold text-slate-900">{user.name || "Unnamed"}</td>
                    <td className="p-4 text-slate-600 transition-colors group-hover:text-slate-800">{user.email}</td>
                    <td className="p-4 transition-colors group-hover:text-indigo-700">{normalizeRole(user.role)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <select
                          value={normalizeRole(user.role)}
                          onChange={(event) => changeRole(user, event.target.value)}
                          className="rounded-2xl border border-slate-200 px-4 py-2 transition-all duration-200 hover:border-indigo-300 hover:bg-white hover:shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                        >
                          {roles.map((role) => (
                            <option key={role.value} value={role.value}>{role.label}</option>
                          ))}
                        </select>
                        {savingId === id ? <Save className="animate-pulse text-indigo-600" size={18} /> : null}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  <Users className="mx-auto mb-2 text-slate-300" size={36} />
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
