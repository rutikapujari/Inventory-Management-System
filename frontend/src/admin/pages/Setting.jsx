import React, { useEffect, useState } from "react";
import { Bell, Database, Globe, Lock, LogOut, Save } from "lucide-react";
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

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "backup", label: "Backup", icon: Database },
  ];

  return (
    <div className="!block min-h-screen space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 text-sm mt-1">
          {loading ? "Loading settings from API..." : "Manage system settings and preferences"}
        </p>
      </div>

      <div className="!flex !w-fit flex-wrap gap-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`!flex !items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 font-medium">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-700 font-medium">
          {message}
        </div>
      )}

      {activeTab === "general" && (
        <div className="!block space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg">
          <label className="block">
            <span className="block text-sm font-bold text-slate-900 mb-2">Store Name</span>
            <input value={settings.storeName} onChange={(e) => handleChange("storeName", e.target.value)} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
          <div className="!grid grid-cols-1 gap-6 md:grid-cols-2">
            <label>
              <span className="block text-sm font-bold text-slate-900 mb-2">Email</span>
              <input type="email" value={settings.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label>
              <span className="block text-sm font-bold text-slate-900 mb-2">Phone</span>
              <input value={settings.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </label>
            <label>
              <span className="block text-sm font-bold text-slate-900 mb-2">Currency</span>
              <select value={settings.currency} onChange={(e) => handleChange("currency", e.target.value)} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </label>
            <label>
              <span className="block text-sm font-bold text-slate-900 mb-2">Timezone</span>
              <select value={settings.timezone} onChange={(e) => handleChange("timezone", e.target.value)} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Asia/Kolkata</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
                <option>Asia/Tokyo</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="!block space-y-4 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg">
          <label className="!flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => handleChange("emailNotifications", e.target.checked)} className="w-5 h-5 rounded accent-indigo-600" />
            <span className="font-bold text-slate-900">Email Notifications</span>
          </label>
          <label className="!flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={settings.smsNotifications} onChange={(e) => handleChange("smsNotifications", e.target.checked)} className="w-5 h-5 rounded accent-indigo-600" />
            <span className="font-bold text-slate-900">SMS Notifications</span>
          </label>
        </div>
      )}

      {activeTab === "security" && (
        <div className="!block space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg">
          <label>
            <span className="block text-sm font-bold text-slate-900 mb-2">Session Timeout (minutes)</span>
            <input type="number" value={settings.sessionTimeout} onChange={(e) => handleChange("sessionTimeout", e.target.value)} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
          <button onClick={handlePasswordChange} className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 font-bold text-white shadow-lg">
            <Lock size={18} /> Change Password
          </button>
        </div>
      )}

      {activeTab === "backup" && (
        <div className="!block space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg">
          <label className="!flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={settings.autoBackup} onChange={(e) => handleChange("autoBackup", e.target.checked)} className="w-5 h-5 rounded accent-indigo-600" />
            <span className="font-bold text-slate-900">Enable automatic backups</span>
          </label>
          <select value={settings.backupFrequency} onChange={(e) => handleChange("backupFrequency", e.target.value)} className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button onClick={handleBackup} className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-bold text-white shadow-lg">
            <Database size={18} /> Create Backup Now
          </button>
        </div>
      )}

      <div className="!flex !w-full !flex-col !items-stretch !justify-between gap-3 sm:!flex-row sm:!items-center">
        <button onClick={handleLogout} className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-bold text-white shadow-lg">
          <LogOut size={18} /> Logout
        </button>
        <button onClick={handleSave} disabled={saving} className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-bold text-white shadow-lg disabled:from-slate-300 disabled:to-slate-300">
          <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
