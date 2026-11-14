import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "Megamart — Quality Goods. Great Prices.",
  description: "Shop electronics, fashion, jewelry, home goods and more. Order easily via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">
        <SplashScreen />
        <Header />
        <main>{children}</main>
        <footer className="mt-20 border-t border-emerald-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="font-bold text-lg">
                  Mega<span className="text-emerald-600">mart</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Quality goods • Great prices • Order via WhatsApp
              </p>
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} Megamart. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
