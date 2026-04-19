# FlowerShop Web

React + Vite flower shop app with Redux Toolkit and React Router.

## Project Structure

```text
src/
+-- app/
¦   +-- App.jsx
¦   +-- main.jsx
¦   +-- routes.jsx
¦   +-- providers/
¦       +-- AppProviders.jsx
+-- pages/
¦   +-- Home/
¦   +-- Shop/
¦   +-- Product/
¦   +-- Cart/
¦   +-- Checkout/
¦   +-- NotFound/
¦   +-- ...other route pages
+-- components/
¦   +-- ui/
¦   ¦   +-- Button/
¦   ¦   +-- Card/
¦   ¦   +-- Input/
¦   +-- home/
¦   +-- faq/
¦   +-- product/
¦   +-- layout/
+-- features/
¦   +-- cart/
¦   +-- products/
¦   +-- user/
+-- store/
¦   +-- store.js
¦   +-- hooks.js
+-- services/
¦   +-- apiClient.js
¦   +-- productService.js
+-- data/
¦   +-- flowers.js
¦   +-- faq.js
¦   +-- categories.js
+-- hooks/
¦   +-- useCart.js
¦   +-- useDebounce.js
¦   +-- useScrollToTop.js
+-- utils/
¦   +-- formatPrice.js
¦   +-- constants.js
+-- assets/
¦   +-- images/
¦   +-- icons/
+-- styles/
¦   +-- globals.css
¦   +-- variables.css
¦   +-- reset.css
+-- index.css
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
