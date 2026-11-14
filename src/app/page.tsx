import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight, Sparkles, Truck, MessageCircle, Shield } from "lucide-react";

const products = productsData as Product[];

const categories = Array.from(new Set(products.map((p) => p.category)));

const categoryIcons: Record<string, string> = {
  Electronics: "📱",
  Fashion: "👕",
  Jewelry: "💎",
  Accessories: "⌚",
  Home: "🏠",
};

export default function HomePage() {
  const featured = products.filter((p) => p.featured);
  const flashSales = products.filter((p) => p.promo === "Flash Sale" || p.promo === "Black Friday");
  const allProducts = products;

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
              <Sparkles size={14} className="text-amber-300" />
              <span>New arrivals & flash sales live now</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Shop smarter.
              <br />
              <span className="text-emerald-300">Live better.</span>
            </h1>
            <p className="mt-5 text-lg text-emerald-100/90 max-w-lg">
              Discover quality electronics, fashion, jewelry and more. Add to cart and order instantly via WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#featured"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-emerald-900 font-semibold hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-950/30"
              >
                Shop Featured
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: MessageCircle, label: "Order via WhatsApp" },
            { icon: Truck, label: "Fast Delivery" },
            { icon: Shield, label: "Quality Guaranteed" },
            { icon: Sparkles, label: "Great Prices" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <item.icon size={16} className="text-emerald-600" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat.toLowerCase())}`}
              className="group flex flex-col items-center gap-2 p-5 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {categoryIcons[cat] || "🛍️"}
              </span>
              <span className="text-sm font-semibold text-gray-800">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash / Promo */}
      {flashSales.length > 0 && (
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase">
                Hot Deals
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Flash Sales & Promos</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {flashSales.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="#all" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* All products */}
      <section id="all" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {allProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
