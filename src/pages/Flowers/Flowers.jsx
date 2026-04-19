import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Star, ShoppingCart, SlidersHorizontal, ChevronRight } from "lucide-react";
import { products, categories, getProductsByCategory } from "../../data/flowers";
import { addToCart } from "../../features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "../../features/user/wishlistSlice";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
  { label: "Best Rated", value: "rating" },
];

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWished = useSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id, name: product.name, price: product.price,
      image: product.images[0], size: "Medium", qty: 1,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer group"
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img src={product.images[0]} alt={product.name} loading="lazy" className="card-img w-full h-full object-cover" />

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); dispatch(toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.images[0], category: product.category })); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10"
        >
          <Heart size={13} className={isWished ? "fill-red-400 text-red-400" : "text-gray-400"} />
        </button>

        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[9px] font-bold px-2.5 py-1 rounded-sm tracking-widest uppercase">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
          {discount}% OFF
        </span>
      </div>

      <div className="p-3.5">
        <p className="text-[9px] text-[#c9a87c] font-bold tracking-[0.25em] uppercase mb-1">{product.tag}</p>
        <h3 className="font-serif-display text-[15px] font-medium text-gray-800 leading-snug mb-2">{product.name}</h3>

        <div className="flex items-center gap-1.5 mb-3">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={10} className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
          ))}
          <span className="text-[11px] font-semibold text-gray-600">{product.rating}</span>
          <span className="text-[11px] text-gray-400">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-gray-400 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all
              ${added ? "bg-emerald-500 border-emerald-500 text-white" : "text-[#c9a87c] border-[#c9a87c] hover:bg-[#c9a87c] hover:text-white"}`}
          >
            <ShoppingCart size={10} />
            {added ? "✓" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};

const FlowersPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [showSort, setShowSort] = useState(false);

  let filtered = getProductsByCategory(activeCategory);
  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.occasions.some(o => o.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const currentSort = sortOptions.find(s => s.value === sort);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">Fresh Flowers</span>
        </div>
      </div>

      {/* Page hero */}
      <div className="relative h-48 md:h-64 overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1400&q=80&auto=format"
          alt="Flowers"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/20 flex flex-col items-start justify-center px-8 md:px-16">
          <p className="text-[#c9a87c] text-xs tracking-[0.4em] uppercase font-bold mb-2">Farm Fresh</p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-light text-white mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : "Fresh Flowers"}
          </h1>
          <p className="text-white/70 text-sm">Handpicked blooms · Delivered same day</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Filters row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all
                  ${activeCategory === c
                    ? "bg-[#c9a87c] text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#c9a87c] hover:text-[#c9a87c]"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-full hover:border-[#c9a87c] transition-colors bg-white"
            >
              <SlidersHorizontal size={14} />
              {currentSort?.label}
              <ChevronRight size={13} className={`transition-transform ${showSort ? "rotate-90" : ""}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 min-w-[180px] overflow-hidden">
                {sortOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-gray-50 last:border-0
                      ${sort === opt.value ? "bg-[#fdf8f0] text-[#c9a87c] font-bold" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-5">
          Showing <span className="font-semibold text-gray-700">{sorted.length}</span> results
          {activeCategory !== "All" && <> in <span className="font-semibold text-[#c9a87c]">{activeCategory}</span></>}
        </p>

        {/* Product grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif-display text-3xl font-light text-gray-400 mb-3">No flowers found</p>
            <p className="text-gray-400 text-sm mb-6">Try a different category or search term</p>
            <button onClick={() => setActiveCategory("All")} className="px-8 py-3 bg-[#c9a87c] text-white text-sm font-bold rounded-full hover:bg-[#b8966b] transition-colors">
              View All Flowers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {sorted.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      <FlowerFooter />
    </div>
  );
};

export default FlowersPage;


