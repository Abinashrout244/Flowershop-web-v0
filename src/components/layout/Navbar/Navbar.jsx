import { useState, useRef, useEffect, use } from "react";
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
  Sun,
  Moon,
  LogIn,
} from "lucide-react";
import { selectCartCount } from "../../../features/cart/cartSlice";
import { selectWishlistCount } from "../../../features/user/wishlistSlice";
import { useProductsController } from "../../../controllers/useProductsController";
import Loader from "../../ui/Loader/Loader";
import logo from "../../../assets/images/logonew.png";
import { useTheme } from "../../../contexts/useTheme";
import MobileBottomNav from "./MobileBottomNav";

/* ─── Nav links ─── */
const shopNavLinks = [
  { label: "Flowers", href: "/flowers" },
  { label: "Plants", href: "/plants" },
  { label: "Gifts", href: "/gifts" },
  { label: "Weddings", href: "/weddings" },
  { label: "Shop", href: "/shop" },
];

/* ─── Glass tokens (Tailwind-only) ───
   relative + isolate + before:-z-10 → sheen sits behind content,
   above the blurred backdrop. */
const glassBase =
  "relative isolate backdrop-blur-2xl backdrop-saturate-150 before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:pointer-events-none before:bg-gradient-to-b";

const glassDark = `${glassBase} bg-white/[0.07] border border-white/20 before:from-white/20 before:via-white/[0.04] before:to-transparent shadow-[0_10px_40px_-8px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.06)]`;

const glassLight = `${glassBase} bg-[#fffaf2]/50 border border-white/70 before:from-white/60 before:via-white/10 before:to-[#c9a87c]/10 shadow-[0_10px_40px_-8px_rgba(122,78,40,0.28),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(201,168,124,0.25)]`;

/* frosted white bar used when scrolled / on inner pages */
const glassBar =
  "bg-white/75 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/70 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12),inset_0_-1px_0_rgba(201,168,124,0.2)]";

/* ════════════════════════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════════════════════════ */
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const { isDark, toggleTheme } = useTheme();
  const { products, loading: productsLoading } = useProductsController();

  const isHome = location.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSugg, setShowSugg] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(true);

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  /* ── Scroll listener (home only) ── */
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* ── Live search ── */
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSugg(false);
      return;
    }
    const normalizedQuery = query.toLowerCase();
    setSuggestions(
      products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(normalizedQuery) ||
            product.category.toLowerCase().includes(normalizedQuery) ||
            (product.occasions ?? []).some((occasion) =>
              occasion.toLowerCase().includes(normalizedQuery),
            ),
        )
        .slice(0, 6),
    );
    setShowSugg(true);
  }, [query, products]);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (
        !desktopSearchRef.current?.contains(e.target) &&
        !mobileSearchRef.current?.contains(e.target)
      )
        setShowSugg(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Close menu on route change ── */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      navigate(`/flowers?search=${encodeURIComponent(query)}`);
      setQuery("");
      setShowSugg(false);
    }
  };
  const handleSuggClick = (p) => {
    setQuery("");
    setShowSugg(false);
    setMenuOpen(false);
  };
  /* ── Theme toggle button ── */
  const ThemeBtn = ({ glass = false }) => {
    const cls = glass
      ? isDark
        ? "text-white/70 hover:text-white bg-white/5 hover:bg-white/15 ring-1 ring-white/15"
        : "text-[#7a4e28]/80 hover:text-[#7a4e28] bg-white/30 hover:bg-white/60 ring-1 ring-white/60"
      : "text-gray-500 hover:text-[#c9a87c] hover:bg-gray-100";
    return (
      <button
        onClick={toggleTheme}
        title={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
        className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ${cls}`}
      >
        <span className="flex items-center justify-center w-4.5 h-4.5 transition-transform duration-300 hover:scale-110">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </span>
      </button>
    );
  };

  /* ════════════════════════════════════════════════════════
     HOME PAGE — floating glass pill → frosted bar on scroll
     ════════════════════════════════════════════════════════ */
  if (isHome) {
    const iconCls = scrolled
      ? "text-gray-700 hover:text-[#c9a87c] hover:bg-white/60"
      : isDark
        ? "text-white/80 hover:text-white hover:bg-white/10"
        : "text-[#7a4e28]/80 hover:text-[#7a4e28] hover:bg-white/50";
    const linkCls = (href) => {
      const active = location.pathname === href;
      if (scrolled)
        return `px-3 py-1.5 text-sm font-body font-medium rounded-full transition-all duration-200 ${active ? "text-[#c9a87c] bg-[#c9a87c]/10 ring-1 ring-[#c9a87c]/20" : "text-gray-700 hover:text-[#c9a87c] hover:bg-white/70"}`;
      if (isDark)
        return `px-3 py-1.5 text-sm font-body font-medium rounded-full transition-all duration-200 ${active ? "text-white bg-white/15 ring-1 ring-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" : "text-white/75 hover:text-white hover:bg-white/10"}`;
      return `px-3 py-1.5 text-sm font-body font-medium rounded-full transition-all duration-200 ${active ? "text-[#7a4e28] bg-white/60 ring-1 ring-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" : "text-[#7a4e28]/80 hover:text-[#7a4e28] hover:bg-white/50"}`;
    };

    // floating pill glass
    const pillGlass = isDark ? glassDark : glassLight;
    // scrolled shop-now button
    const shopNowCls = scrolled
      ? "bg-gradient-to-b from-[#d4b68b] to-[#c9a87c] text-white shadow-[0_4px_14px_rgba(201,168,124,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] hover:from-[#c9a87c] hover:to-[#b8965f]"
      : isDark
        ? "bg-white/90 text-black shadow-[0_4px_16px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,1)] hover:bg-white"
        : "bg-gradient-to-b from-[#d4b68b] to-[#c9a87c] text-white shadow-[0_4px_14px_rgba(201,168,124,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] hover:from-[#c9a87c] hover:to-[#b8965f]";
    // cart badge in floating pill
    const cartBadgeCls = scrolled
      ? "bg-[#1a1a1a] text-white"
      : isDark
        ? "bg-white text-black"
        : "bg-[#7a4e28] text-white";
    // mobile drawer link cls
    const mobLinkCls = (href) => {
      const active = location.pathname === href;
      if (scrolled)
        return `block text-sm font-body font-medium py-2.5 px-3 rounded-xl transition-colors ${active ? "text-[#c9a87c] bg-[#c9a87c]/10" : "text-gray-700 hover:text-[#c9a87c] hover:bg-gray-50"}`;
      if (isDark)
        return `block text-sm font-body font-medium py-2.5 px-3 rounded-xl transition-colors ${active ? "text-white bg-white/15 ring-1 ring-white/20" : "text-white/80 hover:text-white hover:bg-white/10"}`;
      return `block text-sm font-body font-medium py-2.5 px-3 rounded-xl transition-colors ${active ? "text-[#7a4e28] bg-white/60 ring-1 ring-white/80" : "text-[#7a4e28]/80 hover:text-[#7a4e28] hover:bg-white/50"}`;
    };
    const mobDrawerBg = scrolled
      ? "bg-white/90 backdrop-blur-2xl border border-white/70 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.2)] rounded-2xl mx-4"
      : `${isDark ? glassDark : glassLight} rounded-2xl mx-0`;
    const mobThemeBtnCls = scrolled
      ? "border-[#c9a87c] text-[#c9a87c]"
      : isDark
        ? "border-white/30 text-white/80 bg-white/5"
        : "border-[#c9a87c]/60 text-[#7a4e28]/80 bg-white/30";

    // search input style tokens
    const searchInputCls = scrolled
      ? "bg-white/70 border-gray-200/80 text-gray-800 placeholder-gray-400 focus:border-[#c9a87c] focus:ring-[#c9a87c]/10"
      : isDark
        ? "bg-white/10 border-white/15 text-white placeholder-white/40 focus:border-white/40 focus:ring-white/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
        : "bg-white/40 border-white/70 text-[#3a1f0a] placeholder-[#7a4e28]/50 focus:border-[#c9a87c]/60 focus:ring-[#c9a87c]/10 shadow-[inset_0_1px_2px_rgba(122,78,40,0.08)]";
    const searchIconCls = scrolled
      ? "text-gray-400"
      : isDark
        ? "text-white/40"
        : "text-[#7a4e28]/40";

    return (
      <>
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? glassBar + " px-0 py-0" : "px-3 sm:px-4 md:px-8 lg:px-16 pt-3 sm:pt-4"}`}
        >
          <div
            className={`flex items-center justify-between gap-2 transition-all duration-500 ${scrolled ? "max-w-7xl mx-auto px-4 h-16 md:h-[68px]" : `${pillGlass} rounded-full max-w-7xl mx-auto px-3 sm:px-5 py-2`}`}
          >
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              {scrolled ? (
                !imgError ? (
                  <img
                    src={logo}
                    alt="Flora & Bloom"
                    className="h-12 w-auto object-contain"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <LogoText dark />
                )
              ) : (
                <LogoText dark={!isDark} />
              )}
            </Link>

            {/* Center nav links */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {shopNavLinks.map(({ label, href }) => (
                <Link key={label} to={href} className={linkCls(href)}>
                  {label}
                </Link>
              ))}
            </div>

            {/* ── Search input (desktop, between links and icons) ── */}
            <div
              className="hidden md:flex flex-shrink-0 relative"
              ref={desktopSearchRef}
            >
              <form
                onSubmit={handleSearch}
                className="relative flex items-center"
              >
                <Search
                  size={14}
                  className={`absolute left-3 pointer-events-none transition-colors ${searchIconCls}`}
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSugg(true)}
                  type="text"
                  placeholder="Search flowers…"
                  className={`pl-8 pr-3 py-1.5 text-xs rounded-full border backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:w-52 w-32 ${searchInputCls}`}
                />
              </form>
              {showSugg && (productsLoading || suggestions.length > 0) && (
                <SearchDropdown
                  suggestions={suggestions}
                  loading={productsLoading}
                  query={query}
                  onSelect={handleSuggClick}
                  onViewAll={handleSearch}
                  compact
                />
              )}
            </div>

            {/* Right icons */}
            {user ? (
              <div className="flex items-center gap-1">
                <ThemeBtn glass={!scrolled} />
                {/* Cart + Wishlist only on md+ — on mobile they're in the bottom nav */}
                <Link
                  to="/wishlist"
                  className={`relative p-2 rounded-full transition-colors hidden md:flex ${iconCls}`}
                >
                  <Heart size={17} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className={`relative p-2 rounded-full transition-colors hidden md:flex ${iconCls}`}
                >
                  <ShoppingBag size={17} />
                  {cartCount > 0 && (
                    <span
                      className={`absolute top-0.5 right-0.5 w-3.5 h-3.5 text-[8px] rounded-full flex items-center justify-center font-bold ${cartBadgeCls}`}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className={`hidden md:flex p-2 rounded-full transition-colors ${iconCls}`}
                >
                  <User size={17} />
                </Link>
                <Link
                  to="/flowers"
                  className={`hidden md:flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-body font-semibold hover:scale-105 transition-all ${shopNowCls}`}
                >
                  Shop Now <ArrowUpRight size={13} />
                </Link>
                <button
                  className={`lg:hidden p-2 rounded-full transition-colors ${iconCls}`}
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide bg-[#FAF7F2]/90 text-[#2D2A26] border border-white/80 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,1)] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <LogIn size={14} className="stroke-[2.2]" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile dropdown — category links + search + theme toggle */}
          {menuOpen && (
            <div className={`lg:hidden mt-2 max-w-7xl mx-auto ${mobDrawerBg}`}>
              <div className="p-4 space-y-0.5">
                {/* Mobile search */}
                <div className="relative mb-3" ref={mobileSearchRef}>
                  <form
                    onSubmit={(e) => {
                      handleSearch(e);
                      setMenuOpen(false);
                    }}
                  >
                    <Search
                      size={13}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() =>
                        suggestions.length > 0 && setShowSugg(true)
                      }
                      placeholder="Search flowers, gifts…"
                      className="w-full pl-9 pr-4 py-2 rounded-full border border-white/70 bg-white/70 backdrop-blur-md text-sm text-gray-800 placeholder-gray-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10"
                    />
                  </form>

                  {showSugg && (productsLoading || suggestions.length > 0) && (
                    <SearchDropdown
                      suggestions={suggestions}
                      loading={productsLoading}
                      query={query}
                      onSelect={handleSuggClick}
                      onViewAll={(e) => {
                        handleSearch(e);
                        setMenuOpen(false);
                      }}
                      compact
                    />
                  )}
                </div>

                {shopNavLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    to={href}
                    onClick={() => setMenuOpen(false)}
                    className={mobLinkCls(href)}
                  >
                    {label}
                  </Link>
                ))}
                <div
                  className={`flex items-center gap-3 pt-3 px-1 border-t mt-2 ${scrolled ? "border-gray-100" : isDark ? "border-white/10" : "border-[#c9a87c]/20"}`}
                >
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${mobThemeBtnCls}`}
                  >
                    {isDark ? <Sun size={12} /> : <Moon size={12} />}
                    {isDark ? "Light" : "Dark"}
                  </button>
                  <Link
                    to="/flowers"
                    onClick={() => setMenuOpen(false)}
                    className={`ml-auto flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${shopNowCls}`}
                  >
                    Shop Now <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
        <MobileBottomNav />
      </>
    );
  }

  /* ════════════════════════════════════════════════════════
     ALL OTHER PAGES → frosted glass header
     ════════════════════════════════════════════════════════ */
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 ${glassBar}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-3 h-16 md:h-[68px]">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              {!imgError ? (
                <img
                  src={logo}
                  alt="Flora & Bloom"
                  className="h-12 w-auto object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <LogoText dark />
              )}
            </Link>

            {/* Desktop search + badge */}
            <div className="hidden md:flex flex-1 items-center gap-2 max-w-2xl mx-4">
              <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-green-50/70 backdrop-blur-md border border-green-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] whitespace-nowrap flex-shrink-0">
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-white/70 text-sm focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all bg-white/50 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] hover:bg-white/80"
                  />
                </form>
                {showSugg && (productsLoading || suggestions.length > 0) && (
                  <SearchDropdown
                    suggestions={suggestions}
                    loading={productsLoading}
                    query={query}
                    onSelect={handleSuggClick}
                    onViewAll={handleSearch}
                  />
                )}
              </div>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-5">
              {shopNavLinks.map(({ label, href }) => {
                const active = location.pathname === href;
                return (
                  <Link
                    key={label}
                    to={href}
                    className={`text-sm font-medium tracking-wide relative group transition-colors ${active ? "text-[#c9a87c]" : "text-gray-700 hover:text-[#c9a87c]"}`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-[#c9a87c] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Icons — Cart/Wishlist/Profile hidden on mobile (use bottom nav) */}
            <div className="flex items-center gap-1">
              <Link
                to="/wishlist"
                className="hidden md:flex p-2 rounded-full text-gray-700 hover:text-[#c9a87c] hover:bg-white/70 transition-colors relative"
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
                className="hidden md:flex p-2 rounded-full text-gray-700 hover:text-[#c9a87c] hover:bg-white/70 transition-colors relative"
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
                className="hidden md:block p-2 rounded-full text-gray-700 hover:text-[#c9a87c] hover:bg-white/70 transition-colors"
              >
                <User size={19} />
              </Link>
              <button
                className="lg:hidden p-2 rounded-full text-gray-700 hover:bg-white/70"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
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
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-white/70 text-sm focus:outline-none focus:border-[#c9a87c] bg-white/60 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                />
              </form>
              {showSugg && (productsLoading || suggestions.length > 0) && (
                <SearchDropdown
                  suggestions={suggestions}
                  loading={productsLoading}
                  query={query}
                  onSelect={handleSuggClick}
                  onViewAll={handleSearch}
                  compact
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu — only category links (icons in bottom nav) */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/60 bg-white/80 px-4 py-3 space-y-0.5 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.15)]">
            {shopNavLinks.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center text-sm font-medium py-2.5 px-2 border-b border-gray-100/70 transition-colors ${location.pathname === href ? "text-[#c9a87c]" : "text-gray-700 hover:text-[#c9a87c]"}`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="flex w-full items-center gap-2 text-sm font-medium text-[#c9a87c] py-2.5 px-2 hover:opacity-80"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              Switch to {isDark ? "Light" : "Dark"} Theme
            </button>
          </div>
        )}
      </header>
      {/* Spacer: top navbar height + bottom nav height on mobile */}
      <div className="h-[116px] md:h-[68px]" />
      <MobileBottomNav />
    </>
  );
};

/* ─── Logo text ─── */
const LogoText = ({ dark }) => (
  <div className="flex flex-col items-center">
    <span
      className={`font-serif-display text-2xl md:text-3xl font-light tracking-[0.2em] leading-none ${dark ? "text-[#1a1a1a]" : "text-white"}`}
    >
      Flora
    </span>
    <span className="text-[9px] tracking-[0.4em] text-[#c9a87c] uppercase font-medium mt-1">
      &amp; Bloom
    </span>
  </div>
);

/* ─── Search dropdown ─── */
const SearchDropdown = ({
  suggestions,
  query,
  onSelect,
  onViewAll,
  compact,
  loading,
}) => (
  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-white/80 ring-1 ring-black/5 overflow-hidden z-50">
    {loading ? (
      <Loader size="sm" className="py-5" />
    ) : (
      suggestions.map((p) => (
        <Link
          key={p.id}
          to={`/product/${p.id}`}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={() => onSelect(p)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fdf8f0]/80 transition-colors text-left border-b border-gray-50 last:border-0"
        >
          <div
            className={`rounded-xl overflow-hidden flex-shrink-0 ${compact ? "w-9 h-9" : "w-10 h-10"}`}
          >
            <img
              src={p.images[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`font-medium text-gray-800 truncate ${compact ? "text-xs" : "text-sm"}`}
            >
              {p.name}
            </p>
            <p
              className={`text-gray-400 ${compact ? "text-[10px]" : "text-xs"}`}
            >
              {p.category}
              {!compact && ` · ${p.tag}`}
            </p>
          </div>
          <p
            className={`font-bold text-[#c9a87c] flex-shrink-0 ${compact ? "text-xs" : "text-sm"}`}
          >
            ₹{p.price.toLocaleString()}
          </p>
        </Link>
      ))
    )}
    <div className="px-4 py-2.5 bg-gray-50/80 border-t border-gray-100">
      <button
        onClick={onViewAll}
        className="text-xs text-[#c9a87c] font-semibold hover:underline"
      >
        View all results for &quot;{query}&quot; →
      </button>
    </div>
  </div>
);

export default Navbar;
