# EveryKart

A browser storefront (buyer side) and seller admin portal built with **React + Vite + React Router**.
There is no real backend: all data comes from a mock API (`src/api/mockApi.js`) backed by sample data and `localStorage`.

## Setup and run

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev        # opens at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## What is included

**Storefront** (`/`)
- Home with category shortcuts and featured products
- Product listing (`/products`) with search box and category filter
- Product detail (`/product/:id`)
- Cart (`/cart`) with quantity change, remove, clear and total. Cart is saved in the browser.

**Seller admin** (`/admin`)
- Login at `/admin/login` (demo: `seller@shop.com` / `seller123`)
- Product list, add product, edit product (image upload with preview)
- Read-only order list

**Quality items**
- Loading spinner and error message (with retry) on every data call
- Responsive layout (desktop and phone width)

## How to test loading and error states

The mock API waits about 600 ms per call so the loading state is visible.
Add `?fail=1` to any URL (for example `http://localhost:5173/products?fail=1`) to make every data call fail and show the error state with a "Try again" button.

## Assumptions

- Mock data lives in `src/data/products.js` (16 products, 5 orders). Placeholder photos come from picsum.photos.
- Products added or edited by the seller are stored in the browser's `localStorage`, so they appear in the storefront on the same browser.
- Seller login is a demo check only, not real authentication.
- Uploaded images are limited to 300 KB so they fit in `localStorage`.

## Known gaps

- No real backend or database; data is per browser.
- Checkout and payments are out of scope (checkout button is disabled).
- Orders are static sample data and read-only.
- No automated tests.

## Demo

Screenshots of the buyer flow and seller flow are in the `screenshots/` folder.
