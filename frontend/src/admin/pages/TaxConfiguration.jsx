import React, { useEffect, useState } from "react";
import { Percent, Save } from "lucide-react";
import { getTaxSettings, updateTaxSettings } from "../controllers/taxController";

const defaultTax = {
  taxName: "GST",
  taxPercentage: 18,
  taxNumber: "",
};

export default function TaxConfiguration() {
  const [tax, setTax] = useState(defaultTax);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTax() {
      setLoading(true);
      setError("");

      try {
        const response = await getTaxSettings();
        setTax({ ...defaultTax, ...(response?.data?.taxSettings || {}) });
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load tax settings");
      } finally {
        setLoading(false);
      }
    }

    loadTax();
  }, []);

  const handleChange = (key, value) => {
    setTax((current) => ({ ...current, [key]: value }));
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        taxName: tax.taxName,
        taxPercentage: Number(tax.taxPercentage || 0),
        taxNumber: tax.taxNumber,
      };
      const response = await updateTaxSettings(payload);
      setTax(response?.data?.taxSettings || payload);
      setMessage("Tax configuration saved.");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to save tax settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="!block space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tax Configuration</h1>
        <p className="text-sm text-slate-600 mt-1">Set the tax name, rate, and registration number used by billing.</p>
      </div>

      {message ? <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700">{message}</div> : null}
      {error ? <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">{error}</div> : null}

      <div className="!block space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="!flex !items-center gap-3">
          <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
            <Percent size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Billing Tax</h2>
            <p className="text-sm text-slate-500">{loading ? "Loading current settings..." : "Current invoice tax setup"}</p>
          </div>
        </div>

        <div className="!grid grid-cols-1 gap-5 md:grid-cols-3">
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Tax Name</span>
            <input
              value={tax.taxName}
              onChange={(event) => handleChange("taxName", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Tax Percentage</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={tax.taxPercentage}
              onChange={(event) => handleChange("taxPercentage", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Tax Number</span>
            <input
              value={tax.taxNumber}
              onChange={(event) => handleChange("taxNumber", event.target.value)}
              placeholder="GSTIN / VAT number"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="!inline-flex !items-center !justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-bold text-white disabled:opacity-60"
        >
          <Save size={18} /> {saving ? "Saving..." : "Save Tax"}
        </button>
      </div>
    </div>
  );
}
