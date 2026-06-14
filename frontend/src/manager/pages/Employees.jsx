import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import profileImage from "../../assets/rutika-profile.jpeg";
import snehaPatilImage from "../../assets/sneha-patil.jpeg";

import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../services/employeeService";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaBell,
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
} from "react-icons/fa";

const emptyForm = {
  name: "",
  email: "",
  role: "Manager",
  password: "",
};

const roleLabel = {
  admin: "Admin",
  cashier: "Cashier",
  "inventory-manager": "Inventory",
};

const salaryByRole = {
  admin: "Rs. 65,000",
  cashier: "Rs. 35,000",
  "inventory-manager": "Rs. 45,000",
};

const atulUdareImage = "/atul-udare.jpg";

const atulUdareEmployee = {
  _id: "atul-udare-local",
  name: "Shagun Mishra",
  email: "shagun.mishra@gmail.com",
  role: "inventory-manager",
  status: "active",
  image: atulUdareImage,
};

const getEmployeeImage = (employee) => {
  const customImage = employee.image || employee.avatar || employee.photo;

  if (customImage) {
    return customImage;
  }

  const employeeName = employee.name?.toLowerCase() || "";
  const employeeEmail = employee.email?.toLowerCase() || "";

  if (
    employeeName.includes("atul udare") ||
    employeeName.includes("atul udhare") ||
    employeeEmail.includes("atul.udare") ||
    employeeEmail.includes("atul.udhare") ||
    employeeEmail.includes("atul")
  ) {
    return atulUdareImage;
  }

  if (employeeEmail.includes("siddhi")) {
    return snehaPatilImage;
  }

  if (employeeEmail.includes("rpujari")) {
    return profileImage;
  }

  return `https://i.pravatar.cc/150?u=${employee._id || employee.email}`;
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [localAtulEmployee, setLocalAtulEmployee] = useState(atulUdareEmployee);
  const [isAtulDeleted, setIsAtulDeleted] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getEmployees();
      setEmployees(Array.isArray(response.users) ? response.users : []);
    } catch (err) {
      setError(err.response?.data?.message || "Employees load failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const employeeRows = useMemo(
    () => {
      const hasAtulEmployee = employees.some((employee) => {
        const employeeName = employee.name?.toLowerCase() || "";
        const employeeEmail = employee.email?.toLowerCase() || "";

        return (
          employeeName.includes("atul udare") ||
          employeeName.includes("atul udhare") ||
          employeeEmail.includes("atul.udare") ||
          employeeEmail.includes("atul.udhare")
        );
      });

      const rows =
        hasAtulEmployee || isAtulDeleted
          ? employees
          : [...employees, localAtulEmployee];

      return rows.map((employee, index) => {
        const status = employee.status || "active";

        return {
          ...employee,
          displayId: `#EMP${String(index + 1).padStart(3, "0")}`,
          department: roleLabel[employee.role] || employee.role || "Staff",
          salary: salaryByRole[employee.role] || "Rs. 35,000",
          statusLabel: status === "inactive" ? "Inactive" : "Active",
          image: getEmployeeImage(employee),
        };
      });
    },
    [employees, isAtulDeleted, localAtulEmployee],
  );

  const filteredEmployees = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return employeeRows.filter((employee) => {
      const matchesSearch =
        !query ||
        [employee.name, employee.email, employee.role].some((value) =>
          String(value || "").toLowerCase().includes(query),
        );
      const matchesRole = roleFilter === "all" || employee.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (employee.status || "active") === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employeeRows, roleFilter, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const active = employeeRows.filter(
      (employee) => (employee.status || "active") === "active",
    ).length;
    const inactive = employeeRows.filter(
      (employee) => employee.status === "inactive",
    ).length;

    return {
      total: employeeRows.length,
      active,
      onLeave: 0,
      inactive,
    };
  }, [employeeRows]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId("");
  };

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required");
      return;
    }

    if (!editingId && !formData.password.trim()) {
      setError("Password is required for new employee");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setMessage("");

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
      };

      if (formData.password.trim()) {
        payload.password = formData.password;
      }

      if (editingId === localAtulEmployee._id) {
        setLocalAtulEmployee((current) => ({
          ...current,
          ...payload,
        }));
        setMessage("Atul Udare updated successfully");
        resetForm();
        return;
      }

      if (editingId) {
        await updateEmployee(editingId, payload);
        setMessage("Employee updated successfully");
      } else {
        await createEmployee(payload);
        setMessage("Employee added successfully");
      }

      resetForm();
      await loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Employee save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee._id);
    setFormData({
      name: employee.name || "",
      email: employee.email || "",
      role: employee.role || "cashier",
      password: "",
    });
    setMessage("");
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    if (id === localAtulEmployee._id) {
      setIsAtulDeleted(true);
      if (editingId === id) {
        resetForm();
      }
      setError("");
      setMessage("Atul Udare deleted successfully");
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setMessage("");
      await deleteEmployee(id);
      setEmployees((current) =>
        current.filter((employee) => employee._id !== id),
      );
      if (editingId === id) {
        resetForm();
      }
      setMessage("Employee deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Employee delete failed");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="ml-[280px] min-w-0 flex-1">
        <div className="bg-white px-10 py-6 flex justify-between items-center border-b">
          <div className="relative w-[420px]">
            <FaSearch className="absolute top-5 left-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <FaBell className="text-3xl text-gray-600" />

              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                5
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={profileImage}
                alt="Rutika Pujari"
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-xl">Rutika Pujari</h3>
                <p className="text-gray-500">Manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1180px] p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-6xl font-bold text-[#061539]">Employees</h1>

              <p className="text-gray-500 text-xl mt-3">
                Manage all employees and staff details.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 grid grid-cols-[1fr_1fr_220px_1fr_auto_auto] gap-4 mb-8 shadow-sm"
          >
            <input
              type="text"
              name="name"
              placeholder="Employee name"
              value={formData.name}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            >
              <option value="cashier">Cashier</option>
              <option value="inventory-manager">Inventory Manager</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="password"
              name="password"
              placeholder={editingId ? "New password optional" : "Password"}
              value={formData.password}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <button
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-7 py-4 rounded-2xl flex items-center gap-3 font-semibold shadow-xl disabled:opacity-60"
            >
              <FaPlus />
              {isSaving ? "Saving..." : editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-7 py-4 rounded-2xl font-semibold"
              >
                Cancel
              </button>
            )}
          </form>

          {message && (
            <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl mb-6 font-semibold">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl mb-6 font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-4 gap-8 mb-10">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-xl">Total Employees</p>
                  <h1 className="text-5xl font-bold mt-4">{stats.total}</h1>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">
                  <FaUsers />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-xl">Active</p>
                  <h1 className="text-5xl font-bold mt-4">{stats.active}</h1>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-4xl">
                  <FaUserCheck />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-xl">On Leave</p>
                  <h1 className="text-5xl font-bold mt-4">{stats.onLeave}</h1>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-4xl">
                  <FaUserClock />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-xl">Inactive</p>
                  <h1 className="text-5xl font-bold mt-4">{stats.inactive}</h1>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 text-4xl">
                  <FaUserTimes />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 flex items-center gap-5 mb-8 shadow-sm">
            <div className="relative flex-1">
              <FaSearch className="absolute top-5 left-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="px-6 py-4 rounded-2xl border border-gray-200 bg-[#f5f7fb] text-lg"
            >
              <option value="all">All Departments</option>
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
              <option value="inventory-manager">Inventory</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="px-6 py-4 rounded-2xl border border-gray-200 bg-[#f5f7fb] text-lg"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="bg-white rounded-3xl overflow-x-auto shadow-sm">
            <table className="min-w-[980px] w-full">
              <thead className="bg-[#f8f9fc] text-gray-500 text-lg">
                <tr>
                  <th className="p-6 text-left">EMPLOYEE</th>
                  <th className="p-6 text-left">EMAIL</th>
                  <th className="p-6 text-left">DEPARTMENT</th>
                  <th className="p-6 text-left">SALARY</th>
                  <th className="p-6 text-left">STATUS</th>
                  <th className="p-6 text-left">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="6">
                      Employees loading...
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredEmployees.map((employee) => (
                    <tr
                      key={employee._id}
                      className="border-t hover:bg-[#f8f9fc] transition-all duration-300"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-5">
                          <img
                            src={employee.image}
                            alt={employee.name}
                            onError={(event) => {
                              event.currentTarget.src = `https://i.pravatar.cc/150?u=${
                                employee._id || employee.email || employee.name
                              }`;
                            }}
                            className="w-20 h-20 rounded-2xl object-cover"
                          />

                          <div>
                            <h3 className="font-bold text-2xl text-[#061539]">
                              {employee.name}
                            </h3>

                            <p className="text-gray-500 mt-2">
                              {employee.displayId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-6 text-lg">{employee.email}</td>

                      <td className="p-6">
                        <span className="bg-purple-100 text-purple-700 px-5 py-3 rounded-xl text-lg">
                          {employee.department}
                        </span>
                      </td>

                      <td className="p-6 text-2xl font-semibold">
                        {employee.salary}
                      </td>

                      <td className="p-6">
                        <span
                          className={`px-5 py-3 rounded-xl text-lg font-medium ${
                            employee.statusLabel === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {employee.statusLabel}
                        </span>
                      </td>

                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleEdit(employee)}
                            className="w-14 h-14 rounded-xl border flex items-center justify-center text-blue-600 hover:bg-blue-50 disabled:opacity-60"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(employee._id)}
                            disabled={deletingId === employee._id}
                            className="w-14 h-14 rounded-xl border flex items-center justify-center text-red-500 hover:bg-red-50 disabled:opacity-60"
                          >
                            <FaTrash />
                          </button>

                          <button className="w-14 h-14 rounded-xl border flex items-center justify-center text-gray-500 hover:bg-gray-50">
                            <FaEllipsisV />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                {!isLoading && filteredEmployees.length === 0 && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="6">
                      Employee data available nahi aahe
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center p-8 border-t">
              <p className="text-gray-500 text-lg">
                Showing {filteredEmployees.length} of {employeeRows.length} employees
              </p>

              <div className="flex items-center gap-4">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-14 h-14 rounded-xl text-lg font-semibold ${
                      page === 1 ? "bg-blue-600 text-white" : "border"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
