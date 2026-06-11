import React, { useEffect, useState } from "react";
import { Building2, Save } from "lucide-react";
import { getSettings, updateSettings } from "../controllers/settingsController";

const defaultStore = {
  storeName: "RetailPOS System",
  email: "admin@retailpos.com",
  phone: "",
  currency: "INR",
  timezone: "Asia/Kolkata",
  lowStockLimit: 10,
};

export default function StoreManagement() {
  const [store, setStore] = useState(defaultStore);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStore() {
      try {
        const response = await getSettings();
        setStore((current) => ({ ...current, ...(response?.data?.settings || {}) }));
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load store settings");
      }
    }

    loadStore();
  }, []);

  const handleChange = (key, value) => {
    setStore((current) => ({ ...current, [key]: value }));
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        ...store,
        companyName: store.storeName,
        companyEmail: store.email,
        mobileNumber: store.phone,
      };
      const response = await updateSettings(payload);
      setStore((current) => ({ ...current, ...(response?.data?.settings || payload) }));
      setMessage("Store settings saved.");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to save store settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="!block space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Store Management</h1>
        <p className="text-sm text-slate-600 mt-1">Manage store identity, contact details, and operating defaults.</p>
      </div>

      {message ? <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700">{message}</div> : null}
      {error ? <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">{error}</div> : null}

      <div className="!block space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="!flex !items-center gap-3">
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
            <Building2 size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Store Profile</h2>
        </div>

        <div className="!grid grid-cols-1 gap-5 md:grid-cols-2">
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Store Name</span>
            <input value={store.storeName || ""} onChange={(event) => handleChange("storeName", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Store Email</span>
            <input type="email" value={store.email || ""} onChange={(event) => handleChange("email", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Phone</span>
            <input value={store.phone || ""} onChange={(event) => handleChange("phone", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Low Stock Limit</span>
            <input type="number" value={store.lowStockLimit ?? 10} onChange={(event) => handleChange("lowStockLimit", Number(event.target.value || 0))} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Currency</span>
            <select value={store.currency || "INR"} onChange={(event) => handleChange("currency", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3">
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </label>
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Timezone</span>
            <select value={store.timezone || "Asia/Kolkata"} onChange={(event) => handleChange("timezone", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3">
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </label>
        </div>

        <button type="button" onClick={handleSave} disabled={saving} className="!inline-flex !items-center !justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white disabled:opacity-60">
          <Save size={18} /> {saving ? "Saving..." : "Save Store"}
        </button>
      </div>
    </div>
  );
}
