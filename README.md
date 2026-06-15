# CMC Textile — B2B Commerce & Consignment Tracking

A mobile-style web app (phone UI rendered in the browser) for **CMC Textile**, a B2B manufacturer of
knitted mattress fabrics, yarns and threads. Business buyers can browse the full product range, configure
specifications, place orders, raise enquiries, and **track each consignment** through the production and
delivery pipeline — all in a blue & white theme built around the CMC brand.

Built with **React 18 + Vite + Tailwind CSS + React Router**. All data is stored locally in the browser
via `localStorage`, so the demo works fully offline with no backend.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## What's inside

- **Phone-style shell** — a centred device frame on desktop, full-screen on mobile, with a fixed
  bottom navigation bar (Home · Catalog · Cart · Orders · Account), just like a native app.
- **Catalog** — ~20 products across 9 categories (texturised & air-texturised yarns, roto, FDY/twisted,
  warp-knitted fabric, mattress ticking, upholstery, pillow covers, threads) with search, category and
  end-use filters.
- **Spec configurator** — choose denier / GSM / finish / composition / structure plus a dyed-colour
  picker, with live per-unit and total pricing (dyed shades carry a small surcharge), MOQ and lead time.
- **Cart & checkout** — editable line items, GST, PO number and delivery address prefilled from the buyer
  profile.
- **Consignment tracker** — the signature feature: a vertical production-and-delivery timeline (Order
  Placed → Confirmed → In Production → Quality Check → Dispatched → In Transit → Delivered) with a live
  consignment card showing quantity, colour, specification, tracking ID, vehicle, dispatch date and ETA.
  Use the **"Advance to next stage (demo)"** button on any active order to move it forward live during the
  pitch.
- **Enquiries / RFQ** — request quotes, samples or custom development; CMC "responds" via an in-app
  notification.
- **Extras** — favourites/wishlist, one-tap reorder, notifications, an editable business profile, and
  first-run seeded data so the app looks populated immediately.
- **Original generated swatches** — each product's visual is a generated SVG textile swatch (no stock
  photography), tinted by the selected colour.

## Project structure

```
src/
  components/   AppShell, TopBar, BottomNav, NotificationSheet, ProductCard, Timeline, ProductVisual, ui
  context/      StoreProvider (global state + localStorage persistence + actions)
  data/         products (catalog)
  lib/          constants, format helpers, storage wrapper, first-run seed data
  pages/        Home, Catalog, ProductDetail, Cart, Checkout, Orders, OrderDetail, Inquiry, Favorites, Profile
public/         cmc-logo.png, cmc-icon.png
```

## Reset the demo

Account → **Reset demo data** clears local storage and reseeds the sample buyer, orders and enquiries.
