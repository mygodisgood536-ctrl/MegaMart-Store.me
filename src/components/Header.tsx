"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const totalItems = useCart((s) => s.totalItems());
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Mega<span className="text-emerald-600">mart</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/#categories" className="hover:text-emerald-600 transition-colors">
              Categories
            </Link>
            <Link href="/#featured" className="hover:text-emerald-600 transition-colors">
              Featured
            </Link>
            <Link href="/admin" className="hover:text-emerald-600 transition-colors text-xs opacity-50">
              Admin
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </Link>

            <button
              className="md:hidden p-2 rounded-full hover:bg-emerald-50 text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pb-4"
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/50 text-sm"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-emerald-100 bg-white px-4 py-4 space-y-1"
          >
            <Link href="/" className="block py-2.5 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/#categories" className="block py-2.5 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
              Categories
            </Link>
            <Link href="/#featured" className="block py-2.5 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
              Featured
            </Link>
            <Link href="/cart" className="block py-2.5 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
              Cart ({totalItems})
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
