import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaMailBulk, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../services/authService";

const normalizeRole = (role) => {
  const normalized = String(role || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  if (normalized === "administrator" || normalized.includes("admin")) {
    return "admin";
  }

  if (
    normalized === "manager" ||
    normalized === "inventory" ||
    normalized.includes("manager") ||
    normalized.includes("inventory")
  ) {
    return "inventory-manager";
  }

  if (normalized === "user" || normalized === "staff") {
    return "cashier";
  }

  return normalized;
};

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const data = await loginUser(formData);
      const role = normalizeRole(data.user?.role);
      const user = { ...data.user, role };
      const dashboardPath = {
        cashier: "/cashier/dashboard",
        "inventory-manager": "/manager/dashboard",
        admin: "/admin/dashboard",
      }[role];

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      setMessage("Login successful");

      navigate(dashboardPath || "/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4 py-8">
      <div
        className="w-full max-w-[420px] bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6"
        style={{ width: "min(100%, 420px)" }}
      >
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-lg">
            <FaLock className="text-purple-600" size={30} />
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-200 mt-1 text-sm">Login to your account</p>
        </div>

        {message && (
          <div className="bg-white text-center text-purple-600 font-semibold p-2 rounded-lg mb-4 shadow-md text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-1 text-sm">
              Email Address
            </label>
            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-pink-400">
              <span className="px-3 text-gray-500">
                <FaMailBulk size={18} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 outline-none text-gray-700 text-sm"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-white mb-1 text-sm">Password</label>
            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-pink-400">
              <span className="px-3 text-gray-500">
                <FaLock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 outline-none text-gray-700 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-gray-500 hover:text-purple-600 transition"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-5">
            <Link
              to="/forgot-password"
              className="text-xs text-white hover:text-pink-200 transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-bold py-2 rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300 text-sm"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-200 text-sm">Don't have an account?</p>
          <Link
            to="/register"
            className="mt-1 inline-block text-white font-bold hover:text-pink-200 transition text-sm"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
