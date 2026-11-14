import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem, Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "₦"): string {
  return `${currency}${price.toLocaleString("en-NG")}`;
}

export function calculateDiscount(original: number, current: number): number {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

export function generateWhatsAppMessage(items: CartItem[], currency = "₦"): string {
  const lines: string[] = [
    "Hello Megamart!",
    "",
    "I would like to place the following order:",
    "",
  ];

  items.forEach((item, index) => {
    const lineTotal = item.product.price * item.quantity;
    lines.push(`${index + 1}. ${item.product.name}`);
    lines.push(
      `   Qty: ${item.quantity}  ×  ${formatPrice(item.product.price, currency)}  =  ${formatPrice(lineTotal, currency)}`
    );
    lines.push("");
  });

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  lines.push("-------------------------");
  lines.push(`Total: ${formatPrice(total, currency)}`);
  lines.push("");
  lines.push("Please confirm availability. Thank you!");

  return lines.join("\n");
}

export function getWhatsAppLink(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function getCategories(products: Product[]): string[] {
  const cats = new Set(products.map((p) => p.category));
  return Array.from(cats).sort();
}
