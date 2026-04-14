import { useState } from "react";
import { Search, MapPin, Heart, ShoppingBag, User, ChevronDown, Menu, X } from "lucide-react";

const NavHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top announcement bar */}
      <div className="bg-[#1a1a1a] text-white text-center text-xs py-2 tracking-widest font-light">
        FREE DELIVERY ON ORDERS ABOVE ₹999 &nbsp;|&nbsp; USE CODE: BLOOM20 FOR 20% OFF
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">

          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="flex flex-col items-center">
              <span className="font-serif-display text-2xl md:text-3xl font-light tracking-[0.15em] text-[#1a1a1a] leading-none">
                Flora
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#c9a87c] uppercase font-medium">
                & Bloom
              </span>
            </div>
          </a>

          {/* Desktop Search area */}
          <div className="hidden md:flex flex-1 items-center gap-3 max-w-2xl mx-auto">
            {/* Location selector */}
            <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-full px-3 py-2 hover:border-[#c9a87c] transition-colors whitespace-nowrap group">
              <MapPin size={14} className="text-[#c9a87c]" />
              <span className="font-medium">Deliver to</span>
              <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-200" />
            </button>

            {/* Search bar */}
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for flowers, plants, gifts..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all bg-gray-50 hover:bg-white"
              />
            </div>
          </div>

          {/* Nav links (desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            {["Flowers", "Plants", "Gifts", "Weddings"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[#c9a87c] transition-colors tracking-wide relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a87c] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            <button className="p-2 text-gray-700 hover:text-[#c9a87c] transition-colors relative group">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a87c] text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
            </button>
            <button className="p-2 text-gray-700 hover:text-[#c9a87c] transition-colors relative group">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1a1a1a] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hidden md:block p-2 text-gray-700 hover:text-[#c9a87c] transition-colors">
              <User size={20} />
            </button>
            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for flowers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#c9a87c] bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 shadow-lg">
          {["Flowers", "Plants", "Gifts", "Weddings", "About Us"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-sm font-medium text-gray-700 py-2 border-b border-gray-50 hover:text-[#c9a87c] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default NavHeader;
