import Aboutus from "./components/Aboutusmain";
import Workshop from "./components/Workshopmain";
import Shop from "./components/Shopmain";
import Contact from "./components/ContactUsmain";
import ShopDetail from "./components/ShopDetails";
import ScrollToTop from "./utils/Scrolltop";
import Cart from "./components/Cart";
import Error from "./components/Error";
import HomePage from "./components/homepage/HomePage";
import OldHeader from "./components/Header";
import OldFooter from "./components/Footer";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

// Shell layout for legacy pages (About, Shop, etc.)
const LegacyLayout = () => (
  <>
    <ScrollToTop />
    <OldHeader />
    <Outlet />
    <OldFooter />
  </>
);

const approuter = createHashRouter([
  {
    // New premium homepage — no shared layout wrapper needed
    path: "/",
    element: <><ScrollToTop /><HomePage /></>,
    errorElement: <Error />,
  },
  {
    // Legacy pages share old header/footer
    element: <LegacyLayout />,
    errorElement: <Error />,
    children: [
      { path: "/about",      element: <Aboutus /> },
      { path: "/workshop",   element: <Workshop /> },
      { path: "/shop",       element: <Shop /> },
      { path: "/shop/:id",   element: <ShopDetail /> },
      { path: "/contact",    element: <Contact /> },
      { path: "/cart",       element: <Cart /> },
    ],
  },
]);

const AppLayout = () => <RouterProvider router={approuter} />;

export default AppLayout;
