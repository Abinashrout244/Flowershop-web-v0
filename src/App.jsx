import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Aboutus from "./components/Aboutusmain";
import Workshop from "./components/Workshopmain";
import Shop from "./components/Shopmain";
import Contact from "./components/ContactUsmain";
import ShopDetail from "./components/ShopDetails";
import ScrollToTop from "./utils/Scrolltop";
import Cart from "./components/Cart";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
const approuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <Aboutus />,
      },
      {
        path: "/workshop",
        element: <Workshop />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      { path: "/shop/:id", element: <ShopDetail /> },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const appLayout = () => <RouterProvider router={approuter} />;

export default appLayout;
