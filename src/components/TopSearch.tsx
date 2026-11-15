"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Camera } from "lucide-react";
import Link from "next/link";

export default function TopSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="px-3 pt-2 pb-2.5 max-w-lg mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center gap-2">
          <Link href="/" className="flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">M</span>
            </div>
          </Link>

          <div className="relative flex-1">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-10 pl-4 pr-12 rounded-full bg-gray-100 border border-transparent focus:bg-white focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-100 text-sm placeholder:text-gray-400 transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search size={15} strokeWidth={2.5} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
