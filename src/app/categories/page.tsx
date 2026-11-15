"use client";

import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import Link from "next/link";
import TopSearch from "@/components/TopSearch";
import { ChevronRight } from "lucide-react";

const products = productsData as Product[];

const categoryMeta: Record<string, { emoji: string; bg: string }> = {
  Electronics: { emoji: "📱", bg: "bg-sky-50" },
  Fashion: { emoji: "👕", bg: "bg-rose-50" },
  Jewelry: { emoji: "💎", bg: "bg-violet-50" },
  Accessories: { emoji: "⌚", bg: "bg-amber-50" },
  Home: { emoji: "🏠", bg: "bg-emerald-50" },
};

export default function CategoriesPage() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return (
    <div className="bg-white min-h-screen w-full">
      <TopSearch />

      <div className="px-3 pt-4 pb-6">
        <h1 className="text-lg font-bold text-gray-900 mb-3">All Categories</h1>

        <div className="space-y-2">
          {categories.map((cat) => {
            const meta = categoryMeta[cat] || { emoji: "🛍️", bg: "bg-gray-50" };
            return (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 active:bg-gray-50"
              >
                <div
                  className={`w-12 h-12 rounded-full ${meta.bg} flex items-center justify-center text-xl flex-shrink-0`}
                >
                  {meta.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-[15px]">{cat}</p>
                  <p className="text-xs text-gray-500">
                    {counts[cat] || 0} product{(counts[cat] || 0) !== 1 ? "s" : ""}
                  </p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
