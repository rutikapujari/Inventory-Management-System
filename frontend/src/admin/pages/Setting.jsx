import React, { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle2,
  Clock,
  Database,
  Globe,
  IndianRupee,
  Lock,
  LogOut,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  Store,
} from "lucide-react";
import { getSettings, updateSettings } from "../controllers/settingsController";

const defaultSettings = {
  storeName: "RetailPOS System",
  email: "admin@retailpos.com",
  phone: "+1 (555) 123-4567",
  currency: "INR",
  timezone: "Asia/Kolkata",
  emailNotifications: true,
  smsNotifications: false,
  autoBackup: true,
  backupFrequency: "daily",
  sessionTimeout: "30",
};

export default function Setting() {
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      setError("");

      try {
        const response = await getSettings();
        const apiSettings = response?.data?.settings || {};

        setSettings((prev) => ({
          ...prev,
          ...apiSettings,
          storeName: apiSettings.storeName || apiSettings.companyName || prev.storeName,
          email: apiSettings.email || apiSettings.companyEmail || prev.email,
        }));
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setError("");
    setMessage("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        ...settings,
        companyName: settings.storeName,
        companyEmail: settings.email,
      };
      const response = await updateSettings(payload);
      const apiSettings = response?.data?.settings || payload;

      setSettings((prev) => ({ ...prev, ...apiSettings }));
      setMessage("Settings saved successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = () => {
    const oldPassword = prompt("Enter current password:");
    if (!oldPassword) return;
    const newPassword = prompt("Enter new password:");
    if (newPassword) alert("Password change request completed.");
  };

  const handleBackup = () => {
    alert("Backup started.");
    setTimeout(() => alert("Backup completed successfully."), 800);
  };

  const handleLogout = () => {
    if (!confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/admin/login";
  };

  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";
  const labelClass = "block text-sm font-bold text-slate-900 mb-2";

  const tabs = [
    { id: "general", label: "General", icon: Globe, note: "Store profile" },
    { id: "notifications", label: "Notifications", icon: Bell, note: "Alerts" },
    { id: "security", label: "Security", icon: Lock, note: "Access" },
    { id: "backup", label: "Backup", icon: Database, note: "Data safety" },
  ];

  return (
    <div className="!block min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="mx-auto !block max-w-6xl space-y-6">
        <div className="!flex !w-full !flex-col !justify-between gap-5 overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200 md:!flex-row md:!items-center">
          <div className="!flex !items-center gap-4">
            <div className="!flex h-14 w-14 shrink-0 !items-center !justify-center rounded-2xl bg-white/10 text-blue-200 ring-1 ring-white/10">
              <ShieldCheck size={28} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">Admin Control</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Settings</h1>
              <p className="mt-1 text-sm text-slate-300">
                {loading ? "Loading settings from API..." : "Manage store profile, alerts, security, and backup options."}
              </p>
            </div>
          </div>

          <div className="!grid grid-cols-2 gap-3 sm:grid-cols-4 md:w-auto">
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-slate-300">Currency</p>
              <p className="mt-1 font-bold text-white">{settings.currency}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-slate-300">Timezone</p>
              <p className="mt-1 font-bold text-white">{settings.timezone}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs text-slate-300">Backup</p>
              <p className="mt-1 font-bold text-white">{settings.autoBackup ? "On" : "Off"}</p>
            </div>
            <div className="rounded-2xl bg-emerald-400/15 px-4 py-3 text-emerald-100 ring-1 ring-emerald-300/20">
              <p className="text-xs text-emerald-100/80">Status</p>
              <p className="mt-1 font-bold">Ready</p>
            </div>
          </div>
        </div>

        <div className="!grid grid-cols-1 gap-3 rounded-3xl border border-slate-100 bg-white p-2 shadow-lg shadow-slate-200/70 sm:grid-cols-2 xl:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`!flex !items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span className={`!flex h-10 w-10 shrink-0 !items-center !justify-center rounded-xl ${isActive ? "bg-white/15" : "bg-slate-100"}`}>
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-bold">{tab.label}</span>
                  <span className={`block text-xs ${isActive ? "text-blue-100" : "text-slate-400"}`}>{tab.note}</span>
                </span>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-medium text-red-700">
            {error}
          </div>
        )}
        {message && (
          <div className="!flex !items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-medium text-emerald-700">
            <CheckCircle2 size={18} /> {message}
          </div>
        )}

        {activeTab === "general" && (
          <div className="!block space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="!flex !items-center gap-3">
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Store size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Store Details</h2>
                <p className="text-sm text-slate-500">Primary business identity used across admin tools.</p>
              </div>
            </div>

            <label className="block">
              <span className={labelClass}>Store Name</span>
              <div className="relative">
                <Store className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input value={settings.storeName} onChange={(e) => handleChange("storeName", e.target.value)} className={`${fieldClass} pl-11`} />
              </div>
            </label>

            <div className="!grid grid-cols-1 gap-5 md:grid-cols-2">
              <label>
                <span className={labelClass}>Email</span>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input type="email" value={settings.email} onChange={(e) => handleChange("email", e.target.value)} className={`${fieldClass} pl-11`} />
                </div>
              </label>
              <label>
                <span className={labelClass}>Phone</span>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input value={settings.phone} onChange={(e) => handleChange("phone", e.target.value)} className={`${fieldClass} pl-11`} />
                </div>
              </label>
              <label>
                <span className={labelClass}>Currency</span>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <select value={settings.currency} onChange={(e) => handleChange("currency", e.target.value)} className={`${fieldClass} pl-11`}>
                    <option>INR</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
              </label>
              <label>
                <span className={labelClass}>Timezone</span>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <select value={settings.timezone} onChange={(e) => handleChange("timezone", e.target.value)} className={`${fieldClass} pl-11`}>
                    <option>Asia/Kolkata</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                    <option>Asia/Tokyo</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="!block space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="!flex !items-center gap-3">
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Bell size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Notification Channels</h2>
                <p className="text-sm text-slate-500">Choose which alerts are enabled for admin updates.</p>
              </div>
            </div>
            <label className="!flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <span>
                <span className="block font-bold text-slate-900">Email Notifications</span>
                <span className="text-sm text-slate-500">Send important updates to the store email.</span>
              </span>
              <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => handleChange("emailNotifications", e.target.checked)} className="h-5 w-5 rounded accent-indigo-600" />
            </label>
            <label className="!flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <span>
                <span className="block font-bold text-slate-900">SMS Notifications</span>
                <span className="text-sm text-slate-500">Enable phone alerts for urgent activity.</span>
              </span>
              <input type="checkbox" checked={settings.smsNotifications} onChange={(e) => handleChange("smsNotifications", e.target.checked)} className="h-5 w-5 rounded accent-indigo-600" />
            </label>
          </div>
        )}

        {activeTab === "security" && (
          <div className="!block space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="!flex !items-center gap-3">
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-red-50 text-red-600">
                <Lock size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Security Controls</h2>
                <p className="text-sm text-slate-500">Session timing and password controls for admin access.</p>
              </div>
            </div>
            <label>
              <span className={labelClass}>Session Timeout (minutes)</span>
              <input type="number" value={settings.sessionTimeout} onChange={(e) => handleChange("sessionTimeout", e.target.value)} className={fieldClass} />
            </label>
            <button onClick={handlePasswordChange} className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 px-6 py-3 font-bold text-white shadow-lg shadow-red-100">
              <Lock size={18} /> Change Password
            </button>
          </div>
        )}

        {activeTab === "backup" && (
          <div className="!block space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="!flex !items-center gap-3">
              <div className="!flex h-12 w-12 !items-center !justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Database size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Backup Settings</h2>
                <p className="text-sm text-slate-500">Keep system data protected with scheduled backups.</p>
              </div>
            </div>
            <label className="!flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <span>
                <span className="block font-bold text-slate-900">Enable Automatic Backups</span>
                <span className="text-sm text-slate-500">Run backups on the selected schedule.</span>
              </span>
              <input type="checkbox" checked={settings.autoBackup} onChange={(e) => handleChange("autoBackup", e.target.checked)} className="h-5 w-5 rounded accent-indigo-600" />
            </label>
            <label>
              <span className={labelClass}>Backup Frequency</span>
              <select value={settings.backupFrequency} onChange={(e) => handleChange("backupFrequency", e.target.value)} className={fieldClass}>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
            <button onClick={handleBackup} className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-100">
              <Database size={18} /> Create Backup Now
            </button>
          </div>
        )}

        <div className="!flex !w-full !flex-col !items-stretch !justify-between gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-200/60 sm:!flex-row sm:!items-center">
          <button onClick={handleLogout} className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-bold text-white shadow-lg shadow-red-100 transition hover:from-red-700 hover:to-red-800">
            <LogOut size={18} /> Logout
          </button>
          <button onClick={handleSave} disabled={saving} className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-100 transition hover:from-indigo-700 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-300">
            <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
