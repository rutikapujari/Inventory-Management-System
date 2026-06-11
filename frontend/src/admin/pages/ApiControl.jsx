import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  KeyRound,
  Layers3,
  Plus,
  ShieldCheck,
  Trash2,
  UserCog,
  XCircle,
} from "lucide-react";
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

const permissionKeys = ["canCreate", "canUpdate", "canDelete"];
const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";
const labelClass = "mb-2 block text-sm font-bold text-slate-900";

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

  const activePermissionCount = rules.reduce(
    (total, rule) => total + permissionKeys.filter((key) => Boolean(rule[key])).length,
    0,
  );
  const uniqueRoles = new Set(rules.map((rule) => rule.role).filter(Boolean)).size;
  const uniqueModules = new Set(rules.map((rule) => rule.module).filter(Boolean)).size;

  return (
    <div className="!block min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="mx-auto !block max-w-7xl space-y-6">
        <div className="!flex !w-full !flex-col !justify-between gap-5 overflow-hidden rounded-[30px] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200 lg:!flex-row lg:!items-center">
          <div className="!flex !items-center gap-4">
            <div className="!flex h-14 w-14 shrink-0 !items-center !justify-center rounded-2xl bg-white/10 text-indigo-200 ring-1 ring-white/10">
              <KeyRound size={28} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-200">Access Manager</p>
              <h1 className="mt-2 text-3xl font-bold text-white">API Control</h1>
              <p className="mt-1 text-sm text-slate-300">
                Control which roles can create, update, and delete module data.
              </p>
            </div>
          </div>

          <div className="!grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-slate-300">Rules</p>
              <p className="mt-1 text-xl font-bold text-white">{rules.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-slate-300">Roles</p>
              <p className="mt-1 text-xl font-bold text-white">{uniqueRoles}</p>
            </div>
            <div className="rounded-2xl bg-emerald-400/15 px-4 py-3 text-emerald-100 ring-1 ring-emerald-300/20">
              <p className="text-xs text-emerald-100/80">Permissions</p>
              <p className="mt-1 text-xl font-bold">{activePermissionCount}</p>
            </div>
          </div>
        </div>

        {message ? (
          <div className="!flex !items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-medium text-emerald-700">
            <CheckCircle2 size={18} /> {message}
          </div>
        ) : null}
        {error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div> : null}

        <div className="!grid grid-cols-1 gap-5 lg:grid-cols-[1fr_22rem]">
          <div className="!block rounded-[28px] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="mb-6 !flex !items-center gap-3">
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Create Access Rule</h2>
                <p className="text-sm text-slate-500">Choose a role, module, and allowed actions.</p>
              </div>
            </div>

            <div className="!grid grid-cols-1 items-end gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_auto]">
              <label>
                <span className={labelClass}>Role</span>
                <select value={form.role} onChange={(event) => handleForm("role", event.target.value)} className={inputClass}>
                  <option value="admin">Admin</option>
                  <option value="inventory-manager">Inventory Manager</option>
                  <option value="cashier">Cashier</option>
                </select>
              </label>
              <label>
                <span className={labelClass}>Module</span>
                <input value={form.module} onChange={(event) => handleForm("module", event.target.value)} className={inputClass} />
              </label>
              <button type="button" onClick={addRule} className="!inline-flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-100 transition hover:from-indigo-700 hover:to-blue-700">
                <Plus size={18} /> Add Rule
              </button>
            </div>

            <div className="mt-5 !grid grid-cols-1 gap-3 sm:grid-cols-3">
              {permissionKeys.map((key) => (
                <label key={key} className="!flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <span className="text-sm font-bold text-slate-800">{key.replace("can", "")}</span>
                  <input type="checkbox" checked={form[key]} onChange={(event) => handleForm(key, event.target.checked)} className="h-5 w-5 accent-indigo-600" />
                </label>
              ))}
            </div>
          </div>

          <div className="!block rounded-[28px] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="!flex !items-center gap-3">
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <Layers3 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Coverage</h2>
                <p className="text-sm text-slate-500">Active API rule summary.</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Protected Modules</p>
                <p className="mt-1 text-2xl font-bold text-slate-950">{uniqueModules}</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">Selected Rule</p>
                <p className="mt-1 font-bold text-indigo-900">
                  {form.role} / {form.module}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="!block overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-xl shadow-slate-200/60">
          <div className="border-b border-slate-100 p-6 !flex !items-center !justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Access Rules</h2>
              <p className="mt-1 text-sm text-slate-500">Review and update live role permissions.</p>
            </div>
            <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-blue-50 text-blue-600">
              <UserCog size={24} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-bold">Role</th>
                  <th className="px-6 py-4 font-bold">Module</th>
                  <th className="px-6 py-4 font-bold">Create</th>
                  <th className="px-6 py-4 font-bold">Update</th>
                  <th className="px-6 py-4 font-bold">Delete</th>
                  <th className="px-6 py-4 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rules.length ? (
                  rules.map((rule) => (
                    <tr key={rule._id || rule.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                          {rule.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{rule.module}</td>
                      {permissionKeys.map((key) => (
                        <td key={key} className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => toggleRule(rule, key)}
                            className={`!inline-flex !items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                              rule[key] ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {rule[key] ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            {rule[key] ? "Allowed" : "Blocked"}
                          </button>
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right">
                        <button type="button" onClick={() => removeRule(rule)} className="!inline-flex !items-center !justify-center rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100">
                          <Trash2 size={17} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                      {loading ? "Loading API access rules..." : "No API access rules found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
