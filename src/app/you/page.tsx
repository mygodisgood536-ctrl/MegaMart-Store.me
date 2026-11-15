"use client";

import Link from "next/link";
import storeConfig from "@/data/store.json";
import Logo from "@/components/Logo";
import {
  MessageCircle,
  MapPin,
  Package,
  ChevronRight,
  Shield,
} from "lucide-react";

export default function YouPage() {
  return (
    <div className="bg-white min-h-screen w-full">
      <div className="bg-gray-950 text-white px-4 pt-10 pb-7">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg">
            <Logo size={36} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">{storeConfig.name}</h1>
            <p className="text-sm text-gray-400">{storeConfig.tagline}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-2">
        <a
          href={`https://wa.me/${storeConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 active:bg-gray-50"
        >
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <MessageCircle size={18} className="text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 text-[15px]">Chat on WhatsApp</p>
            <p className="text-xs text-gray-500">{storeConfig.whatsappDisplay}</p>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </a>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
            <MapPin size={18} className="text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 text-[15px]">Location</p>
            <p className="text-xs text-gray-500">{storeConfig.address}</p>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 active:bg-gray-50"
        >
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
            <Package size={18} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 text-[15px]">Browse Products</p>
            <p className="text-xs text-gray-500">See everything we have</p>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </Link>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
            <Shield size={18} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 text-[15px]">How ordering works</p>
            <p className="text-xs text-gray-500">
              Add to cart → Order via WhatsApp → We confirm & deliver
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400 mt-10 px-4 pb-4">
        © {new Date().getFullYear()} {storeConfig.name}
      </p>
    </div>
  );
}
