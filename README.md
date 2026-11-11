# Flora & Bloom

Flora & Bloom is a responsive flower-shop storefront built with React and Vite. It brings together product discovery, customer accounts, a persistent cart, wishlist, and a guided checkout experience in one frontend application.

> **Project status:** The storefront and its shopping flows are implemented. Checkout currently creates a demo order in the browser; it does not charge a payment method or persist orders to a backend.

## At a glance

- Browse flower arrangements, plants, gifts, wedding services, and curated collections.
- Search and explore products, view product details, choose a size, and manage a wishlist.
- Create an account and sign in through Supabase Auth.
- Add products to a guest cart or a signed-in cart. Guest cart contents are merged into the account cart after sign-in.
- Complete a three-step checkout flow with shipping, payment-method selection, and order review.
- View informational pages including About, FAQ, Contact, Blog, Careers, Press, and store policies.
- Use a responsive interface with animated elements, carousels, and lazy-loaded route pages.

## Preview

![Flora & Bloom home page](public/assets/Screenshots/Home.png)

## Technology

| Area | Tools |
| --- | --- |
| UI | React 19, React DOM |
| Build and development | Vite 7 |
| Routing | React Router DOM 6 with hash-based routing |
| Shared state | Redux Toolkit and React Redux |
| Backend integration | Supabase JavaScript client |
| Styling | Tailwind CSS 3, PostCSS |
| Animation and media | Framer Motion, Swiper, React Slick |
| Icons | Lucide React, React Icons |
| Code quality | ESLint 9 |

## Getting started

### Prerequisites

- Node.js 20.19+ (or 22.12+)
- npm
- A Supabase project for authentication and database-backed catalog/cart features

### Install dependencies

```bash
git clone https://github.com/Abinashrout244/Flowershop-web-v0.git
cd Flowershop-web-v0
npm install
```

### Configure environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABSE_PROJECT_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISH_KEY=your-supabase-publishable-key
```

The project currently reads `VITE_SUPABSE_PROJECT_URL` with that spelling from `src/lib/supabaseClient.js`. The Supabase URL and publishable/anon key are used by the browser client; never put a Supabase service-role key or other secret in a `VITE_` variable.

Address search and reverse geocoding are optional. To enable them, configure a Nominatim-compatible service URL:

```env
VITE_NOMINATIM_BASE_URL=https://nominatim.openstreetmap.org
```

The app calls the `/search` and `/reverse` endpoints on this base URL. If it is unset, address lookup displays a configuration message; customers can still enter their address manually. Respect the usage policy of the geocoding provider you configure.

Restart the Vite development server after editing `.env`.

### Supabase setup

The frontend expects Supabase Auth and the database objects used by the catalog and cart:

- `products` and `categories` tables for product and category data.
- `cart_items` table and the `merge_cart_items(jsonb)` function for signed-in carts.
- Row-level security policies that allow public catalog reads and restrict cart records to their owner.

`dbquery.md` contains SQL and sample data for these objects. Review it and apply the relevant schema, policies, function, and seed statements in your Supabase project's SQL Editor. The file also includes exploratory queries; do not treat every line as a single production migration. Keep the Supabase project's RLS policies enabled and verify them before using real customer data.

### Run locally

```bash
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`). The app uses hash routing, so application pages appear after `/#/`.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server. |
| `npm run build` | Create the optimized production build in `dist/`. |
| `npm run preview` | Serve the production build locally for verification. |
| `npm run lint` | Run ESLint across the project. |

## Application routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Shop (sign-in required) |
| `/flowers`, `/plants`, `/gifts`, `/weddings` | Product and service collections |
| `/product/:id` | Product details |
| `/cart`, `/checkout` | Cart and checkout (sign-in required) |
| `/order-confirmed` | Demo order confirmation |
| `/login`, `/forgot-password`, `/reset-password` | Account access |
| `/wishlist`, `/profile`, `/contact` | Customer pages (sign-in required) |
| `/about`, `/blog`, `/careers`, `/press-media` | Brand and editorial pages |
| `/faq`, `/returns-policy`, `/privacy-policy`, `/terms-conditions`, `/cookie-policy`, `/sitemap` | Help and policy pages |

Unknown routes display a not-found page. Routes are declared in `src/app/routes.jsx`; protected pages are wrapped with `ProtectedRoute`.

## Shopping and data behavior

- Product and category records are loaded from Supabase.
- Authentication and session changes are managed through Supabase Auth.
- Redux Toolkit holds shared cart, wishlist, and authentication state.
- Guest cart data is stored in browser `localStorage`; signed-in cart items are read from and synchronized with Supabase.
- Wishlist items and recent address suggestions are stored locally in the browser.
- Checkout validates shipping details, displays payment-method choices, and builds an order confirmation. The current implementation stores demo order history in `localStorage` (`flora_orders`) and clears the cart; payment processing and server-side order creation are not implemented.

## Project structure

```text
src/
├── app/            # App bootstrap, route definitions, and route shell
├── components/     # Shared layout, product, home, FAQ, and UI components
├── contexts/       # Theme context
├── controllers/    # Hooks coordinating UI state and models
├── features/       # Redux slices and cart synchronization
├── hooks/          # Shared React hooks
├── lib/            # Supabase client
├── models/         # Data access and normalization
├── pages/          # Route-level page components
├── store/          # Redux store configuration
├── styles/         # Global styles, reset, and CSS variables
└── utils/          # Shared utilities, including protected routes
public/
└── assets/         # Static product imagery and screenshots
```

The application follows an MVC-inspired frontend separation: route views and components render UI, controller hooks coordinate state and requests, and models handle data access. See [`src/ARCHITECTURE.md`](src/ARCHITECTURE.md) for the architecture overview.

## Production build

```bash
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static hosting provider. Configure the required `VITE_` environment variables in the hosting build environment before building. Because this app uses hash-based routing, static-host rewrite rules for application routes are not required.

## Contributing

1. Create a focused branch for your change.
2. Install dependencies with `npm install`.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request describing the behavior changed and how it was verified.
