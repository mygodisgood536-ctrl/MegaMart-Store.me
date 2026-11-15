"use client";

import { useParams } from "next/navigation";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import TopSearch from "@/components/TopSearch";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const products = productsData as Product[];

export default function CategoryPage() {
  const params = useParams();
  const slug = (params.slug as string) || "";
  const categoryName = decodeURIComponent(slug);
  const matched = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  const displayName =
    matched[0]?.category ||
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="bg-white min-h-screen">
      <TopSearch />

      <div className="px-3 pt-3 pb-8">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm text-gray-500 mb-3"
        >
          <ArrowLeft size={16} /> Categories
        </Link>

        <h1 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {matched.length} product{matched.length !== 1 ? "s" : ""}
        </p>

        {matched.length === 0 ? (
          <p className="text-gray-500 py-12 text-center">No products in this category.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {matched.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
