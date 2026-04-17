import { createHashRouter, RouterProvider } from "react-router-dom";

// ── Homepage ───────────────────────────────────────────────
import HomePage          from "./components/homepage/HomePage";

// ── Shop pages ─────────────────────────────────────────────
import FlowersPage       from "./components/pages/FlowersPage";
import PlantsPage        from "./components/pages/PlantsPage";
import GiftsPage         from "./components/pages/GiftsPage";
import WeddingsPage      from "./components/pages/WeddingsPage";

// ── Product & commerce ─────────────────────────────────────
import ProductDetailPage from "./components/pages/ProductDetailPage";
import CartPage          from "./components/pages/CartPage";
import CheckoutPage      from "./components/pages/CheckoutPage";
import OrderConfirmedPage from "./components/pages/OrderConfirmedPage";
import ShopPage          from "./components/pages/ShopPage";
import FAQPage           from "./components/pages/FAQPage";
import ContactPage       from "./components/pages/ContactPage";
import AboutPage         from "./components/pages/AboutPage";
import BlogPage          from "./components/pages/BlogPage";
import CareersPage       from "./components/pages/CareersPage";
import PressMediaPage    from "./components/pages/PressMediaPage";
import ReturnsPolicyPage from "./components/pages/ReturnsPolicyPage";
import PrivacyPolicyPage from "./components/pages/PrivacyPolicyPage";
import TermsPage         from "./components/pages/TermsPage";
import CookiePolicyPage  from "./components/pages/CookiePolicyPage";
import SitemapPage       from "./components/pages/SitemapPage";

// ── Account ────────────────────────────────────────────────
import WishlistPage      from "./components/pages/WishlistPage";
import ProfilePage       from "./components/pages/ProfilePage";

// ── Utility ────────────────────────────────────────────────
import ScrollToTop       from "./utils/Scrolltop";

const Wrap = ({ children }) => <><ScrollToTop />{children}</>;

const router = createHashRouter([
  { path: "/",                element: <Wrap><HomePage /></Wrap>           },
  { path: "/shop",            element: <Wrap><ShopPage /></Wrap>           },
  { path: "/flowers",         element: <Wrap><FlowersPage /></Wrap>        },
  { path: "/plants",          element: <Wrap><PlantsPage /></Wrap>         },
  { path: "/gifts",           element: <Wrap><GiftsPage /></Wrap>          },
  { path: "/weddings",        element: <Wrap><WeddingsPage /></Wrap>       },
  { path: "/product/:id",     element: <Wrap><ProductDetailPage /></Wrap>  },
  { path: "/cart",            element: <Wrap><CartPage /></Wrap>           },
  { path: "/checkout",        element: <Wrap><CheckoutPage /></Wrap>       },
  { path: "/order-confirmed", element: <Wrap><OrderConfirmedPage /></Wrap> },
  { path: "/wishlist",        element: <Wrap><WishlistPage /></Wrap>       },
  { path: "/profile",         element: <Wrap><ProfilePage /></Wrap>        },
  { path: "/faq",             element: <Wrap><FAQPage /></Wrap>            },
  { path: "/contact",         element: <Wrap><ContactPage /></Wrap>        },
  { path: "/about",           element: <Wrap><AboutPage /></Wrap>          },
  { path: "/blog",            element: <Wrap><BlogPage /></Wrap>           },
  { path: "/careers",         element: <Wrap><CareersPage /></Wrap>        },
  { path: "/press-media",     element: <Wrap><PressMediaPage /></Wrap>     },
  { path: "/returns-policy",  element: <Wrap><ReturnsPolicyPage /></Wrap>  },
  { path: "/privacy-policy",  element: <Wrap><PrivacyPolicyPage /></Wrap>  },
  { path: "/terms-conditions",element: <Wrap><TermsPage /></Wrap>          },
  { path: "/cookie-policy",   element: <Wrap><CookiePolicyPage /></Wrap>   },
  { path: "/sitemap",         element: <Wrap><SitemapPage /></Wrap>        },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }
});

const AppLayout = () => <RouterProvider router={router} future={{ v7_startTransition: true }} />;
export default AppLayout;
