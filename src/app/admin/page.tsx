"use client";

import { useState, useEffect } from "react";
import productsData from "@/data/products.json";
import storeConfig from "@/data/store.json";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  LogOut,
  Package,
  Save,
  Eye,
  Copy,
} from "lucide-react";

const STATIC_PRODUCTS = productsData as Product[];
const ADMIN_KEY = "megamart-admin-products";
const AUTH_KEY = "megamart-admin-auth";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    images: "",
    category: "Electronics",
    promo: "",
    featured: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem(AUTH_KEY);
      if (auth === "true") setAuthenticated(true);

      const stored = localStorage.getItem(ADMIN_KEY);
      if (stored) {
        try {
          setProducts(JSON.parse(stored));
        } catch {
          setProducts(STATIC_PRODUCTS);
        }
      } else {
        setProducts(STATIC_PRODUCTS);
      }
    }
  }, []);

  const saveProducts = (list: Product[]) => {
    setProducts(list);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(list));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === storeConfig.adminPassword) {
      setAuthenticated(true);
      localStorage.setItem(AUTH_KEY, "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      images: "",
      category: "Electronics",
      promo: "",
      featured: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (p: Product) => {
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : "",
      images: p.images.join("\n"),
      category: p.category,
      promo: p.promo || "",
      featured: p.featured,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imageList = form.images
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!form.name || !form.price || imageList.length === 0) {
      alert("Name, price and at least one image URL are required.");
      return;
    }

    const product: Product = {
      id: editingId || `prod-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      images: imageList,
      category: form.category,
      promo: form.promo.trim() || null,
      inStock: true,
      featured: form.featured,
      rating: 4.5,
      reviews: 0,
    };

    if (editingId) {
      saveProducts(products.map((p) => (p.id === editingId ? product : p)));
    } else {
      saveProducts([product, ...products]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      saveProducts(products.filter((p) => p.id !== id));
    }
  };

  const copyShareLink = (id: string) => {
    const url = `${window.location.origin}/product/${id}`;
    navigator.clipboard.writeText(url);
    alert("Product link copied! You can paste it in WhatsApp status, groups or DMs.");
  };

  if (!authenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <Package className="text-emerald-600" size={24} />
          </div>
          <h1 className="text-xl font-bold text-center text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-500 text-center mt-1 mb-6">
            Enter the store password to manage products
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Enter Dashboard
          </button>
          <p className="mt-4 text-xs text-center text-gray-400">
            Default password: megamart2024
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Admin</h1>
          <p className="text-sm text-gray-500">
            Manage products • Changes save in this browser for now
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50"
          >
            <Eye size={16} /> View Store
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100 text-sm text-amber-900">
        <strong>Note:</strong> Products are currently stored in this browser (localStorage).
        When you later connect a database, you can migrate these easily. For images, paste
        direct image URLs (Unsplash, Google Drive public links, or your own hosting).
      </div>

      <button
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
      >
        <Plus size={18} /> Add New Product
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4"
        >
          <h2 className="font-bold text-lg text-gray-900">
            {editingId ? "Edit Product" : "New Product"}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Product Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {["Electronics", "Fashion", "Jewelry", "Accessories", "Home"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Price (₦) *</label>
              <input
                required
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Original Price (₦)</label>
              <input
                type="number"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                placeholder="For discount display"
                className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Promo Label</label>
              <input
                value={form.promo}
                onChange={(e) => setForm({ ...form, promo: e.target.value })}
                placeholder="e.g. Black Friday, Flash Sale"
                className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Image URLs * (one per line)
            </label>
            <textarea
              required
              value={form.images}
              onChange={(e) => setForm({ ...form, images: e.target.value })}
              rows={3}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            Show in Featured section
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
            >
              <Save size={16} /> {editingId ? "Update Product" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 rounded-xl border border-gray-200 font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Product list */}
      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 items-center"
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
              <Image src={p.images[0]} alt="" fill className="object-cover" sizes="64px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{p.name}</p>
              <p className="text-sm text-gray-500">
                {p.category} • {formatPrice(p.price)}
                {p.promo && (
                  <span className="ml-2 text-amber-600 font-medium">{p.promo}</span>
                )}
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => copyShareLink(p.id)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                title="Copy share link"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-2 rounded-lg hover:bg-red-50 text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
