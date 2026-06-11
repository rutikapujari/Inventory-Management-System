import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ENDPOINTS } from '../api/config';

export default function AddProductModal({ isOpen, onClose }) {
  const { fetchProducts } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    price: '',
    stock: '',
    reorder: '10'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(ENDPOINTS.PRODUCTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          sku: formData.sku,
          category: formData.category,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          reorderLevel: parseInt(formData.reorder)
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed.');
      }

      await fetchProducts();

      setFormData({
        name: '',
        sku: '',
        category: 'Electronics',
        price: '',
        stock: '',
        reorder: '10'
      });

      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 !flex !items-center !justify-center bg-black/60 p-4">

      <div className="!block w-full max-w-xl overflow-hidden rounded-2xl border bg-white shadow-xl">

        {/* HEADER */}
        <div className="!flex !w-full !items-center !justify-between border-b p-5">
          <h2 className="font-bold text-lg">Add New Product</h2>

          {/* ❌ replaced X icon */}
          <button
            onClick={onClose}
            className="!flex !h-9 !w-9 !items-center !justify-center rounded-full text-2xl font-bold text-gray-500 hover:bg-slate-100 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="!block space-y-4 p-6 text-sm">

          {/* NAME */}
          <div>
            <label className="block font-medium">Product Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg mt-1"
              required
            />
          </div>

          {/* SKU + CATEGORY */}
          <div className="!grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="block font-medium">SKU</label>
              <input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

          </div>

          {/* PRICE / STOCK / REORDER */}
          <div className="!grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div>
              <label className="block font-medium">Price</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Stock</label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Reorder</label>
              <input
                name="reorder"
                type="number"
                value={formData.reorder}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
                required
              />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="!flex !justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
            >
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
