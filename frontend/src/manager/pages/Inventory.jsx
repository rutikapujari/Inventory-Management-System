import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaBell,
  FaBoxes,
  FaCheckCircle,
  FaEdit,
  FaExclamationTriangle,
  FaPlus,
  FaSearch,
  FaTrash,
  FaWarehouse,
} from "react-icons/fa";
import { getProducts } from "../services/productService";
import {
  createStock,
  deleteStock,
  getStocks,
  updateStock,
} from "../services/stockService";
import profileImage from "../../assets/rutika-profile.jpeg";

const emptyForm = {
  productId: "",
  qty: "",
  reason: "",
};

const fallbackImage =
  "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=240&q=80";

const getApiErrorMessage = (error, fallback) => {
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message || fallback;

  return status ? `${message} (HTTP ${status})` : message;
};

const normalizeProducts = (response) => {
  if (Array.isArray(response?.products)) return response.products;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response)) return response;
  return [];
};

const getStockId = (stock) => stock?._id || stock?.id;

const getProduct = (stock) =>
  typeof stock.productId === "object" && stock.productId ? stock.productId : {};

const getStatus = (qty) => {
  const value = Number(qty || 0);

  if (value <= 0) return "Out of Stock";
  if (value <= 10) return "Low Stock";
  return "Available";
};

const Inventory = () => {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");
      const [stockRows, productResponse] = await Promise.all([
        getStocks(),
        getProducts(),
      ]);

      setStocks(stockRows);
      setProducts(normalizeProducts(productResponse));
    } catch (err) {
      setError(getApiErrorMessage(err, "Inventory load failed"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const rows = useMemo(
    () =>
      stocks.map((stock, index) => {
        const product = getProduct(stock);
        const qty = Number(stock.qty || 0);

        return {
          ...stock,
          displayId: `#INV${String(index + 1).padStart(3, "0")}`,
          product,
          productName: product.name || "Unknown product",
          category: product.category || "-",
          image: product.image || fallbackImage,
          qty,
          status: getStatus(qty),
        };
      }),
    [stocks],
  );

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return rows;

    return rows.filter((item) =>
      [item.productName, item.category, item.reason, item.displayId]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [rows, search]);

  const stats = useMemo(
    () => ({
      total: rows.length,
      totalQty: rows.reduce((total, item) => total + item.qty, 0),
      lowStock: rows.filter((item) => item.status === "Low Stock").length,
      available: rows.filter((item) => item.status === "Available").length,
    }),
    [rows],
  );

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.productId || !formData.qty || !formData.reason.trim()) {
      setError("Product, quantity and reason are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        productId: formData.productId,
        qty: Number(formData.qty),
        reason: formData.reason.trim(),
      };

      if (editingId) {
        await updateStock(editingId, payload);
        setMessage("Inventory updated successfully");
      } else {
        await createStock(payload);
        setMessage("Inventory added successfully");
      }

      resetForm();
      await loadInventory();
    } catch (err) {
      setError(getApiErrorMessage(err, "Inventory save failed"));
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (stock) => {
    const stockId = getStockId(stock);
    const product = getProduct(stock);

    if (!stockId) {
      setError("Stock id is missing. This row cannot be edited.");
      return;
    }

    setEditingId(stockId);
    setFormData({
      productId: product._id || product.id || stock.productId || "",
      qty: stock.qty || "",
      reason: stock.reason || "",
    });
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (stock) => {
    const stockId = getStockId(stock);

    if (!stockId) {
      setError("Stock id is missing. This row cannot be deleted.");
      return;
    }

    if (!window.confirm("Delete this inventory entry?")) return;

    try {
      setDeletingId(stockId);
      setError("");
      setMessage("");
      await deleteStock(stockId);
      setStocks((current) => current.filter((item) => getStockId(item) !== stockId));
      if (editingId === stockId) resetForm();
      setMessage("Inventory deleted successfully");
    } catch (err) {
      setError(getApiErrorMessage(err, "Inventory delete failed"));
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="manager-inventory-page flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="manager-inventory-main ml-[280px] min-w-0 flex-1">
        <div className="bg-white px-10 py-6 flex justify-between items-center border-b">
          <div className="relative w-[420px]">
            <FaSearch className="absolute top-5 left-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-[#f5f7fb] rounded-2xl pl-14 pr-5 py-4 outline-none border border-gray-200 text-lg"
            />
          </div>

          <div className="flex items-center gap-8">
            <FaBell className="text-3xl text-gray-600" />
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

        <div className="manager-inventory-content mx-auto w-full max-w-[1180px] p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-6xl font-bold text-[#061539]">Inventory</h1>
              <p className="text-gray-500 text-xl mt-3">
                Track stock levels and manage warehouse inventory.
              </p>
            </div>
          </div>

          {message && (
            <div className="mb-6 rounded-2xl bg-green-100 px-5 py-3 font-semibold text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-2xl bg-red-100 px-5 py-3 font-semibold text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 grid grid-cols-4 gap-4 mb-8 shadow-sm"
          >
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id || product.id} value={product._id || product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              name="qty"
              placeholder="Quantity"
              value={formData.qty}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <input
              type="text"
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              className="bg-[#f5f7fb] rounded-2xl px-5 py-4 outline-none border border-gray-200"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold disabled:opacity-60"
              >
                <FaPlus />
                {saving ? "Saving..." : editingId ? "Update" : "Add"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-4 rounded-2xl border border-gray-200 text-gray-600 font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="grid grid-cols-4 gap-8 mb-10">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-xl">Stock Entries</p>
              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-5xl font-bold">{stats.total}</h2>
                <FaBoxes className="text-5xl text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-xl">Total Quantity</p>
              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-5xl font-bold">{stats.totalQty}</h2>
                <FaWarehouse className="text-5xl text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-xl">Low Stock</p>
              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-5xl font-bold">{stats.lowStock}</h2>
                <FaExclamationTriangle className="text-5xl text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-xl">Available</p>
              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-5xl font-bold">{stats.available}</h2>
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="manager-inventory-table-wrap bg-white rounded-3xl shadow-sm">
            <table className="manager-inventory-table w-full">
              <thead className="bg-[#f8f9fc] text-gray-500 text-lg">
                <tr>
                  <th className="p-6 text-left">PRODUCT</th>
                  <th className="p-6 text-left">CATEGORY</th>
                  <th className="p-6 text-left">QUANTITY</th>
                  <th className="p-6 text-left">REASON</th>
                  <th className="p-6 text-left">STATUS</th>
                  <th className="p-6 text-left">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="6">
                      Inventory loading...
                    </td>
                  </tr>
                )}

                {!loading &&
                  filteredRows.map((item) => (
                    <tr
                      key={getStockId(item)}
                      className="border-t hover:bg-[#f8f9fc] transition-all duration-300"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-5">
                          <img
                            src={item.image}
                            alt={item.productName}
                            onError={(event) => {
                              event.currentTarget.src = fallbackImage;
                            }}
                            className="w-20 h-20 rounded-2xl object-cover bg-slate-100"
                          />
                          <div>
                            <h3 className="font-bold text-2xl text-[#061539]">
                              {item.productName}
                            </h3>
                            <p className="text-gray-500 mt-2">{item.displayId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="bg-purple-100 text-purple-700 px-5 py-3 rounded-xl text-lg">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-6 text-2xl font-bold">{item.qty}</td>
                      <td className="p-6 text-xl">{item.reason}</td>
                      <td className="p-6">
                        <span
                          className={`px-5 py-3 rounded-xl text-lg font-medium ${
                            item.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Low Stock"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="w-14 h-14 rounded-xl border flex items-center justify-center text-blue-600 hover:bg-blue-50"
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            disabled={deletingId === getStockId(item)}
                            className="w-14 h-14 rounded-xl border flex items-center justify-center text-red-500 hover:bg-red-50 disabled:opacity-60"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                {!loading && filteredRows.length === 0 && (
                  <tr>
                    <td className="p-8 text-center text-gray-500" colSpan="6">
                      Inventory data is not available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center p-8 border-t">
              <p className="text-gray-500 text-lg">
                Showing {filteredRows.length} of {rows.length} inventory items
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
