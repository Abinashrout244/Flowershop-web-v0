import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { addToCart } from "../../utils/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "../../utils/wishlistSlice";
import { products } from "../../Data/products";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";

/* Pull plants from master product data */
const plants = products.filter(p => p.category === "Plants");

const PlantCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWished = useSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id, name: product.name, price: product.price,
      image: product.images[0], size: product.sizes[0]?.label || "Small Pot", qty: 1,
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
      <div className="relative overflow-hidden aspect-[4/5]">
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

      <div className="p-3">
        <p className="text-[9px] text-emerald-600 font-bold tracking-[0.2em] uppercase mb-1">{product.tag}</p>
        <h3 className="font-serif-display text-sm font-medium text-gray-800 mb-1 leading-snug">{product.name}</h3>
        
        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={9} className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
          ))}
          <span className="text-[10px] text-gray-400 ml-0.5">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-sm font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-[11px] text-gray-400 line-through ml-1.5">₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-full border transition-all
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

const PlantsPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />
    <div className="relative h-48 md:h-64 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&q=80&auto=format" alt="Plants" className="w-full h-full object-cover scale-105" />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <p className="text-emerald-400 text-xs tracking-[0.4em] uppercase font-bold mb-2">Nature Indoors</p>
        <h1 className="font-serif-display text-4xl md:text-5xl font-light text-white mb-2">Potted Plants</h1>
        <p className="text-white/70 text-sm">Bring nature indoors with our curated plant collection</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {plants.map(p => <PlantCard key={p.id} product={p} />)}
      </div>
    </div>
    <FlowerFooter />
  </div>
);

export default PlantsPage;
