"use client";

import { useParams } from "next/navigation";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 mb-6"
      >
        <ArrowLeft size={16} /> Back to store
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        {displayName}
      </h1>
      <p className="text-gray-500 mb-8">
        {matched.length} product{matched.length !== 1 ? "s" : ""} available
      </p>

      {matched.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {matched.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
