import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, MapPin, Heart, ShoppingBag, User, ChevronDown, Menu, X, Megaphone } from "lucide-react";
import { selectCartCount } from "../../utils/cartSlice";
import { selectWishlistCount } from "../../utils/wishlistSlice";
import { searchProducts } from "../../Data/products";

const navLinks = [
  { label: "Flowers",  href: "/flowers"  },
  { label: "Plants",   href: "/plants"   },
  { label: "Gifts",    href: "/gifts"    },
  { label: "Weddings", href: "/weddings" },
];

const announcementItems = [
  "Free delivery on orders above ₹999",
  "Order before 5 PM for same-day delivery",
  "Use code BLOOM20 to get 20% off",
];

const NavHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSugg, setShowSugg] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Live search
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSugg(false);
      return;
    }
    const results = searchProducts(query).slice(0, 6);
    setSuggestions(results);
    setShowSugg(true);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      const clickedInsideDesktop = desktopSearchRef.current && desktopSearchRef.current.contains(e.target);
      const clickedInsideMobile = mobileSearchRef.current && mobileSearchRef.current.contains(e.target);
      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setShowSugg(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcementItems.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleSuggClick = (product) => {
    setQuery("");
    setShowSugg(false);
    setMenuOpen(false);
    navigate(`/product/${product.id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSugg(false);
      navigate(`/flowers?search=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Announcement bar */}
      <div className="bg-[#111] px-3 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white md:text-xs">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#c9a87c]/20 text-[#e9cfa9]">
            <Megaphone size={11} />
          </span>
          <span className="text-[#e9cfa9]">Live update:</span>
          <span key={announcementIndex} className="text-white transition-opacity duration-500">
            {announcementItems[announcementIndex]}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-3 h-16 md:h-[68px]">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-start leading-none">
            <span className="font-serif-display text-[26px] font-light tracking-[0.12em] text-[#1a1a1a]">Flora</span>
            <span className="text-[8.5px] tracking-[0.38em] text-[#c9a87c] uppercase font-bold -mt-0.5">& Bloom</span>
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 items-center gap-2 max-w-2xl mx-4">
            {/* Location */}
            <button className="flex items-center gap-1.5 flex-shrink-0 text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-2.5 hover:border-[#c9a87c] transition-colors group">
              <MapPin size={13} className="text-[#c9a87c]" />
              <span className="font-semibold whitespace-nowrap hidden lg:block">Deliver to</span>
              <ChevronDown size={11} className="group-hover:rotate-180 transition-transform duration-200" />
            </button>

            {/* Search with suggestions */}
            <div className="flex-1 relative" ref={desktopSearchRef}>
              <form onSubmit={handleSearch}>
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSugg(true)}
                  type="text"
                  placeholder="Search flowers, occasions, gifts…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all bg-gray-50 hover:bg-white"
                />
              </form>

              {/* Suggestions dropdown */}
              {showSugg && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggClick(product)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fdf8f0] transition-colors text-left border-b border-gray-50 last:border-0"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.category} · {product.tag}</p>
                      </div>
                      <p className="text-sm font-bold text-[#c9a87c] flex-shrink-0">₹{product.price.toLocaleString()}</p>
                    </button>
                  ))}
                  <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                    <button onClick={handleSearch} className="text-xs text-[#c9a87c] font-semibold hover:underline">
                      View all results for "{query}" →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nav links desktop */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map(({ label, href }) => {
              const active = location.pathname === href;
              return (
                <Link
                  key={label}
                  to={href}
                  className={`text-sm font-medium tracking-wide relative group transition-colors
                    ${active ? "text-[#c9a87c]" : "text-gray-700 hover:text-[#c9a87c]"}`}
                >
                  {label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-[#c9a87c] transition-all duration-300
                    ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">
            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 text-gray-700 hover:text-[#c9a87c] transition-colors relative">
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a87c] text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            {/* Cart */}
            <Link to="/cart" className="p-2 text-gray-700 hover:text-[#c9a87c] transition-colors relative">
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1a1a1a] text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Profile */}
            <Link to="/profile" className="hidden md:block p-2 text-gray-700 hover:text-[#c9a87c] transition-colors">
              <User size={19} />
            </Link>
            {/* Mobile menu */}
            <button className="md:hidden p-2 text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3" ref={mobileSearchRef}>
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSugg(true)}
                placeholder="Search flowers…"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#c9a87c] bg-gray-50"
              />
            </form>
            {showSugg && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                {suggestions.map(p => (
                  <button key={p.id} onClick={() => handleSuggClick(p)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fdf8f0] text-left border-b border-gray-50 last:border-0">
                    <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{p.name}</p>
                      <p className="text-[10px] text-gray-400">{p.category}</p>
                    </div>
                    <p className="text-xs font-bold text-[#c9a87c]">₹{p.price.toLocaleString()}</p>
                  </button>
                ))}
                <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                  <button onClick={handleSearch} className="text-xs text-[#c9a87c] font-semibold hover:underline">
                    View all results for "{query}" →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-0.5 shadow-lg">
          {navLinks.map(({ label, href }) => (
            <Link key={label} to={href} onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-2.5 border-b border-gray-50 hover:text-[#c9a87c] transition-colors">
              {label}
            </Link>
          ))}
          <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 py-2.5 border-b border-gray-50 hover:text-[#c9a87c]">
            Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 py-2.5 hover:text-[#c9a87c]">
            My Account
          </Link>
        </div>
      )}
    </header>
    <div className="h-[156px] md:h-[117px]" />
    </>
  );
};

export default NavHeader;
