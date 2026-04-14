import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Star, Gift } from "lucide-react";
import { addToCart } from "../../utils/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "../../utils/wishlistSlice";
import { products } from "../../data/products";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";

/* Pull gifts from master product data */
const gifts = products.filter(p => p.category === "Gifts");

const GiftCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWished = useSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id, name: product.name, price: product.price,
      image: product.images[0], size: product.sizes[0]?.label || "Standard", qty: 1,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist({
      id: product.id, name: product.name, price: product.price,
      image: product.images[0], category: product.category,
    }));
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer group"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img src={product.images[0]} alt={product.name} loading="lazy" className="card-img w-full h-full object-cover" />

        {/* Wishlist */}
        <button
          onClick={handleWish}
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

      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Gift size={12} className="text-[#c9a87c]" />
          <p className="text-[10px] text-[#c9a87c] font-bold tracking-wide uppercase">{product.occasions[0]}</p>
        </div>
        <h3 className="font-serif-display text-base font-medium text-gray-800 mb-1.5 leading-snug">{product.name}</h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={10} className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
          ))}
          <span className="text-[10px] text-gray-400 ml-0.5">({product.reviews.toLocaleString()})</span>
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

const GiftsPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />
    <div className="relative h-48 md:h-64 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=1400&q=80&auto=format" alt="Gifts" className="w-full h-full object-cover scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/20 flex flex-col items-start justify-center px-8 md:px-16">
        <p className="text-[#c9a87c] text-xs tracking-[0.4em] uppercase font-bold mb-2">Curated For You</p>
        <h1 className="font-serif-display text-4xl md:text-5xl font-light text-white mb-2">Gift Hampers</h1>
        <p className="text-white/70 text-sm">Curated gift sets for every special occasion</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gifts.map(p => <GiftCard key={p.id} product={p} />)}
      </div>
    </div>
    <FlowerFooter />
  </div>
);

export default GiftsPage;
