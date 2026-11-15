"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart";
import { useState } from "react";
import { motion } from "framer-motion";

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
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: Math.min(index * 0.03, 0.2), duration: 0.35 }}
      className="group relative bg-white"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-lg">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-400"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
          <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
            {product.promo && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-black text-white leading-none">
                {product.promo}
              </span>
            )}
            {discount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-orange-500 text-white leading-none">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        <div className="pt-2 px-0.5">
          <h3 className="text-[13px] text-gray-800 leading-snug line-clamp-2 min-h-[2.4rem]">
            {product.name}
          </h3>
          <div className="mt-1.5 flex items-end justify-between gap-1">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-[15px] font-bold text-orange-600 leading-none">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[11px] text-gray-400 line-through leading-none">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={handleAdd}
        className={`absolute bottom-[52px] right-1.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
          added
            ? "bg-orange-500 text-white scale-110"
            : "bg-white/95 text-gray-700 hover:bg-orange-500 hover:text-white border border-gray-200"
        }`}
        aria-label="Add to cart"
      >
        <ShoppingCart size={14} strokeWidth={2.2} />
      </button>
    </motion.div>
  );
}
