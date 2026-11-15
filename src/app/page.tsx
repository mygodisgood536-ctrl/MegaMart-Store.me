"use client";

import { useMemo } from "react";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import TopSearch from "@/components/TopSearch";
import Link from "next/link";
import { Zap, Gift, ChevronRight } from "lucide-react";

const products = productsData as Product[];

const categoryMeta: Record<string, { emoji: string; bg: string }> = {
  Electronics: { emoji: "📱", bg: "bg-sky-50" },
  Fashion: { emoji: "👕", bg: "bg-rose-50" },
  Jewelry: { emoji: "💎", bg: "bg-violet-50" },
  Accessories: { emoji: "⌚", bg: "bg-amber-50" },
  Home: { emoji: "🏠", bg: "bg-emerald-50" },
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
    <div className="bg-white min-h-screen w-full">
      <TopSearch />

      <div className="flex items-center justify-center gap-3 px-3 py-1.5 bg-orange-50/80 text-[11px] text-orange-800 font-medium">
        <span>Quality products</span>
        <span className="text-orange-200">•</span>
        <span>Order via WhatsApp</span>
      </div>

      <div className="px-3 pt-3">
        <div className="relative overflow-hidden rounded-2xl bg-gray-950 text-white p-4">
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-orange-500/25 blur-2xl" />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <span className="inline-block px-2 py-0.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider rounded bg-orange-500">
                Hot Deals
              </span>
              <h2 className="text-lg font-bold leading-tight">Up to 40% OFF</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">Limited time only</p>
            </div>
            <Link
              href="#deals"
              className="flex-shrink-0 px-3.5 py-2 rounded-full bg-orange-500 text-white text-xs font-bold active:scale-95 transition-transform"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories — horizontal scroll */}
      <section className="pt-5">
        <div className="flex items-center justify-between px-3 mb-2.5">
          <h2 className="text-[15px] font-bold text-gray-900">Categories</h2>
          <Link
            href="/categories"
            className="text-[12px] text-gray-400 flex items-center gap-0.5"
          >
            All <ChevronRight size={13} />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-3 pb-1">
          {categories.map((cat) => {
            const meta = categoryMeta[cat] || { emoji: "🛍️", bg: "bg-gray-50" };
            return (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 w-[68px]"
              >
                <div
                  className={`w-[58px] h-[58px] rounded-full ${meta.bg} flex items-center justify-center text-[26px] border border-black/[0.04]`}
                >
                  {meta.emoji}
                </div>
                <span className="text-[11px] text-gray-700 text-center leading-tight font-medium w-full truncate">
                  {cat}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {deals.length > 0 && (
        <section id="deals" className="pt-6 px-3">
          <div className="flex items-center gap-1.5 mb-3">
            <Zap size={15} className="text-orange-500 fill-orange-500" />
            <h2 className="text-[15px] font-bold text-gray-900">Lightning Deals</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {deals.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="pt-6 px-3">
          <div className="flex items-center gap-1.5 mb-3">
            <Gift size={15} className="text-orange-500" />
            <h2 className="text-[15px] font-bold text-gray-900">Featured</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="pt-6 px-3 pb-6">
        <h2 className="text-[15px] font-bold text-gray-900 mb-3">All Products</h2>
        <div className="grid grid-cols-2 gap-2">
          {sorted.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
