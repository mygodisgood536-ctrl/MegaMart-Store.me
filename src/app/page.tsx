"use client";

import { useMemo } from "react";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import TopSearch from "@/components/TopSearch";
import Link from "next/link";
import { ChevronRight, Zap, Gift } from "lucide-react";

const products = productsData as Product[];

const categoryMeta: Record<string, { emoji: string; color: string }> = {
  Electronics: { emoji: "📱", color: "bg-blue-50" },
  Fashion: { emoji: "👕", color: "bg-pink-50" },
  Jewelry: { emoji: "💎", color: "bg-purple-50" },
  Accessories: { emoji: "⌚", color: "bg-amber-50" },
  Home: { emoji: "🏠", color: "bg-emerald-50" },
};

export default function HomePage() {
  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    []
  );

  const deals = sorted.filter(
    (p) => p.promo || (p.originalPrice && p.originalPrice > p.price)
  );
  const featured = sorted.filter((p) => p.featured);

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <TopSearch />

      <div className="flex items-center justify-center gap-4 px-3 py-2 bg-orange-50 text-[11px] text-orange-800 font-medium">
        <span>✓ Quality products</span>
        <span className="text-orange-300">|</span>
        <span>✓ Order via WhatsApp</span>
      </div>

      <div className="px-3 pt-3">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-500 text-[10px] font-bold uppercase tracking-wide mb-1.5">
                Hot Deals
              </div>
              <h2 className="text-xl font-black leading-tight">Up to 40% OFF</h2>
              <p className="text-xs text-gray-300 mt-0.5">Limited time offers</p>
            </div>
            <Link
              href="#deals"
              className="flex-shrink-0 px-4 py-2 rounded-full bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <section className="px-3 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-bold text-gray-900">Shop by Category</h2>
          <Link
            href="/categories"
            className="text-xs text-gray-500 flex items-center gap-0.5"
          >
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 8).map((cat) => {
            const meta = categoryMeta[cat] || { emoji: "🛍️", color: "bg-gray-50" };
            return (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`w-14 h-14 rounded-full ${meta.color} flex items-center justify-center text-2xl shadow-sm border border-gray-100`}
                >
                  {meta.emoji}
                </div>
                <span className="text-[11px] text-gray-700 text-center leading-tight font-medium">
                  {cat}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {deals.length > 0 && (
        <section id="deals" className="px-3 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-orange-500 fill-orange-500" />
            <h2 className="text-[15px] font-bold text-gray-900">Lightning Deals</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {deals.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="px-3 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Gift size={16} className="text-orange-500" />
            <h2 className="text-[15px] font-bold text-gray-900">Featured</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="px-3 pt-6 pb-8">
        <h2 className="text-[15px] font-bold text-gray-900 mb-3">All Products</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {sorted.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
