"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart";
import { motion } from "framer-motion";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/you", label: "You", icon: User },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
];

export default function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCart((s) => s.totalItems());

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch h-[52px] w-full">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-col items-center justify-center flex-1 gap-0.5 active:opacity-70"
            >
              <div className="relative">
                <Icon
                  size={21}
                  strokeWidth={isActive ? 2.4 : 1.7}
                  className={isActive ? "text-orange-500" : "text-gray-400"}
                />
                {tab.href === "/cart" && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2.5 min-w-[15px] h-[15px] px-0.5 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center"
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium leading-none ${
                  isActive ? "text-orange-500" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
