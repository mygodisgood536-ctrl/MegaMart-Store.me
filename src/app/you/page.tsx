"use client";

import Link from "next/link";
import storeConfig from "@/data/store.json";
import {
  MessageCircle,
  MapPin,
  Package,
  ChevronRight,
  Shield,
} from "lucide-react";

export default function YouPage() {
  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white px-4 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg">
            M
          </div>
          <div>
            <h1 className="text-lg font-bold">{storeConfig.name}</h1>
            <p className="text-sm text-gray-300">{storeConfig.tagline}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-2">
        <a
          href={`https://wa.me/${storeConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <MessageCircle size={18} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Chat on WhatsApp</p>
            <p className="text-xs text-gray-500">{storeConfig.whatsappDisplay}</p>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </a>

        <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
            <MapPin size={18} className="text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Location</p>
            <p className="text-xs text-gray-500">{storeConfig.address}</p>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
            <Package size={18} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Browse Products</p>
            <p className="text-xs text-gray-500">See everything we have</p>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </Link>

        <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
            <Shield size={18} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">How ordering works</p>
            <p className="text-xs text-gray-500">
              Add items to cart → Order via WhatsApp → We confirm & deliver
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-8 px-4">
        © {new Date().getFullYear()} {storeConfig.name}
      </p>
    </div>
  );
}
