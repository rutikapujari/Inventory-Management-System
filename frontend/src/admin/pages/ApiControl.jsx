import React, { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import {
  createAccessRule,
  deleteAccessRule,
  getAccessRules,
  updateAccessRule,
} from "../controllers/accessController";

const defaultRule = {
  role: "cashier",
  module: "billing",
  canCreate: true,
  canUpdate: false,
  canDelete: false,
};

export default function ApiControl() {
  const [rules, setRules] = useState([]);
  const [form, setForm] = useState(defaultRule);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadRules = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAccessRules();
      setRules(response?.data?.accessList || response?.data?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load API access rules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRules();
  }, []);

  const handleForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setMessage("");
    setError("");
  };

  const addRule = async () => {
    try {
      await createAccessRule(form);
      setForm(defaultRule);
      setMessage("API access rule added.");
      await loadRules();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to add API access rule");
    }
  };

  const toggleRule = async (rule, key) => {
    try {
      await updateAccessRule(rule._id || rule.id, { ...rule, [key]: !rule[key] });
      await loadRules();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to update API access rule");
    }
  };

  const removeRule = async (rule) => {
    if (!confirm(`Delete access rule for ${rule.role} / ${rule.module}?`)) return;

    try {
      await deleteAccessRule(rule._id || rule.id);
      setMessage("API access rule deleted.");
      await loadRules();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to delete API access rule");
    }
  };

  return (
    <div className="!block space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">API Control</h1>
        <p className="text-sm text-slate-600 mt-1">Control which roles can create, update, and delete module data.</p>
      </div>

      {message ? <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700">{message}</div> : null}
      {error ? <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">{error}</div> : null}

      <div className="!block rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="!grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_1fr_auto_auto_auto_auto]">
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Role</span>
            <select value={form.role} onChange={(event) => handleForm("role", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3">
              <option value="admin">Admin</option>
              <option value="inventory-manager">Inventory Manager</option>
              <option value="cashier">Cashier</option>
            </select>
          </label>
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Module</span>
            <input value={form.module} onChange={(event) => handleForm("module", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          {["canCreate", "canUpdate", "canDelete"].map((key) => (
            <label key={key} className="!flex !items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3">
              <input type="checkbox" checked={form[key]} onChange={(event) => handleForm(key, event.target.checked)} className="h-5 w-5 accent-indigo-600" />
              <span className="text-sm font-semibold text-slate-700">{key.replace("can", "")}</span>
            </label>
          ))}
          <button type="button" onClick={addRule} className="!inline-flex !items-center !justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-bold text-white">
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      <div className="!block overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Role</th>
              <th className="p-4">Module</th>
              <th className="p-4">Create</th>
              <th className="p-4">Update</th>
              <th className="p-4">Delete</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rules.length ? (
              rules.map((rule) => (
                <tr key={rule._id || rule.id} className="border-b last:border-b-0">
                  <td className="p-4 font-semibold text-slate-900">{rule.role}</td>
                  <td className="p-4 text-slate-700">{rule.module}</td>
                  {["canCreate", "canUpdate", "canDelete"].map((key) => (
                    <td key={key} className="p-4">
                      <input type="checkbox" checked={Boolean(rule[key])} onChange={() => toggleRule(rule, key)} className="h-5 w-5 accent-indigo-600" />
                    </td>
                  ))}
                  <td className="p-4 text-right">
                    <button type="button" onClick={() => removeRule(rule)} className="rounded-xl bg-red-50 p-2 text-red-600">
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  {loading ? "Loading API access rules..." : "No API access rules found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
