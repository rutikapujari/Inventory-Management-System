import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { createProduct } from "../controllers/productController";

const initialForm = {
  name: "",
  sku: "",
  barcode: "",
  category: "",
  stock: "",
  sellingPrice: "",
  costPrice: "",
  image: "",
};

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await createProduct({
        ...formData,
        stock: Number(formData.stock),
        sellingPrice: Number(formData.sellingPrice),
        costPrice: Number(formData.costPrice),
      });
      navigate("/admin/product");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to add product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="!block min-h-screen space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="!flex !w-full !flex-col !items-start !justify-between gap-4 sm:!flex-row sm:!items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add Product</h1>
          <p className="text-slate-600">Create a new product for inventory and POS.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/product")}
          className="!flex !items-center !justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 font-bold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-medium text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="!block max-w-3xl space-y-5 rounded-3xl border border-slate-100 bg-white p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-900">Product Name</span>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-900">SKU</span>
            <input name="sku" value={formData.sku} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-900">Barcode</span>
            <input name="barcode" value={formData.barcode} onChange={handleChange} placeholder="Scan or enter barcode" className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-900">Category</span>
            <input name="category" value={formData.category} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-900">Image URL</span>
            <input name="image" value={formData.image} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-900">Stock</span>
            <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-900">Selling Price</span>
            <input name="sellingPrice" type="number" min="0" value={formData.sellingPrice} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-slate-900">Cost Price</span>
            <input name="costPrice" type="number" min="0" value={formData.costPrice} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="!flex !items-center !justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-bold text-white shadow-lg hover:from-indigo-700 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-300"
        >
          <Save size={18} /> {saving ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
