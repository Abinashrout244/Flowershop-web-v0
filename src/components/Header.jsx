import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import flowerone from "../assets/images/flower1.png";
import { useSelector } from "react-redux";
import { ShoppingCartIcon } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const CartItems = useSelector((store) => store?.cart?.items);

  const togglemenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    // thhis is i am not knowing i am copy and paste from chatgpt.
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#DDE0EB] shadow-md shadow-gray-600"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="flex justify-between items-center p-3 md:py-3 md:px-[170px] font-syne">
        <NavLink to="/">
          <img src={flowerone} alt="Flower logo" className="h-10" />
        </NavLink>

        <nav className="hidden lg:flex gap-12 items-center text-lg">
          <NavLink
            to="/"
            // className={({ isActive }) =>
            //   isActive ? "text-white font-bold" : "text-[#2D416A] "
            // }
            className={` "text-[#2D416A] [&.active]:text-white [&.active]:font-bold `}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={` "text-[#2D416A] [&.active]:text-white [&.active]:font-bold `}
          >
            About
          </NavLink>

          <NavLink
            to="/workshop"
            className={` "text-[#2D416A] [&.active]:text-white [&.active]:font-bold `}
          >
            Workshop
          </NavLink>

          <NavLink
            to="/shop"
            className={` "text-[#2D416A] [&.active]:text-white [&.active]:font-bold `}
          >
            Shop
          </NavLink>

          <NavLink
            to="/contact"
            className={` "text-[#2D416A] [&.active]:text-white [&.active]:font-bold `}
          >
            Contact Us
          </NavLink>

          <NavLink to="/cart" className="relative text-[#2D416A]">
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#2D416A] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
              {CartItems.length}
            </span>
          </NavLink>

          <NavLink to="/shop">
            <button className="px-4 py-2 bg-[#2D416A] text-white rounded">
              Shop Now
            </button>
          </NavLink>
        </nav>

        <button
          className="lg:hidden text-3xl cursor-pointer"
          onClick={togglemenu}
        >
          {isOpen ? "❌" : "☰"}
        </button>
      </div>

      {/* mobile menu */}

      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-2/3 bg-gray-200 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button className="text-2xl" onClick={togglemenu}>
            ❌
          </button>
        </div>

        <nav className="flex flex-col gap-6 p-6 text-lg font-syne">
          <NavLink
            to="/"
            className={` "text-[#2D416A] [&.active]:text-cyan-400 [&.active]:font-bold `}
            onClick={togglemenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={` "text-[#2D416A] [&.active]:text-cyan-400 [&.active]:font-bold `}
            onClick={togglemenu}
          >
            About
          </NavLink>

          <NavLink
            to="/workshop"
            className={` "text-[#2D416A] [&.active]:text-cyan-400 [&.active]:font-bold `}
            onClick={togglemenu}
          >
            Workshop
          </NavLink>

          <NavLink
            to="/shop"
            className={` "text-[#2D416A] [&.active]:text-cyan-400 [&.active]:font-bold `}
            onClick={togglemenu}
          >
            Shop
          </NavLink>

          <NavLink
            to="/contact"
            className={` "text-[#2D416A] [&.active]:text-cyan-400 [&.active]:font-bold `}
            onClick={togglemenu}
          >
            Contact Us
          </NavLink>

          <NavLink to="/cart" className="relative text-[#2D416A]">
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="absolute -top-3 left-4 bg-[#2D416A] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
              {CartItems.length}
            </span>
          </NavLink>

          <NavLink to="/shop" onClick={togglemenu}>
            <button className="px-4 py-2 bg-[#2D416A] text-white rounded">
              Shop Now
            </button>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
