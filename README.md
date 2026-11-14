# Megamart — WhatsApp Commerce Store

A beautiful, animated online store inspired by Jumia / Temu, built with **Next.js**, **Tailwind CSS** and **Framer Motion**.

Customers browse products, add to cart, and order via WhatsApp. No accounts. No payment gateways.

## Features

- Splash screen + smooth animations
- Jumia-style product grids, categories, featured & promo sections
- Multi-image product pages with slider
- Discount badges & promo labels (Black Friday, Flash Sale, etc.)
- Cart with quantity controls
- **Order via WhatsApp** — generates a clean pre-filled message with all items
- Product share links (copy or native share)
- Admin dashboard (password protected) to add / edit / delete products
- Products currently saved in browser localStorage (easy to later move to a database)

## Quick Start

```bash
cd megamart
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Access

- URL: `/admin`
- Default password: `megamart2024`

Change the password in `src/data/store.json`.

## WhatsApp Number

Configured in `src/data/store.json`:

```json
"whatsapp": "2348154076947",
"whatsappDisplay": "0815 407 6947"
```

## Adding Products

1. Go to `/admin` and log in
2. Click **Add New Product**
3. Fill name, price, original price (for discounts), promo label, category
4. Paste one or more image URLs (one per line)
5. Save — the product appears in the store immediately (this browser)

When you later add a real database (Supabase, Firebase, etc.), you can migrate the products from localStorage or from `src/data/products.json`.

## Colour Scheme

Emerald / teal primary with clean whites and soft shadows — modern, trustworthy, and eye-catching for a general goods marketplace.

## Project Structure

```
src/
  app/
    page.tsx          → Homepage
    product/[id]      → Product detail
    cart/             → Cart + WhatsApp order
    admin/            → Owner dashboard
    category/[slug]   → Category listing
  components/         → Header, ProductCard, SplashScreen
  data/               → products.json + store.json
  store/              → Zustand cart (persisted)
  lib/                → types + helpers
```

## Next Steps (when you are ready)

1. Connect a database + image storage (Supabase is free and excellent)
2. Deploy to Vercel (free)
3. Point your domain
4. Optionally add search, filters, and more promo banners

---

Built for Megamart.
