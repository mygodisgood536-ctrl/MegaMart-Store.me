"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import TopSearch from "@/components/TopSearch";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const products = productsData as Product[];

function SearchResults() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.promo && p.promo.toLowerCase().includes(q))
    );
  }, [q]);

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <TopSearch />

      <div className="px-3 pt-3 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 mb-3"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        <h1 className="text-lg font-bold text-gray-900 mb-1">
          {q ? `Results for “${q}”` : "Search"}
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          {results.length} product{results.length !== 1 ? "s" : ""} found
        </p>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No products matched your search.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-orange-600 font-medium text-sm"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto p-8 text-center text-gray-500">
          Searching...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
