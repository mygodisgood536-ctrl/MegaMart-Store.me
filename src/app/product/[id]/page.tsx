"use client";

import { useParams } from "next/navigation";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  ArrowLeft,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import TopSearch from "@/components/TopSearch";

const products = productsData as Product[];

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);
  const addItem = useCart((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-gray-900">Product not found</h1>
        <Link href="/" className="mt-4 inline-block text-orange-600 font-medium">
          ← Back to store
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Megamart`,
          url,
        });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <TopSearch />

      <div className="px-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 mb-2"
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      {/* Images */}
      <div className="relative aspect-square bg-gray-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 512px) 100vw, 512px"
            />
          </motion.div>
        </AnimatePresence>

        {product.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveImage((i) =>
                  i === 0 ? product.images.length - 1 : i - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() =>
                setActiveImage((i) =>
                  i === product.images.length - 1 ? 0 : i + 1
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.promo && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-black text-white">
              {product.promo}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 text-[10px] font-bold rounded bg-orange-500 text-white">
              -{discount}% OFF
            </span>
          )}
        </div>
      </div>

      {product.images.length > 1 && (
        <div className="flex gap-2 px-3 pt-2 overflow-x-auto hide-scrollbar">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                activeImage === i ? "border-orange-500" : "border-transparent opacity-70"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="56px" />
            </button>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="px-4 pt-4 pb-6">
        <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
          {product.category}
        </p>
        <h1 className="mt-1 text-xl font-bold text-gray-900 leading-snug">
          {product.name}
        </h1>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-base text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* Qty */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center font-medium"
            >
              −
            </button>
            <span className="w-10 text-center font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center font-medium"
            >
              +
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all ${
              added ? "bg-orange-500" : "bg-black hover:bg-gray-900"
            }`}
          >
            {added ? (
              <>
                <Check size={18} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={18} /> Add to Cart
              </>
            )}
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-3.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-400 text-center">
          After adding items, open Cart to order via WhatsApp
        </p>
      </div>

      {related.length > 0 && (
        <section className="px-3 pb-10">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3">You may also like</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
