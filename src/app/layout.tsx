import type { Metadata } from "next";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Megamart — Shop what you love",
  description: "Quality goods at great prices. Order easily via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        <SplashScreen />
        <div className="pb-safe min-h-screen">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
