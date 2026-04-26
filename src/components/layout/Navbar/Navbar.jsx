import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Search, Heart, ShoppingBag, User, Menu, X, ArrowUpRight, Sun, Moon,
} from "lucide-react";
import { selectCartCount } from "../../../features/cart/cartSlice";
import { selectWishlistCount } from "../../../features/user/wishlistSlice";
import { searchProducts } from "../../../data/flowers";
import logo from "../../../assets/images/logonew.png";
import { useTheme } from "../../../contexts/ThemeContext";

/* ─── Nav links ─── */
const shopNavLinks = [
  { label: "Flowers", href: "/flowers" },
  { label: "Plants", href: "/plants" },
  { label: "Gifts", href: "/gifts" },
  { label: "Weddings", href: "/weddings" },
];

/* ════════════════════════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════════════════════════ */
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const { isDark, toggleTheme } = useTheme();

  const isHome = location.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSugg, setShowSugg] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  /* ── Scroll listener (home only) ── */
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* ── Live search ── */
  useEffect(() => {
    if (query.trim().length < 2) { setSuggestions([]); setShowSugg(false); return; }
    setSuggestions(searchProducts(query).slice(0, 6));
    setShowSugg(true);
  }, [query]);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (!desktopSearchRef.current?.contains(e.target) && !mobileSearchRef.current?.contains(e.target))
        setShowSugg(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Close menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) { navigate(`/flowers?search=${encodeURIComponent(query)}`); setQuery(""); setShowSugg(false); }
  };
  const handleSuggClick = (p) => { navigate(`/product/${p.id}`); setQuery(""); setShowSugg(false); setMenuOpen(false); };

  /* ── Theme toggle button (shared across both nav variants) ── */
  const ThemeBtn = ({ glass = false }) => (
   <button
  onClick={toggleTheme}
  title={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
  className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-300
    ${
      glass
        ? "text-white/60 hover:text-white hover:bg-white/10"
        : "text-gray-500 hover:text-[#c9a87c] hover:bg-gray-100"
    }`}
>
  <span className="flex items-center justify-center w-4.5 h-4.5 transition-transform duration-300 hover:scale-110">
    {isDark ? <Sun size={16} /> : <Moon size={16} />}
  </span>
</button>
  );

  /* ════════════════════════════════════════════════════════
     HOME PAGE — floating glass pill → solid on scroll
     ════════════════════════════════════════════════════════ */
  if (isHome) {
    const iconCls = scrolled ? "text-gray-700 hover:text-[#c9a87c]" : "text-white/80 hover:text-white";
    const linkCls = (href) => {
      const active = location.pathname === href;
      if (scrolled) return `px-3 py-1.5 text-sm font-body font-medium rounded-full transition-colors duration-200 ${active ? "text-[#c9a87c] bg-[#c9a87c]/10" : "text-gray-700 hover:text-[#c9a87c] hover:bg-gray-100"}`;
      return `px-3 py-1.5 text-sm font-body font-medium rounded-full transition-colors duration-200 ${active ? "text-white bg-white/15" : "text-white/75 hover:text-white hover:bg-white/10"}`;
    };

    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "bg-white shadow-md border-b border-gray-100 px-0 py-0" : "px-4 md:px-8 lg:px-16 pt-4"}`}>
        <div className={`flex items-center justify-between gap-2 transition-all duration-400 ${scrolled ? "max-w-7xl mx-auto px-4 h-16 md:h-[68px]" : "liquid-glass rounded-full px-5 py-2"}`}>
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            {scrolled ? (!imgError ? <img src={logo} alt="Flora & Bloom" className="h-12 w-auto object-contain" onError={() => setImgError(true)} /> : <LogoText dark />) : <LogoText dark={false} />}
          </Link>

          {/* Center nav links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {shopNavLinks.map(({ label, href }) => <Link key={label} to={href} className={linkCls(href)}>{label}</Link>)}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <ThemeBtn glass={!scrolled} />

            <Link to="/wishlist" className={`relative p-2 rounded-full hover:bg-white/10 transition-colors ${iconCls}`}>
              <Heart size={17} />
              {wishlistCount > 0 && <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
            </Link>

            <Link to="/cart" className={`relative p-2 rounded-full hover:bg-white/10 transition-colors ${iconCls}`}>
              <ShoppingBag size={17} />
              {cartCount > 0 && <span className={`absolute top-0.5 right-0.5 w-3.5 h-3.5 text-[8px] rounded-full flex items-center justify-center font-bold ${scrolled ? "bg-[#1a1a1a] text-white" : "bg-white text-black"}`}>{cartCount}</span>}
            </Link>

            <Link to="/profile" className={`hidden md:flex p-2 rounded-full hover:bg-white/10 transition-colors ${iconCls}`}>
              <User size={17} />
            </Link>

            <Link to="/flowers" className={`hidden md:flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-body font-semibold hover:scale-105 transition-all ${scrolled ? "bg-[#c9a87c] text-white hover:bg-[#b8965f]" : "bg-white text-black hover:bg-white/90"}`}>
              Shop Now <ArrowUpRight size={13} />
            </Link>

            <button className={`lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors ${iconCls}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className={`lg:hidden mt-2 overflow-hidden ${scrolled ? "bg-white border border-gray-100 shadow-lg rounded-2xl mx-4" : "liquid-glass rounded-2xl mx-0"}`}>
            <div className="p-4 space-y-0.5">
              {shopNavLinks.map(({ label, href }) => (
                <Link key={label} to={href} onClick={() => setMenuOpen(false)}
                  className={`block text-sm font-body font-medium py-2.5 px-3 rounded-xl transition-colors ${location.pathname === href ? scrolled ? "text-[#c9a87c] bg-[#c9a87c]/10" : "text-white bg-white/15" : scrolled ? "text-gray-700 hover:text-[#c9a87c] hover:bg-gray-50" : "text-white/80 hover:text-white hover:bg-white/10"}`}
                >
                  {label}
                </Link>
              ))}
              <div className={`flex items-center gap-4 pt-3 px-1 border-t mt-2 ${scrolled ? "border-gray-100" : "border-white/10"}`}>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)} className={`relative ${iconCls}`}>
                  <Heart size={18} />
                  {wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
                </Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)} className={`relative ${iconCls}`}>
                  <ShoppingBag size={18} />
                  {cartCount > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#1a1a1a] text-white text-[8px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className={iconCls}><User size={18} /></Link>
                {/* Theme toggle in mobile drawer */}
                <button onClick={() => { toggleTheme(); }} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${scrolled ? "border-[#c9a87c] text-[#c9a87c]" : "border-white/30 text-white/80"}`}>
                  {isDark ? <Sun size={12} /> : <Moon size={12} />}
                  {isDark ? "Light" : "Dark"}
                </button>
                <Link to="/flowers" onClick={() => setMenuOpen(false)} className={`ml-auto flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${scrolled ? "bg-[#c9a87c] text-white" : "bg-white text-black"}`}>
                  Shop Now <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }

  /* ════════════════════════════════════════════════════════
     ALL OTHER PAGES → classic white header
     ════════════════════════════════════════════════════════ */
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-3 h-16 md:h-[68px]">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              {!imgError ? <img src={logo} alt="Flora & Bloom" className="h-12 w-auto object-contain" onError={() => setImgError(true)} /> : <LogoText dark />}
            </Link>

            {/* Desktop search + badge */}
            <div className="hidden md:flex flex-1 items-center gap-2 max-w-2xl mx-4">
              <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200 whitespace-nowrap flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17h6M5 12h14M7 7h10M3 17h.01M21 17h.01" />
                </svg>
                <span className="text-xs font-medium text-green-700">Same-day delivery</span>
              </div>
              <div className="flex-1 relative" ref={desktopSearchRef}>
                <form onSubmit={handleSearch}>
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => suggestions.length > 0 && setShowSugg(true)} type="text" placeholder="Search flowers, occasions, gifts…" className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all bg-gray-50 hover:bg-white" />
                </form>
                {showSugg && suggestions.length > 0 && <SearchDropdown suggestions={suggestions} query={query} onSelect={handleSuggClick} onViewAll={handleSearch} />}
              </div>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-5">
              {shopNavLinks.map(({ label, href }) => {
                const active = location.pathname === href;
                return (
                  <Link key={label} to={href} className={`text-sm font-medium tracking-wide relative group transition-colors ${active ? "text-[#c9a87c]" : "text-gray-700 hover:text-[#c9a87c]"}`}>
                    {label}
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-[#c9a87c] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1">
             

              <Link to="/wishlist" className="p-2 text-gray-700 hover:text-[#c9a87c] transition-colors relative">
                <Heart size={19} />
                {wishlistCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a87c] text-white text-[8px] rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className="p-2 text-gray-700 hover:text-[#c9a87c] transition-colors relative">
                <ShoppingBag size={19} />
                {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1a1a1a] text-white text-[8px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
              </Link>
              <Link to="/profile" className="hidden md:block p-2 text-gray-700 hover:text-[#c9a87c] transition-colors"><User size={19} /></Link>
              <button className="lg:hidden p-2 text-gray-700" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3" ref={mobileSearchRef}>
            <div className="relative">
              <form onSubmit={handleSearch}>
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => suggestions.length > 0 && setShowSugg(true)} placeholder="Search flowers…" className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#c9a87c] bg-gray-50" />
              </form>
              {showSugg && suggestions.length > 0 && <SearchDropdown suggestions={suggestions} query={query} onSelect={handleSuggClick} onViewAll={handleSearch} compact />}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-0.5 shadow-lg">
            {shopNavLinks.map(({ label, href }) => (
              <Link key={label} to={href} onClick={() => setMenuOpen(false)}
                className={`flex items-center text-sm font-medium py-2.5 px-2 border-b border-gray-50 transition-colors ${location.pathname === href ? "text-[#c9a87c]" : "text-gray-700 hover:text-[#c9a87c]"}`}
              >{label}</Link>
            ))}
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-700 py-2.5 px-2 border-b border-gray-50 hover:text-[#c9a87c]">
              <Heart size={16} /> Wishlist {wishlistCount > 0 && <span className="ml-auto text-xs font-bold text-rose-500">({wishlistCount})</span>}
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-700 py-2.5 px-2 border-b border-gray-50 hover:text-[#c9a87c]">
              <ShoppingBag size={16} /> Cart {cartCount > 0 && <span className="ml-auto text-xs font-bold text-gray-800">({cartCount})</span>}
            </Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-700 py-2.5 px-2 hover:text-[#c9a87c]">
              <User size={16} /> My Account
            </Link>
            {/* Theme row in mobile menu */}
            <button onClick={toggleTheme} className="flex w-full items-center gap-2 text-sm font-medium text-[#c9a87c] py-2.5 px-2 hover:opacity-80">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              Switch to {isDark ? "Light" : "Dark"} Theme
            </button>
          </div>
        )}
      </header>
      <div className="h-[116px] md:h-[68px]" />
    </>
  );
};

/* ─── Logo text ─── */
const LogoText = ({ dark }) => (
  <div className="flex flex-col items-center">
    <span className={`font-serif-display text-2xl md:text-3xl font-light tracking-[0.2em] leading-none ${dark ? "text-[#1a1a1a]" : "text-white"}`}>Flora</span>
    <span className="text-[9px] tracking-[0.4em] text-[#c9a87c] uppercase font-medium mt-1">&amp; Bloom</span>
  </div>
);

/* ─── Search dropdown ─── */
const SearchDropdown = ({ suggestions, query, onSelect, onViewAll, compact }) => (
  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
    {suggestions.map((p) => (
      <button key={p.id} onClick={() => onSelect(p)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fdf8f0] transition-colors text-left border-b border-gray-50 last:border-0">
        <div className={`rounded-xl overflow-hidden flex-shrink-0 ${compact ? "w-9 h-9" : "w-10 h-10"}`}>
          <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-gray-800 truncate ${compact ? "text-xs" : "text-sm"}`}>{p.name}</p>
          <p className={`text-gray-400 ${compact ? "text-[10px]" : "text-xs"}`}>{p.category}{!compact && ` · ${p.tag}`}</p>
        </div>
        <p className={`font-bold text-[#c9a87c] flex-shrink-0 ${compact ? "text-xs" : "text-sm"}`}>₹{p.price.toLocaleString()}</p>
      </button>
    ))}
    <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
      <button onClick={onViewAll} className="text-xs text-[#c9a87c] font-semibold hover:underline">View all results for &quot;{query}&quot; →</button>
    </div>
  </div>
);

export default Navbar;
