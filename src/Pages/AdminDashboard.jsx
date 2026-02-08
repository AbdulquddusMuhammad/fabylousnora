// src/pages/AdminDashboard.jsx   (or any path you like)

import { useState, useEffect } from 'react';
import { 
  getAllProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from '../lib/supabaseClient';   // adjust path if needed

export default function SimpleAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'women',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (editingId) {
        // Update
        await updateProduct(editingId, form, imageFile);
        setMessage('Product updated');
      } else {
        // Add new
        await addProduct(form, imageFile);
        setMessage('Product added');
      }

      // Reset form
      setForm({ name: '', price: '', category: 'women', description: '' });
      setImageFile(null);
      setEditingId(null);

      // Refresh list
      loadProducts();
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
    });
    setEditingId(product.id);
    setImageFile(null); // new image is optional
    window.scrollTo(0, 0); // scroll to top to see form
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      await deleteProduct(id);
      setMessage('Product deleted');
      loadProducts();
    } catch (err) {
      setMessage('Delete failed: ' + err.message);
    }
  };

  const cancelEdit = () => {
    setForm({ name: '', price: '', category: 'women', description: '' });
    setImageFile(null);
    setEditingId(null);
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        {editingId ? 'Edit Product' : 'Add New Product'}
      </h1>

      {/* Message feedback */}
      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('Error') || message.includes('failed') 
          ? 'bg-red-100 text-red-800' 
          : 'bg-green-100 text-green-800'}`}>
          {message}
        </div>
      )}

      {/* Form – always visible */}
      <form onSubmit={handleSubmit} className="mb-12 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Price ($)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kids">Kids</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Product Image {editingId && '(leave empty to keep current)'}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Product List */}
      <h2 className="text-2xl font-bold mb-6">Your Products</h2>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No products yet. Add one above.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div 
              key={p.id} 
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow"
            >
              {p.image_url ? (
                <img 
                  src={p.image_url} 
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
                <p className="text-green-700 font-bold mb-2">
                  ₦{Number(p.price).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {p.description || 'No description'}
                </p>
                <p className="text-xs text-gray-500 mb-3 capitalize">
                  Category: {p.category}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}