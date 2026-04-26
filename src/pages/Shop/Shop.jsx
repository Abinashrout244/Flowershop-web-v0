import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

import {
  Heart,
  Star,
  ShoppingCart,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Check,
  Sparkles,
} from "lucide-react";
import { products } from "../../data/flowers";

import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";
import ShopCard from "./ShopCard";
import {
  COLLECTIONS,
  FLOWER_ONLY_IMAGES,
  SORT_OPTIONS,
  OCCASIONS,
  COLLECTION_IMAGES,
  HERO_SLIDES,
} from "./ShopInfo";
import HeroBanner from "./HeroBanner";
import PromoBanner from "./PromoBanner";

const getFlowerImageForProduct = (product) => {
  const categoryPool =
    FLOWER_ONLY_IMAGES[product.category] || FLOWER_ONLY_IMAGES.default;
  const fallbackPool = FLOWER_ONLY_IMAGES.default;
  return categoryPool[product.id % categoryPool.length] || fallbackPool[0];
};

/* ── Toast Component ─────────────────────────────────────────── */
const Toast = ({ show, name }) => (
  <div
    className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 
    bg-[#1a1a1a] text-white text-sm font-medium px-5 py-3 rounded-full shadow-2xl
    transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
  >
    <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
      <Check size={11} className="text-white" />
    </span>
    <span>
      <span className="text-[#c9a87c]">{name}</span> added to cart
    </span>
  </div>
);

/* ── Main Shop Page ──────────────────────────────────────────── */
const ShopPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [activeCollection, setActiveCollection] = useState("All");
  const [activeOccasion, setActiveOccasion] = useState("All Occasions");
  const [sort, setSort] = useState("popular");
  const [showSort, setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState(params.get("search") || "");
  const [toast, setToast] = useState({ show: false, name: "" });
  const [heroIndex, setHeroIndex] = useState(0);
  const sortRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const categoryFromURL = params.get("category");
    const occasionFromURL = params.get("occasion");

    if (categoryFromURL) {
      setActiveCollection(categoryFromURL);
    } else {
      setActiveCollection("All");
    }

    if (occasionFromURL) {
      setActiveOccasion(occasionFromURL);
    } else {
      setActiveOccasion("All Occasions");
    }
  }, [location.search]);

  /* Close sort dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target))
        setShowSort(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [heroIndex]);

  const showToast = (name) => {
    setToast({ show: true, name });
    setTimeout(() => setToast({ show: false, name: "" }), 2500);
  };

  /* ── Filter logic ── */
  let filtered =
    activeCollection === "All"
      ? products
      : products.filter((p) => p.category === activeCollection);

  if (activeOccasion !== "All Occasions") {
    filtered = filtered.filter((p) =>
      p.occasions.some((o) =>
        o.toLowerCase().includes(activeOccasion.toLowerCase()),
      ),
    );
  }

  if (searchQuery.trim()) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.occasions.some((o) =>
          o.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }

  /* ── Sort logic ── */
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "new") return b.id - a.id;
    return b.reviews - a.reviews; // popular
  });

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* Toast */}
      <Toast show={toast.show} name={toast.name} />

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#c9a87c] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 font-medium">Shop</span>
          {activeCollection !== "All" && (
            <>
              <ChevronRight size={12} />
              <span className="text-[#c9a87c] font-semibold">
                {activeCollection}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── Hero Banner ────────────────────────────────────────── */}
      <HeroBanner
        activeCollection={activeCollection}
        sorted={sorted}
        heroIndex={heroIndex}
        setHeroIndex={setHeroIndex}
      />
      {/* ── Collections Bar ────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="flex gap-1 overflow-x-auto scrollbar-hide py-2"
            style={{ scrollbarWidth: "none" }}
          >
            {COLLECTIONS.map((col) => (
              <button
                key={col.id}
                onClick={() => {
                  setActiveCollection(col.id);
                  setActiveOccasion("All Occasions");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold 
                whitespace-nowrap transition-all duration-200 flex-shrink-0
                ${
                  activeCollection === col.id
                    ? "bg-[#c9a87c] text-white shadow-md"
                    : "text-gray-600 hover:bg-[#fdf7ee] hover:text-[#c9a87c]"
                }`}
              >
                <span className="text-sm">{col.icon}</span>
                {col.label}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold
                  ${activeCollection === col.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}
                >
                  {col.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search bar */}
        <div className="relative mb-6 max-w-lg">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, flowers, occasions…"
            className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-200 bg-white
            text-sm focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
            >
              <X size={14} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Occasion chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {OCCASIONS.map((occ) => (
            <button
              key={occ}
              onClick={() => setActiveOccasion(occ)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all
              ${
                activeOccasion === occ
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>

        {/* Sort row */}
        <div className="flex items-center justify-between mb-6">
          {/* Header Left Info */}
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">{sorted.length}</span>{" "}
            products
            {activeCollection !== "All" && (
              <>
                in
                <span className="text-[#c9a87c] font-semibold">
                  {activeCollection}
                </span>
              </>
            )}
          </p>
          {/* Header Right Info */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 text-sm text-gray-600 bg-white border 
              border-gray-200 px-4 py-2 rounded-full hover:border-[#c9a87c] transition-colors"
            >
              <SlidersHorizontal size={14} />
              {SORT_OPTIONS.find((s) => s.value === sort)?.label}
              <ChevronRight
                size={13}
                className={`transition-transform duration-200 ${showSort ? "rotate-90" : ""}`}
              />
            </button>
            {showSort && (
              <div
                className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl 
              border border-gray-100 z-30 min-w-[200px] overflow-hidden"
              >
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setShowSort(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm transition-colors border-b 
                    border-gray-50 last:border-0
                    ${
                      sort === opt.value
                        ? "bg-[#fdf8f0] text-[#c9a87c] font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {opt.value === sort && (
                      <span className="mr-2 text-[#c9a87c]">✓</span>
                    )}
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Product Grid or Empty State ─── */}
        {sorted.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="font-serif-display text-3xl font-light text-gray-400 mb-3">
              No products found
            </h3>
            <p className="text-gray-400 text-sm mb-8">
              Try adjusting your filters or search term
            </p>
            <button
              onClick={() => {
                setActiveCollection("All");
                setActiveOccasion("All Occasions");
                setSearchQuery("");
              }}
              className="px-8 py-3.5 bg-[#c9a87c] text-white text-sm font-bold rounded-full 
              hover:bg-[#b8966b] transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {sorted.map((p) => (
              <ShopCard
                key={p.id}
                product={p}
                onAddToCart={showToast}
                FLOWER_ONLY_IMAGES={FLOWER_ONLY_IMAGES}
                getFlowerImageForProduct={getFlowerImageForProduct}
              />
            ))}
          </div>
        )}

        {/* ── Promo Banner ──────────────────────────────────────── */}
        {sorted.length > 0 && <PromoBanner />}
      </div>

      <FlowerFooter />
    </div>
  );
};

export default ShopPage;
