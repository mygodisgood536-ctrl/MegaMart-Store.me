"use client";

import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import Link from "next/link";
import TopSearch from "@/components/TopSearch";
import { ChevronRight } from "lucide-react";

const products = productsData as Product[];

const categoryMeta: Record<string, { emoji: string; color: string }> = {
  Electronics: { emoji: "📱", color: "bg-blue-50" },
  Fashion: { emoji: "👕", color: "bg-pink-50" },
  Jewelry: { emoji: "💎", color: "bg-purple-50" },
  Accessories: { emoji: "⌚", color: "bg-amber-50" },
  Home: { emoji: "🏠", color: "bg-emerald-50" },
};

export default function CategoriesPage() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <TopSearch />

      <div className="px-4 pt-4 pb-8">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Categories</h1>

        <div className="space-y-2">
          {categories.map((cat) => {
            const meta = categoryMeta[cat] || { emoji: "🛍️", color: "bg-gray-50" };
            return (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-full ${meta.color} flex items-center justify-center text-xl flex-shrink-0`}
                >
                  {meta.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{cat}</p>
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
