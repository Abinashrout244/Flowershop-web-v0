# 🌸 FlowerShop — Premium Floral E-Commerce Web App

A polished floral storefront built with **React 19**, **Redux Toolkit**, **React Router v6**, **Vite 7**, and **Tailwind CSS v3**. It showcases a complete shopping experience with product browsing, cart and wishlist flows, checkout, and rich informational content pages.

---

## Key Features

- Browsable catalog for **Flowers**, **Plants**, **Gifts**, and **Weddings**
- Product detail page with **image carousel**, **quantity controls**, and **wishlist support**
- Cart with **item controls**, **sticky summary**, and **promo-style checkout preview**
- **Multi-step checkout** flow: shipping, payment, review
- Optional **address autocomplete** via **LocationIQ API**
- **Profile** and **wishlist** pages for user interactions
- Rich homepage sections and modern UI elements
- Fully **responsive**, **animated**, and **mobile-friendly**
- **Lazy-loaded routes** and **skeleton page loader** for smoother transitions

---

## Tech Stack

- React 19
- Vite 7
- Redux Toolkit
- React Router DOM v6
- Tailwind CSS v3
- Framer Motion
- Swiper 12
- React Slick
- Lucide React / React Icons
- ESLint 9

---

## Project Structure

```
.
├─ app
│  ├─ providers
│  │  └─ AppProviders.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ routes.jsx
│  └─ RouteShell.jsx
├─ assets
│  ├─ icons
│  └─ images
│     └─ logonew.png
├─ components
│  ├─ faq
│  │  ├─ FAQItem
│  │  │  └─ FAQItem.jsx
│  │  ├─ FAQList
│  │  │  └─ FAQList.jsx
│  │  └─ Sidebar
│  │     └─ Sidebar.jsx
│  ├─ home
│  │  ├─ AsSeenOn
│  │  │  └─ AsSeenOn.jsx
│  │  ├─ BestsellingBlooms
│  │  │  └─ BestsellingBlooms.jsx
│  │  ├─ BrandStory
│  │  │  └─ BrandStory.jsx
│  │  ├─ CategoryStrip
│  │  │  └─ CategoryStrip.jsx
│  │  ├─ ContentSection
│  │  │  └─ ContentSection.jsx
│  │  ├─ CuratedCollections
│  │  │  └─ CuratedCollections.jsx
│  │  ├─ CustomerReviews
│  │  │  └─ CustomerReviews.jsx
│  │  ├─ InTheSpotlight
│  │  │  └─ InTheSpotlight.jsx
│  │  ├─ landing
│  │  │  └─ Hero.jsx
│  │  ├─ SoftSentiments
│  │  │  └─ SoftSentiments.jsx
│  │  ├─ SummerBanner
│  │  │  └─ SummerBanner.jsx
│  │  └─ WorldwideDelivery
│  │     └─ WorldwideDelivery.jsx
│  ├─ layout
│  │  ├─ Footer
│  │  │  └─ Footer.jsx
│  │  └─ Navbar
│  │     ├─ MobileBottomNav.jsx
│  │     └─ Navbar.jsx
│  ├─ product
│  └─ ui
│     ├─ Loader
│     │  ├─ Loader.jsx
│     │  └─ PageLoader.jsx
│     └─ FlowerCelebration.jsx
├─ contexts
│  ├─ ThemeContext.jsx
│  └─ useTheme.js
├─ controllers
│  ├─ authController.js
│  ├─ useCategoriesController.js
│  └─ useProductsController.js
├─ features
│  ├─ cart
│  │  └─ cartSlice.js
│  └─ user
│     ├─ authSlice.js
│     └─ wishlistSlice.js
├─ hooks
│  ├─ useScrollToTop.js
│  └─ useSectionTheme.js
├─ lib
│  └─ supabaseClient.js
├─ models
│  ├─ authModel.js
│  ├─ categoryModel.js
│  ├─ faqModel.js
│  └─ productModel.js
├─ pages
│  ├─ About
│  │  └─ About.jsx
│  ├─ auth
│  │  ├─ authConfig.js
│  │  ├─ BackButton.jsx
│  │  ├─ Field.jsx
│  │  ├─ Login.jsx
│  │  ├─ LoginArt .jsx
│  │  ├─ PanelImage.jsx
│  │  ├─ PasswordChecklist.jsx
│  │  ├─ PasswordField.jsx
│  │  ├─ SignupArt.jsx
│  │  └─ SvgDefs.jsx
│  ├─ Blog
│  │  └─ Blog.jsx
│  ├─ Careers
│  │  └─ Careers.jsx
│  ├─ Cart
│  │  └─ Cart.jsx
│  ├─ Checkout
│  │  ├─ AddressLookup.jsx
│  │  ├─ Checkout.jsx
│  │  ├─ checkoutConstants.js
│  │  ├─ CheckoutField.jsx
│  │  ├─ CheckoutHeader.jsx
│  │  ├─ checkoutHelpers.js
│  │  ├─ CheckoutSidebar.jsx
│  │  ├─ CheckoutStepper.jsx
│  │  ├─ PaymentSection.jsx
│  │  ├─ ReviewSection.jsx
│  │  └─ ShippingSection.jsx
│  ├─ Contact
│  │  └─ Contact.jsx
│  ├─ CookiePolicy
│  │  └─ CookiePolicy.jsx
│  ├─ FAQ
│  │  └─ FAQ.jsx
│  ├─ Flowers
│  │  ├─ Flowers.jsx
│  │  ├─ HeroBanner.jsx
│  │  └─ ProductCard.jsx
│  ├─ Gifts
│  │  └─ Gifts.jsx
│  ├─ Home
│  │  └─ Home.jsx
│  ├─ NotFound
│  │  └─ NotFound.jsx
│  ├─ OrderConfirmed
│  │  └─ OrderConfirmed.jsx
│  ├─ Plants
│  │  ├─ PlantCard.jsx
│  │  └─ Plants.jsx
│  ├─ PressMedia
│  │  └─ PressMedia.jsx
│  ├─ PrivacyPolicy
│  │  └─ PrivacyPolicy.jsx
│  ├─ Product
│  │  └─ Product.jsx
│  ├─ Profile
│  │  └─ Profile.jsx
│  ├─ ReturnsPolicy
│  │  └─ ReturnsPolicy.jsx
│  ├─ Shop
│  │  ├─ HeroBanner.jsx
│  │  ├─ PromoBanner.jsx
│  │  ├─ Shop.jsx
│  │  ├─ ShopCard.jsx
│  │  └─ ShopInfo.jsx
│  ├─ Sitemap
│  │  └─ Sitemap.jsx
│  ├─ Terms
│  │  └─ Terms.jsx
│  ├─ Weddings
│  │  └─ Weddings.jsx
│  └─ Wishlist
│     └─ Wishlist.jsx
├─ store
│  └─ store.js
├─ styles
│  ├─ globals.css
│  ├─ reset.css
│  └─ variables.css
├─ utils
│  └─ ProtectedRoute.jsx
├─ ARCHITECTURE.md
└─ index.css
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install

```bash
git clone https://github.com/Abinashrout244/Flowershop-web-v0.git
cd Flowershop-web-v0
npm install
```

### Environment

Create a `.env` file in the project root if you want to enable address autocomplete:

```env
VITE_LOCATIONIQ_API_KEY=your_api_key_here
```

### Available Scripts

```bash
npm run dev      # Start local dev server
npm run build    # Build production app
```

---

## Notes

- The `.env` file is not committed, so API keys should be added manually.
- This repository is optimized for a luxe flower shop UI with rich interactions, animated carousels, and mobile-first responsive design.
