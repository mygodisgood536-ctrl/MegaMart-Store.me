"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/store/cart";
import { useState } from "react";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100/80 transition-shadow duration-300"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.promo && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                {product.promo}
              </span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-600 text-white shadow-md">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        <div className="p-3.5 sm:p-4">
          <p className="text-[11px] text-emerald-600 font-semibold mb-0.5 uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.4rem]">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-1.5 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-medium text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          <div className="mt-2.5 flex items-end justify-between gap-2">
            <div>
              <p className="font-bold text-base sm:text-lg text-gray-900 leading-none">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-[11px] text-gray-400 line-through mt-0.5">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={handleAdd}
        className={`absolute bottom-3.5 right-3.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          added
            ? "bg-emerald-500 text-white scale-110"
            : "bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-100"
        }`}
        aria-label="Add to cart"
      >
        <ShoppingCart size={16} />
      </button>
    </motion.div>
  );
}
