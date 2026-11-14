export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  category: string;
  promo: string | null;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreConfig {
  name: string;
  tagline: string;
  whatsapp: string;
  whatsappDisplay: string;
  address: string;
  email: string;
  currency: string;
  adminPassword: string;
}
