# Ultrafield Logistics Limited — Website

A premium, fully responsive marketing and customer website for **Ultrafield Logistics
Limited**, a logistics services company based in Abeokuta, Ogun State, Nigeria.

**This is a frontend-only build.** The Python FastAPI backend and PostgreSQL database
are intentionally not included — the frontend is architecture-ready for that integration
in a later phase.

## Business information (as supplied)

- **Company:** Ultrafield Logistics Limited
- **Address:** 26 Ita Iyalode Road, Lafenwa, Abeokuta 110252, Ogun State, Nigeria
- **Phone:** 0803 331 3686
- **Google Maps Plus Code:** 48VG+R5 Abeokuta
- **Google rating:** 4.8/5 from 25 reviews (listing information)

No unverified business facts (history, awards, routes, guarantees, prices) are claimed
anywhere on the site.

## Technology stack

- React 18 + Vite 5 (JavaScript)
- Tailwind CSS 3
- React Router DOM 6
- Framer Motion
- Lucide React icons
- Google Fonts: Inter / Manrope / Plus Jakarta Sans, Anton, Archivo, JetBrains Mono

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Configuration

Copy `.env.example` to `.env` and set the frontend-safe base URL:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

**Never put secret keys (API keys, database credentials, Paystack secrets) in frontend
environment variables.** Real authentication, payment processing, and data access will
live in the backend.

## Project structure

```text
src/
├── assets/
│   └── photos/       # Locally-bundled royalty-free logistics photography
├── components/
│   ├── layout/        # Header, Footer, Layout shell
│   ├── common/        # BrandLogo, SectionHeading, StatusBadge, PageHeader, AuthLayout...
│   ├── forms/         # Reusable FormField / TextInput / TextArea / Select
│   ├── dashboard/     # DashboardShell shared by customer & admin dashboards
│   └── home/          # Homepage section components (hero, services, etc.)
├── pages/             # Home, TrackShipment, Payment, BookShipment, GetQuote,
│                      # About, Services, Contact, Login, Register,
│                      # ForgotPassword, ResetPassword, CustomerDashboard, AdminDashboard
├── services/          # Centralized API layer (api.js + per-domain services)
├── context/           # AuthContext (frontend-only demo auth state)
├── data/              # Mock data (shipments, customers, payments)
├── utils/             # Formatting + validation helpers
├── App.jsx            # Routes
└── main.jsx           # Entry
public/
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Backend integration plan

Every service in `src/services/` currently returns mock data (see `USE_MOCK_DATA` in
`api.js`). To connect the real backend:

1. Set `VITE_API_BASE_URL` in the environment.
2. Flip `USE_MOCK_DATA` to `false` — each service function already calls the correct
   endpoint path via the shared `apiRequest()` helper.
3. Replace the demo authentication in `AuthContext` with real token handling from the
   FastAPI backend.

## Photography

The site uses **real, high-quality, royalty-free logistics photography** (sourced from
Pexels) that is **downloaded and bundled locally** under `src/assets/photos/`, so the
site does not depend on external image URLs at runtime.

- **Photographic hero:** a full-width freight-transport photograph with a dark-navy
  overlay gradient for text contrast, the trust label, headline, and CTAs.
- **Page imagery:** relevant photos across the homepage, About, Services, Track,
  Booking, and Contact sections — each chosen for its subject, with no repetition.
- **Dashboards:** the customer dashboard uses small shipment thumbnails only; the
  admin dashboard is data-first with no decorative photography.
- Images use responsive sizing, `loading="lazy"`, `decoding="async"`, explicit
  dimensions, and descriptive `alt` text. The hero image is the priority-loaded
  above-the-fold asset.

The earlier scroll-driven cinematic freight-video hero has been **removed entirely** —
no video elements, scroll-scrub logic, posters, or recording mode remain.

## Paystack payments

The payment page integrates **Paystack** through the frontend inline checkout.

- **Only the publishable (public) key is used in the frontend**, read from
  `VITE_PAYSTACK_PUBLIC_KEY` in `.env`. The **secret key is never placed in
  frontend code or frontend env vars** — it belongs on the backend, where it is
  used to verify transactions (verify endpoint / webhook).
- The **Pay Now** button opens the real Paystack inline checkout with the invoice
  amount (converted to the smallest currency unit — kobo for NGN), the customer
  email, and a unique reference. Card details are handled entirely by Paystack.
- The `onSuccess` callback is **not** treated as a trusted confirmation on its
  own. On success the frontend calls `verifyPayment()`, which hits the backend
  `/payments/verify/:reference` endpoint (secret key stays server-side) to confirm
  the transaction before marking it paid.
- When `VITE_PAYSTACK_PUBLIC_KEY` is **not** set, the page runs in a clearly
  labelled **demo mode** — the Pay Now button shows a demo interaction and makes
  no real charge. Add the public key to enable live checkout.

## Carrier tracking (UPS, DHL, FedEx & more)

The tracking experience integrates **external carrier tracking** via real
deep-links to each carrier's own tracking page — these open in a new tab and work
immediately with no backend or API keys.

- Supported carriers: **UPS, DHL Express, FedEx, USPS, Royal Mail, Australia
  Post, Canada Post, EMS, DPD, TNT, GLS, Aramex, Lasership, OnTrac**.
- **Auto-detection:** the carrier is inferred from the tracking number pattern
  (e.g. a `1Z…` number resolves to UPS, a 12-digit number to FedEx). Internal
  Ultrafield references (`UF…`) are correctly excluded from carrier matching.
- **Manual override:** a carrier selector lets the customer pick any supported
  carrier and regenerate the deep-link instantly.
- The **Track on [Carrier]** button opens the carrier's tracking page with the
  tracking number pre-filled. Available on the `/track` page and in the customer
  dashboard's tracking panel.
- Deep-links are built in `src/utils/carriers.js` / `src/data/carriers.js`. When
  the backend is connected, richer carrier tracking events can be fetched from
  `/tracking/external/:number` (carrier API keys live server-side); the
  deep-link is always available locally.

## Demo-only functionality

Booking/quote submissions and authentication use **mock data and frontend-only demo
state**, clearly labelled in the UI. **Paystack** payments and **carrier tracking** are
real frontend integrations (see the sections above); they run in clearly-labelled demo
mode until the backend (transaction verification, persistent auth) is connected.
# ultra-field
