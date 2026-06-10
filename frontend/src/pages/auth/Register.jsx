import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { FaUser, FaMailBulk, FaPhone, FaLock } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);
      console.log(data);

      setMessage("Registration successful");
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
      });

      setTimeout(() => navigate("/login"), 700);
    } catch (error) {
      console.error(error);
      const validationMessage = error.response?.data?.errors?.[0]?.msg;
      setMessage(
        validationMessage ||
          error.response?.data?.message ||
          "Registration failed",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 px-4 py-8">
      <div
        className="w-full max-w-[520px] bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6"
        style={{ width: "min(100%, 520px)" }}
      >
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-lg">
            <FaUser className="text-pink-600" size={30} />
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-gray-200 mt-1 text-sm">Register to get started</p>
        </div>

        {message && (
          <div className="bg-white text-center text-pink-600 font-semibold p-2 rounded-lg mb-4 shadow-md text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-1 text-sm">Full Name</label>
            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-md">
              <span className="px-3 text-gray-500">
                <FaUser size={18} />
              </span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 outline-none text-gray-700 text-sm"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1 text-sm">Email</label>
            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-md">
              <span className="px-3 text-gray-500">
                <FaMailBulk size={18} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 outline-none text-gray-700 text-sm"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1 text-sm">Phone</label>
            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-md">
              <span className="px-3 text-gray-500">
                <FaPhone size={18} />
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 outline-none text-gray-700 text-sm"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1 text-sm">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded-xl shadow-md outline-none text-gray-700 text-sm"
              required
            >
              <option value="">Select Role</option>
              <option value="inventory-manager">Manager</option>
              <option value="cashier">Cashier</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-white mb-1 text-sm">Password</label>
            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-md">
              <span className="px-3 text-gray-500">
                <FaLock size={18} />
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 outline-none text-gray-700 text-sm"
                minLength={6}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-pink-700 font-bold py-2 rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300 text-sm"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-200 text-sm">Already have an account?</p>
          <Link
            to="/login"
            className="mt-1 inline-block text-white font-bold hover:text-indigo-200 transition text-sm"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
