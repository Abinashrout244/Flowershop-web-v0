import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ArrowUpRight,
  Megaphone,
} from "lucide-react";
import { selectCartCount } from "../../../features/cart/cartSlice";
import { selectWishlistCount } from "../../../features/user/wishlistSlice";
import { searchProducts } from "../../../data/flowers";
import logo from "../../../assets/images/logonew.png";

/* ─── Nav links for classic white mode ─── */
const shopNavLinks = [
  { label: "Flowers", href: "/flowers" },
  { label: "Plants", href: "/plants" },
  { label: "Gifts", href: "/gifts" },
  { label: "Weddings", href: "/weddings" },
];

const announcementItems = [
  "Free delivery on orders above ₹999",
  "Order before 5 PM for same-day delivery",
  "Use code BLOOM20 to get 20% off",
];

/* ════════════════════════════════════════════════════════════
   NAVBAR — auto-switches between glass (home) and white style
   ════════════════════════════════════════════════════════════ */
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  const isHome = location.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSugg, setShowSugg] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Live search
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSugg(false);
      return;
    }
    setSuggestions(searchProducts(query).slice(0, 6));
    setShowSugg(true);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      const inDesktop = desktopSearchRef.current?.contains(e.target);
      const inMobile = mobileSearchRef.current?.contains(e.target);
      if (!inDesktop && !inMobile) setShowSugg(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Announcement rotation
  useEffect(() => {
    const t = setInterval(
      () => setAnnouncementIndex((i) => (i + 1) % announcementItems.length),
      3200,
    );
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/flowers?search=${encodeURIComponent(query)}`);
      setQuery("");
      setShowSugg(false);
    }
  };
  const handleSuggClick = (p) => {
    navigate(`/product/${p.id}`);
    setQuery("");
    setShowSugg(false);
    setMenuOpen(false);
  };

  /* ── Close menu on route change ── */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* ════════════════════════════════════════════════════════
     HOME PAGE → floating liquid-glass pill navbar
     (sits over the dark cinematic hero video)
     ════════════════════════════════════════════════════════ */
  if (isHome) {
    return (
      <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 lg:px-16">
        {/* Main pill */}
        <div className="flex items-center justify-between liquid-glass rounded-full px-3 py-2 gap-2">
          {/* Logo */}
          {/*<Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Studio" className="h-9 w-9 object-contain rounded-full" />
          </Link> */}
          <div className="flex flex-col items-center">
            <span className="font-serif-display text-2xl md:text-3xl font-light tracking-[0.2em] text-white leading-none">
              Flora
            </span>

            <span className="text-[9px] tracking-[0.4em] text-[#c9a87c] uppercase font-medium mt-1">
              & Bloom
            </span>
          </div>

          {/* Center nav links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {shopNavLinks.map(({ label, href }) => {
              const active = location.pathname === href;
              return (
                <Link
                  key={label}
                  to={href}
                  className={`px-3 py-1.5 text-sm font-body font-medium rounded-full transition-colors duration-200
                    ${active ? "text-white bg-white/15" : "text-white/75 hover:text-white hover:bg-white/10"}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right icons + CTA */}
          <div className="flex items-center gap-1.5">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <Heart size={17} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white text-black text-[8px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="hidden md:flex p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <User size={17} />
            </Link>

            {/* Get Started CTA */}
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-1.5 bg-white text-black rounded-full px-3.5 py-1.5 text-xs font-body font-semibold hover:bg-white/90 transition-all hover:scale-105"
            >
              Get Started <ArrowUpRight size={13} />
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-white rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="lg:hidden mt-2 liquid-glass rounded-2xl overflow-hidden">
            <div className="p-4 space-y-0.5">
              {shopNavLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm font-body font-medium py-2.5 px-3 rounded-xl transition-colors
                    ${location.pathname === href ? "text-white bg-white/15" : "text-white/80 hover:text-white hover:bg-white/10"}`}
                >
                  {label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-3 px-1 border-t border-white/10 mt-2">
                <Link to="/wishlist" className="text-white/80 hover:text-white">
                  <Heart size={18} />
                </Link>
                <Link to="/cart" className="text-white/80 hover:text-white">
                  <ShoppingBag size={18} />
                </Link>
                <Link to="/profile" className="text-white/80 hover:text-white">
                  <User size={18} />
                </Link>
                <Link
                  to="/contact"
                  className="ml-auto flex items-center gap-1 bg-white text-black rounded-full px-3 py-1.5 text-xs font-semibold"
                >
                  Get Started <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }

  /* ════════════════════════════════════════════════════════
     ALL OTHER PAGES → classic white header with full navbar
     ════════════════════════════════════════════════════════ */
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        {/* Announcement bar */}
        {/* <div className="bg-[#111] px-3 py-2">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white md:text-xs">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#c9a87c]/20 text-[#e9cfa9]">
              <Megaphone size={11} />
            </span>
            <span className="text-[#e9cfa9]">Live update:</span>
            <span key={announcementIndex} className="text-white transition-opacity duration-500">
              {announcementItems[announcementIndex]}
            </span>
          </div>
        </div> */}

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-3 h-16 md:h-[68px]">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              {!imgError ? (
                <img
                  src={logo}
                  alt="Flora & Bloom"
                  className="h-14 w-auto object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center">
                  <span className="font-serif-display text-2xl md:text-3xl font-light tracking-[0.15em] text-[#1a1a1a] leading-none">
                    Flora
                  </span>
                  <span className="text-[9px] tracking-[0.35em] text-[#c9a87c] uppercase font-medium">
                    & Bloom
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop search */}
            <div className="hidden md:flex flex-1 items-center gap-2 max-w-2xl mx-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200 whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17h6M5 12h14M7 7h10M3 17h.01M21 17h.01"
                  />
                </svg>
                <span className="text-xs font-medium text-green-700">
                  Same-day delivery
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                </svg>
                <span className="text-xs font-medium text-green-700">
                  Fresh flowers guarantee
                </span>
              </div>
              {/* Search */}
              <div className="flex-1 relative" ref={desktopSearchRef}>
                <form onSubmit={handleSearch}>
                  <Search
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowSugg(true)}
                    type="text"
                    placeholder="Search flowers, occasions, gifts…"
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all bg-gray-50 hover:bg-white"
                  />
                </form>
                {showSugg && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    {suggestions.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSuggClick(p)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fdf8f0] transition-colors text-left border-b border-gray-50 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={p.images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {p.category} · {p.tag}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-[#c9a87c] flex-shrink-0">
                          ₹{p.price.toLocaleString()}
                        </p>
                      </button>
                    ))}
                    <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                      <button
                        onClick={handleSearch}
                        className="text-xs text-[#c9a87c] font-semibold hover:underline"
                      >
                        View all results for "{query}" →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-5">
              {shopNavLinks.map(({ label, href }) => {
                const active = location.pathname === href;
                return (
                  <Link
                    key={label}
                    to={href}
                    className={`text-sm font-medium tracking-wide relative group transition-colors
                      ${active ? "text-[#c9a87c]" : "text-gray-700 hover:text-[#c9a87c]"}`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-[#c9a87c] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <Link
                to="/wishlist"
                className="p-2 text-gray-700 hover:text-[#c9a87c] transition-colors relative"
              >
                <Heart size={19} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a87c] text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="p-2 text-gray-700 hover:text-[#c9a87c] transition-colors relative"
              >
                <ShoppingBag size={19} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1a1a1a] text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className="hidden md:block p-2 text-gray-700 hover:text-[#c9a87c] transition-colors"
              >
                <User size={19} />
              </Link>
              <button
                className="md:hidden p-2 text-gray-700"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3" ref={mobileSearchRef}>
            <div className="relative">
              <form onSubmit={handleSearch}>
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSugg(true)}
                  placeholder="Search flowers…"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#c9a87c] bg-gray-50"
                />
              </form>
              {showSugg && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSuggClick(p)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fdf8f0] text-left border-b border-gray-50 last:border-0"
                    >
                      <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {p.category}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-[#c9a87c]">
                        ₹{p.price.toLocaleString()}
                      </p>
                    </button>
                  ))}
                  <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={handleSearch}
                      className="text-xs text-[#c9a87c] font-semibold hover:underline"
                    >
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
            {shopNavLinks.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-gray-700 py-2.5 border-b border-gray-50 hover:text-[#c9a87c] transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-2.5 border-b border-gray-50 hover:text-[#c9a87c]"
            >
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-2.5 hover:text-[#c9a87c]"
            >
              My Account
            </Link>
          </div>
        )}
      </header>
      {/* Spacer so page content doesn't hide under the fixed header */}
      <div className="h-[156px] md:h-[117px]" />
    </>
  );
};

export default Navbar;
