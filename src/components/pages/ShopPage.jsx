import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Heart, Star, ShoppingCart, SlidersHorizontal,
  ChevronRight, ChevronLeft, Search, X, Check, Sparkles,
} from "lucide-react";
import { products } from "../../Data/products";
import { addToCart } from "../../utils/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "../../utils/wishlistSlice";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";

/* ── Collection data ─────────────────────────────────────────── */
const COLLECTIONS = [
  { id: "All",       label: "All Products",   icon: "🌸", count: products.length },
  { id: "Roses",     label: "Roses",          icon: "🌹", count: products.filter(p => p.category === "Roses").length },
  { id: "Sunflowers",label: "Sunflowers",     icon: "🌻", count: products.filter(p => p.category === "Sunflowers").length },
  { id: "Lilies",    label: "Lilies",         icon: "💐", count: products.filter(p => p.category === "Lilies").length },
  { id: "Orchids",   label: "Orchids",        icon: "🌺", count: products.filter(p => p.category === "Orchids").length },
  { id: "Tulips",    label: "Tulips",         icon: "🌷", count: products.filter(p => p.category === "Tulips").length },
  { id: "Mixed",     label: "Mixed Bouquets", icon: "💮", count: products.filter(p => p.category === "Mixed").length },
  { id: "Gifts",     label: "Gift Hampers",   icon: "🎁", count: products.filter(p => p.category === "Gifts").length },
  { id: "Plants",    label: "Plants",         icon: "🪴", count: products.filter(p => p.category === "Plants").length },
  { id: "Seasonal",  label: "Seasonal",       icon: "✨", count: products.filter(p => p.category === "Seasonal").length },
  { id: "Tropical",  label: "Tropical",       icon: "🌴", count: products.filter(p => p.category === "Tropical").length },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "asc",     label: "Price: Low to High" },
  { value: "desc",    label: "Price: High to Low" },
  { value: "rating",  label: "Best Rated" },
  { value: "new",     label: "Newest First" },
];

const OCCASIONS = [
  "All Occasions", "Birthday", "Anniversary", "Wedding", "Valentine's Day",
  "Get Well Soon", "Sympathy", "Congratulations", "Housewarming", "Corporate Gift",
];

/* ── Collection hero images ─────────────────────────────────── */
const COLLECTION_IMAGES = {
  All:        "https://images.unsplash.com/photo-1490750967868-88cb44cb271b?w=1600&q=85",
  Roses:      "https://images.unsplash.com/photo-1490750967868-88cb44cb271b?w=1600&q=85",
  Sunflowers: "https://images.unsplash.com/photo-1464965257414-d44b44754a4f?w=1600&q=85",
  Lilies:     "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1600&q=85",
  Orchids:    "https://images.unsplash.com/photo-1533616688419-b3a58eeb09b8?w=1600&q=85",
  Tulips:     "https://images.unsplash.com/photo-1554631221-f9603e6808be?w=1600&q=85",
  Mixed:      "https://images.unsplash.com/photo-1457089328109-e5d9f56adce9?w=1600&q=85",
  Gifts:      "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=1600&q=85",
  Plants:     "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1600&q=85",
  Seasonal:   "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=1600&q=85",
  Tropical:   "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?w=1600&q=85",
};

const HERO_SLIDES = [
  {
    image: "https://plus.unsplash.com/premium_photo-1661721878167-16f464003c99?w=1800&q=90",
    eyebrow: "Signature Curation",
    title: "Luxury Florals For Every Grand Gesture",
    subtitle: "Hand-composed stems, wrapped with artisan finesse and delivered with white-glove care.",
  },
  {
    image: "https://images.unsplash.com/photo-1613052271194-5427710fb39d?w=1800&q=90",
    eyebrow: "Seasonal Prestige",
    title: "Rare Blooms, Timeless Elegance",
    subtitle: "Discover premium arrangements sourced from celebrated farms and curated by master florists.",
  },
  {
    image: "https://images.unsplash.com/photo-1696420123748-d1e194b7d50b?w=1800&q=90",
    eyebrow: "Bespoke Experience",
    title: "Elevate Celebrations With Couture Bouquets",
    subtitle: "From intimate dinners to lavish soirées, find statement florals that define the moment.",
  },
  {
    image: "https://images.unsplash.com/photo-1737975476425-e99004ff029c?w=1800&q=90",
    eyebrow: "Fresh Arrivals",
    title: "Handpicked Blooms From Global Farms",
    subtitle: "Every stem is selected at peak freshness for unmatched beauty and longevity.",
  },
];

const FLOWER_ONLY_IMAGES = {
  default: [
    "https://images.unsplash.com/photo-1490750967868-88cb44cb271b?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1457089328109-e5d9f56adce9?w=1200&q=85&auto=format",
  ],

  Roses: [
    "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=1200&q=85&auto=format",
  ],

  Sunflowers: [
    "https://images.unsplash.com/photo-1548291616-bfccc8db731d?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1542801204-141ec23989d7?w=1200&q=85&auto=format",
  ],

  Lilies: [
    "https://images.unsplash.com/photo-1580595999172-787970a962d8?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1486102515046-44130769cb25?w=1200&q=85&auto=format",
  ],

  Orchids: [
    "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=1200&q=85&auto=format",
  ],

  Tulips: [
    "https://images.unsplash.com/photo-1587316830148-c9b01df2da38?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?w=1200&q=85&auto=format",
  ],

  Mixed: [
    `https://images.unsplash.com/photo-1597583995844-edce63cc1cb0?w=800&q=85&auto=format`,
    `https://images.unsplash.com/photo-1595886535782-0f757640a574?w=800&q=85&auto=format`,
    `https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?w=800&q=85&auto=format`,
   
  ],

  Gifts: [
    "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1200&q=85&auto=format",
  ],

  Plants: [
    "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1671166739837-b175ef95cb48?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1709716341475-323bdcbeb637?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1644585951614-0c2b3a7bbe9b?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1644585949224-cbe48d2cc2d6?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1684912950515-926f6dd5d5c7?w=1200&q=85&auto=format",
  ],

  Seasonal: [
    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1602934585418-f588bea4215c?w=1200&q=85&auto=format",
  ],

  Tropical: [
    "https://images.unsplash.com/photo-1688481156464-4285423c8b39?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1603025322900-fcaaff571e12?w=1200&q=85&auto=format",
  ],
};

const getFlowerImageForProduct = (product) => {
  const categoryPool = FLOWER_ONLY_IMAGES[product.category] || FLOWER_ONLY_IMAGES.default;
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
    <span><span className="text-[#c9a87c]">{name}</span> added to cart</span>
  </div>
);

/* ── Product Card ────────────────────────────────────────────── */
const ShopCard = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWished = useSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id, name: product.name, price: product.price,
      image: product.images[0], size: product.sizes[0]?.label || "Medium", qty: 1,
    }));
    setAdded(true);
    onAddToCart(product.name);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist({
      id: product.id, name: product.name, price: product.price,
      image: product.images[0], category: product.category,
    }));
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 
      shadow-sm cursor-pointer group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={getFlowerImageForProduct(product)}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FLOWER_ONLY_IMAGES.default[0]; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors" />

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full
          flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10"
        >
          <Heart
            size={14}
            className={isWished ? "fill-red-400 text-red-400" : "text-gray-400 group-hover:text-gray-600"}
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[9px] font-bold 
          px-2.5 py-1 rounded-sm tracking-widest uppercase">
            {product.badge}
          </span>
        )}

        {/* Discount chip */}
        <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[9px] font-bold 
        px-2.5 py-1 rounded-full">
          {discount}% OFF
        </span>

        {/* Delivery badge */}
        <span className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-gray-600
        text-[8px] font-semibold px-2 py-0.5 rounded-full">
          {product.tag}
        </span>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-[9px] text-[#c9a87c] font-bold tracking-[0.25em] uppercase mb-1">
          {product.category}
        </p>
        <h3 className="text-[14px] font-medium text-gray-800 leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={10}
              className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
            />
          ))}
          <span className="text-[10px] font-semibold text-gray-600 ml-0.5">{product.rating}</span>
          <span className="text-[10px] text-gray-400">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-gray-400 line-through ml-1.5">₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-all duration-300
              ${added
                ? "bg-emerald-500 border-emerald-500 text-white scale-95"
                : "text-[#c9a87c] border-[#c9a87c] hover:bg-[#c9a87c] hover:text-white"}`}
          >
            {added ? <Check size={10} /> : <ShoppingCart size={10} />}
            {added ? "Added!" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Shop Page ──────────────────────────────────────────── */
const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      if (sortRef.current && !sortRef.current.contains(e.target)) setShowSort(false);
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
  let filtered = activeCollection === "All"
    ? products
    : products.filter(p => p.category === activeCollection);

  if (activeOccasion !== "All Occasions") {
    filtered = filtered.filter(p =>
      p.occasions.some(o => o.toLowerCase().includes(activeOccasion.toLowerCase()))
    );
  }

  if (searchQuery.trim()) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.occasions.some(o => o.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  /* ── Sort logic ── */
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "asc")    return a.price - b.price;
    if (sort === "desc")   return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "new")    return b.id - a.id;
    return b.reviews - a.reviews; // popular
  });

  const currentCollection = COLLECTIONS.find(c => c.id === activeCollection);
  const activeSlide = HERO_SLIDES[heroIndex];
  const collectionHeroImg = COLLECTION_IMAGES[activeCollection] || COLLECTION_IMAGES["All"];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* Toast */}
      <Toast show={toast.show} name={toast.name} />

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#c9a87c] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 font-medium">Shop</span>
          {activeCollection !== "All" && (
            <>
              <ChevronRight size={12} />
              <span className="text-[#c9a87c] font-semibold">{activeCollection}</span>
            </>
          )}
        </div>
      </div>

      {/* ── Hero Banner ────────────────────────────────────────── */}
      <div className="relative hidden md:block md:h-[320px] lg:h-[400px] overflow-hidden">
        <img
          src={collectionHeroImg}
          alt={activeCollection}
          onError={(e) => { e.currentTarget.src = FLOWER_ONLY_IMAGES.default[1]; }}
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px] opacity-70"
          style={{ objectPosition: "center 40%" }}
        />
        <img
          src={activeSlide.image}
          alt={activeSlide.title}
          onError={(e) => { e.currentTarget.src = FLOWER_ONLY_IMAGES.default[0]; }}
          className="w-full h-full object-cover scale-[1.05] transition-all duration-1000 ease-in-out"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20 flex flex-col items-start justify-center px-8 md:px-16">
          <p className="text-[#c9a87c] text-xs tracking-[0.4em] uppercase font-bold mb-2 drop-shadow">
            {currentCollection?.icon} Flora & Bloom
          </p>
          <p className="text-[10px] md:text-xs tracking-[0.32em] uppercase text-white/80 mb-1.5">
            {activeSlide.eyebrow}
          </p>
          <h1 className="font-serif-display text-3xl md:text-5xl font-light text-white mb-2 leading-tight max-w-3xl">
            {activeSlide.title}
          </h1>
          <p className="text-white/80 text-xs md:text-sm max-w-2xl mb-3">
            {activeSlide.subtitle}
          </p>
          <p className="text-white/70 text-xs md:text-sm">
            {activeCollection === "All" ? "The Full Collection" : currentCollection?.label} · {sorted.length} products · Free delivery above ₹999
          </p>
        </div>
        <div className="absolute right-4 md:right-8 bottom-4 hidden md:flex items-center gap-2.5">
          <button
            onClick={() => setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="group w-10 h-10 rounded-full bg-gradient-to-br from-[#f3e3c8]/70 to-[#c9a87c]/40 border border-[#f2dfbf]/70 text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md flex items-center justify-center hover:from-[#f3e3c8]/90 hover:to-[#c9a87c]/60 hover:scale-105 transition-all duration-300"
            aria-label="Previous banner"
          >
            <ChevronLeft size={15} className="drop-shadow-sm group-hover:-translate-x-0.5 transition-transform duration-300" />
          </button>
          <button
            onClick={() => setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="group w-10 h-10 rounded-full bg-gradient-to-br from-[#f3e3c8]/70 to-[#c9a87c]/40 border border-[#f2dfbf]/70 text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md flex items-center justify-center hover:from-[#f3e3c8]/90 hover:to-[#c9a87c]/60 hover:scale-105 transition-all duration-300"
            aria-label="Next banner"
          >
            <ChevronRight size={15} className="drop-shadow-sm group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.title}
              onClick={() => setHeroIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === heroIndex ? "w-8 bg-[#c9a87c]" : "w-3 bg-white/60 hover:bg-white/80"}`}
              aria-label={`Go to banner ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Collections Bar ────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2" style={{ scrollbarWidth: "none" }}>
            {COLLECTIONS.map((col) => (
              <button
                key={col.id}
                onClick={() => { setActiveCollection(col.id); setActiveOccasion("All Occasions"); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold 
                whitespace-nowrap transition-all duration-200 flex-shrink-0
                ${activeCollection === col.id
                  ? "bg-[#c9a87c] text-white shadow-md"
                  : "text-gray-600 hover:bg-[#fdf7ee] hover:text-[#c9a87c]"}`}
              >
                <span className="text-sm">{col.icon}</span>
                {col.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold
                  ${activeCollection === col.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
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
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products, flowers, occasions…"
            className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-200 bg-white
            text-sm focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <X size={14} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Occasion chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {OCCASIONS.map(occ => (
            <button
              key={occ}
              onClick={() => setActiveOccasion(occ)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all
              ${activeOccasion === occ
                ? "bg-[#1a1a1a] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"}`}
            >
              {occ}
            </button>
          ))}
        </div>

        {/* Sort row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">{sorted.length}</span>{" "}
            products{activeCollection !== "All" && (
              <> in <span className="text-[#c9a87c] font-semibold">{activeCollection}</span></>
            )}
          </p>

          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 text-sm text-gray-600 bg-white border 
              border-gray-200 px-4 py-2 rounded-full hover:border-[#c9a87c] transition-colors"
            >
              <SlidersHorizontal size={14} />
              {SORT_OPTIONS.find(s => s.value === sort)?.label}
              <ChevronRight size={13} className={`transition-transform duration-200 ${showSort ? "rotate-90" : ""}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl 
              border border-gray-100 z-30 min-w-[200px] overflow-hidden">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                    className={`w-full text-left px-5 py-3 text-sm transition-colors border-b 
                    border-gray-50 last:border-0
                    ${sort === opt.value
                      ? "bg-[#fdf8f0] text-[#c9a87c] font-bold"
                      : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    {opt.value === sort && <span className="mr-2 text-[#c9a87c]">✓</span>}
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
              onClick={() => { setActiveCollection("All"); setActiveOccasion("All Occasions"); setSearchQuery(""); }}
              className="px-8 py-3.5 bg-[#c9a87c] text-white text-sm font-bold rounded-full 
              hover:bg-[#b8966b] transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {sorted.map(p => (
              <ShopCard key={p.id} product={p} onAddToCart={showToast} />
            ))}
          </div>
        )}

        {/* ── Promo Banner ──────────────────────────────────────── */}
        {sorted.length > 0 && (
          <div className="mt-14 relative overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=1400&q=80"
              alt="Promo"
              onError={(e) => { e.currentTarget.src = FLOWER_ONLY_IMAGES.default[2]; }}
              className="w-full h-40 md:h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-14">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[#c9a87c]" />
                <p className="text-[#c9a87c] text-xs font-bold tracking-[0.35em] uppercase">
                  Exclusive Offer
                </p>
              </div>
              <h2 className="font-serif-display text-2xl md:text-4xl font-light text-white mb-2">
                Get 20% off your first order
              </h2>
              <p className="text-white/70 text-sm mb-4">
                Use code{" "}
                <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                  BLOOM20
                </span>{" "}
                at checkout
              </p>
              <button
                onClick={() => navigate("/cart")}
                className="px-6 py-2.5 bg-white text-[#1a1a1a] text-sm font-bold rounded-full 
                hover:bg-[#c9a87c] hover:text-white transition-colors duration-300"
              >
                Shop Now →
              </button>
            </div>
          </div>
        )}
      </div>

      <FlowerFooter />
    </div>
  );
};

export default ShopPage;
