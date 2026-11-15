"use client";

import { useCart } from "@/store/cart";
import { formatPrice, generateWhatsAppMessage, getWhatsAppLink } from "@/lib/utils";
import storeConfig from "@/data/store.json";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const total = totalPrice();

  const handleOrder = () => {
    if (items.length === 0) return;
    const message = generateWhatsAppMessage(items, storeConfig.currency);
    const link = getWhatsAppLink(storeConfig.whatsapp, message);
    window.open(link, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center min-h-screen bg-white">
        <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 flex items-center justify-center mb-5">
          <ShoppingBag size={28} className="text-orange-400" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-gray-500">
          Browse products and add items you like.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold"
        >
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen px-3 pt-4 pb-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">
          Cart ({items.reduce((s, i) => s + i.quantity, 0)})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-gray-400 hover:text-red-500"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100"
            >
              <Link
                href={`/product/${item.product.id}`}
                className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.product.id}`}
                  className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-orange-600"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm font-bold text-orange-600 mt-1">
                  {formatPrice(item.product.price)}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
        <div className="flex justify-between items-center text-base font-bold text-gray-900">
          <span>Total</span>
          <span className="text-orange-600">{formatPrice(total)}</span>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-white border border-gray-100 text-xs text-gray-600 leading-relaxed">
          Tap the button below to open WhatsApp with your complete order already
          filled in. We will confirm availability and arrange delivery with you.
        </div>

        <button
          onClick={handleOrder}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base shadow-md transition-colors"
        >
          <MessageCircle size={20} />
          Order via WhatsApp
        </button>
      </div>

      <Link
        href="/"
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-gray-500"
      >
        <ArrowLeft size={15} /> Continue shopping
      </Link>
    </div>
  );
}
