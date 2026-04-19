import React, { Suspense, lazy } from "react";
import { createHashRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/Home/Home"));
const Shop = lazy(() => import("../pages/Shop/Shop"));
const Flowers = lazy(() => import("../pages/Flowers/Flowers"));
const Plants = lazy(() => import("../pages/Plants/Plants"));
const Gifts = lazy(() => import("../pages/Gifts/Gifts"));
const Weddings = lazy(() => import("../pages/Weddings/Weddings"));
const Product = lazy(() => import("../pages/Product/Product"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const OrderConfirmed = lazy(() => import("../pages/OrderConfirmed/OrderConfirmed"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const About = lazy(() => import("../pages/About/About"));
const Blog = lazy(() => import("../pages/Blog/Blog"));
const Careers = lazy(() => import("../pages/Careers/Careers"));
const PressMedia = lazy(() => import("../pages/PressMedia/PressMedia"));
const ReturnsPolicy = lazy(() => import("../pages/ReturnsPolicy/ReturnsPolicy"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const Terms = lazy(() => import("../pages/Terms/Terms"));
const CookiePolicy = lazy(() => import("../pages/CookiePolicy/CookiePolicy"));
const Sitemap = lazy(() => import("../pages/Sitemap/Sitemap"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

import useScrollToTop from "../hooks/useScrollToTop";

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
  </div>
);

const RouteShell = ({ children }) => {
  useScrollToTop();
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  );
};

export const router = createHashRouter(
  [
    { path: "/", element: <RouteShell><Home /></RouteShell> },
    { path: "/shop", element: <RouteShell><Shop /></RouteShell> },
    { path: "/flowers", element: <RouteShell><Flowers /></RouteShell> },
    { path: "/plants", element: <RouteShell><Plants /></RouteShell> },
    { path: "/gifts", element: <RouteShell><Gifts /></RouteShell> },
    { path: "/weddings", element: <RouteShell><Weddings /></RouteShell> },
    { path: "/product/:id", element: <RouteShell><Product /></RouteShell> },
    { path: "/cart", element: <RouteShell><Cart /></RouteShell> },
    { path: "/checkout", element: <RouteShell><Checkout /></RouteShell> },
    { path: "/order-confirmed", element: <RouteShell><OrderConfirmed /></RouteShell> },
    { path: "/wishlist", element: <RouteShell><Wishlist /></RouteShell> },
    { path: "/profile", element: <RouteShell><Profile /></RouteShell> },
    { path: "/faq", element: <RouteShell><FAQ /></RouteShell> },
    { path: "/contact", element: <RouteShell><Contact /></RouteShell> },
    { path: "/about", element: <RouteShell><About /></RouteShell> },
    { path: "/blog", element: <RouteShell><Blog /></RouteShell> },
    { path: "/careers", element: <RouteShell><Careers /></RouteShell> },
    { path: "/press-media", element: <RouteShell><PressMedia /></RouteShell> },
    { path: "/returns-policy", element: <RouteShell><ReturnsPolicy /></RouteShell> },
    { path: "/privacy-policy", element: <RouteShell><PrivacyPolicy /></RouteShell> },
    { path: "/terms-conditions", element: <RouteShell><Terms /></RouteShell> },
    { path: "/cookie-policy", element: <RouteShell><CookiePolicy /></RouteShell> },
    { path: "/sitemap", element: <RouteShell><Sitemap /></RouteShell> },
    { path: "*", element: <RouteShell><NotFound /></RouteShell> }
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
);
