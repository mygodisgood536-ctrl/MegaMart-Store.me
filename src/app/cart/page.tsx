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
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">
          Browse our products and add items you like.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Your Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <Link
                href={`/product/${item.product.id}`}
                className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.product.id}`}
                  className="font-semibold text-gray-900 hover:text-emerald-600 line-clamp-2 text-sm sm:text-base"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-500 mt-0.5">{item.product.category}</p>
                <p className="font-bold text-emerald-700 mt-1">
                  {formatPrice(item.product.price)}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary + Order */}
      <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <p className="text-sm text-emerald-800 leading-relaxed">
            When you tap the button below, WhatsApp will open with your complete order
            already filled in. Just send the message and we will confirm availability
            and arrange delivery with you.
          </p>
        </div>

        <button
          onClick={handleOrder}
          className="mt-5 w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg shadow-lg shadow-green-200 transition-colors"
        >
          <MessageCircle size={22} />
          Order via WhatsApp
        </button>

        <p className="mt-3 text-center text-xs text-gray-400">
          Opens WhatsApp with your order details • No payment taken here
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600"
      >
        <ArrowLeft size={16} /> Continue shopping
      </Link>
    </div>
  );
}
