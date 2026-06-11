import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaMailBulk, FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import { ENDPOINTS } from "../api/config";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(ENDPOINTS.ADMIN_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const authUser = data.admin || data.user || {};
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(authUser));

      setSuccess(true);
      setMessage("Login successful. Redirecting to admin dashboard...");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 800);
    } catch (err) {
      setSuccess(false);
      setMessage(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-page min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="admin-auth-card w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl sm:grid sm:grid-cols-[1.1fr_0.9fr]">
        <div className="admin-auth-visual hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-10 text-white sm:block">
          <div className="relative h-full">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_35%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 shadow-lg">
                  <FaUserShield size={28} />
                </div>
                <h2 className="mt-10 text-4xl font-semibold">Admin Login</h2>
                <p className="mt-4 max-w-sm text-base leading-7 text-white/85">
                  Welcome back! Use your admin credentials to access the dashboard, manage users, and review reports.
                </p>
              </div>
              <div className="space-y-4 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">Admin Dashboard</p>
                <p className="text-sm text-white/90">Fast, secure, and beautiful management access.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-auth-form-panel px-8 py-10 sm:px-12">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to admin</h1>
            <p className="mt-2 text-sm text-slate-500">Securely access the admin panel and manage the system.</p>
          </div>

          {message && (
            <div className={`mb-6 rounded-3xl px-4 py-3 text-sm font-medium ${success ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-500">
                <FaMailBulk className="text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-500">
                <FaLock className="text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-900"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>
              New admin? <Link to="/admin/register" className="font-semibold text-slate-900 hover:text-cyan-600">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
