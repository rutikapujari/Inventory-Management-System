import { useEffect, useState } from "react";
import { useCashierTheme } from "../context/CashierThemeContext";

function Settings() {
  const { darkMode, setDarkMode } = useCashierTheme();
  const [profile, setProfile] = useState({
    name: "Cashier User",
    email: "cashier@example.com",
    phone: "+91 98765 43210",
  });
  const [preferences, setPreferences] = useState({
    darkMode,
    notifications: true,
    autoReceipt: true,
  });
  const [password, setPassword] = useState({ current: "", newPassword: "", confirm: "" });
  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePreferenceToggle = (key) => {
    setPreferences((current) => {
      const nextValue = !current[key];

      if (key === "darkMode") {
        setDarkMode(nextValue);
      }

      return { ...current, [key]: nextValue };
    });
  };

  useEffect(() => {
    setPreferences((current) => ({ ...current, darkMode }));
  }, [darkMode]);

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setMessage("Profile changes saved successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChangePassword = () => {
    if (password.newPassword !== password.confirm) {
      setMessage("New password and confirmation do not match.");
      return;
    }
    setMessage("Password updated successfully.");
    setPassword({ current: "", newPassword: "", confirm: "" });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-gray-500 mt-2">
            Manage account information, billing preferences and cashier workflow settings.
          </p>
        </div>
        <div className="inline-flex items-center gap-3">
          <button className="rounded-2xl bg-slate-100 text-slate-700 px-5 py-3 hover:bg-slate-200">
            Logout
          </button>
          <button className="rounded-2xl bg-indigo-600 text-white px-5 py-3 hover:bg-indigo-700">
            Help Center
          </button>
        </div>
      </div>

      {message ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Account Info</h2>
              <p className="text-sm text-slate-500">
                Update your personal profile details used in receipts and cashier records.
              </p>
            </div>
            <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
              Active
            </span>
          </div>

          <div className="space-y-4">
            <label className="block space-y-2 text-sm text-slate-600">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
            <label className="block space-y-2 text-sm text-slate-600">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
            <label className="block space-y-2 text-sm text-slate-600">
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <button
              type="button"
              onClick={handleSaveProfile}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Save Profile
            </button>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Preferences</h2>
            <p className="text-sm text-slate-500">
              Control your cashier dashboard behavior and payment workflow defaults.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Dark mode",
                key: "darkMode",
                description: "Switch the cashier UI to dark theme for lower brightness.",
              },
              {
                label: "Receive notifications",
                key: "notifications",
                description: "Get alerts for new orders, payments and system updates.",
              },
              {
                label: "Auto-print receipt",
                key: "autoReceipt",
                description: "Automatically print receipts after successful payment.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-start justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handlePreferenceToggle(item.key)}
                  aria-pressed={preferences[item.key]}
                  className={`h-11 w-20 rounded-full transition ${
                    preferences[item.key]
                      ? "bg-indigo-600"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`block h-9 w-9 rounded-full bg-white shadow transition-transform ${
                      preferences[item.key] ? "translate-x-9" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Security</h2>
          <p className="text-sm text-slate-500">
            Keep your account secure by updating your password regularly.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Current password</span>
            <input
              type="password"
              name="current"
              value={password.current}
              onChange={handlePasswordChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>New password</span>
            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Confirm password</span>
            <input
              type="password"
              name="confirm"
              value={password.confirm}
              onChange={handlePasswordChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleChangePassword}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Update Password
          </button>
        </div>
      </section>
    </div>
  );
}

export default Settings;
