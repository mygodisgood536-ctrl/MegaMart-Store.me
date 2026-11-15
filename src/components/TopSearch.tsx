"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

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
    <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="px-3 pt-2.5 pb-2.5">
        <form onSubmit={handleSearch} className="relative flex items-center gap-2.5">
          <Link href="/" className="flex-shrink-0" aria-label="Megamart home">
            <Logo size={34} />
          </Link>

          <div className="relative flex-1">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-10 pl-4 pr-11 rounded-full bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm placeholder:text-gray-400 transition-shadow"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Search"
            >
              <Search size={14} strokeWidth={2.5} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
