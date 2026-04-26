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
web-flowershop-v0/
├── public/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── features/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── styles/
│   └── utils/
├── .env
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── eslint.config.js
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
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

---

## Notes

- The `.env` file is not committed, so API keys should be added manually.
- This repository is optimized for a luxe flower shop UI with rich interactions, animated carousels, and mobile-first responsive design.
