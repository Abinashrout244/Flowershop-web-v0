import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import {
  selectIsWishlisted,
  toggleWishlist,
} from "../../features/user/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";
const ShopCard = ({
  product,
  onAddToCart,
  getFlowerImageForProduct,
  FLOWER_ONLY_IMAGES,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWished = useSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: product.sizes[0]?.label || "Medium",
        qty: 1,
      }),
    );
    setAdded(true);
    onAddToCart(product.name);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      }),
    );
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
          onError={(e) => {
            e.currentTarget.src = FLOWER_ONLY_IMAGES.default[0];
          }}
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
            className={
              isWished
                ? "fill-red-400 text-red-400"
                : "text-gray-400 group-hover:text-gray-600"
            }
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[9px] font-bold 
          px-2.5 py-1 rounded-sm tracking-widest uppercase"
          >
            {product.badge}
          </span>
        )}

        {/* Discount chip */}
        <span
          className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[9px] font-bold 
        px-2.5 py-1 rounded-full"
        >
          {discount}% OFF
        </span>

        {/* Delivery badge */}
        <span
          className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-gray-600
        text-[8px] font-semibold px-2 py-0.5 rounded-full"
        >
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
              className={
                s <= Math.round(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
          <span className="text-[10px] font-semibold text-gray-600 ml-0.5">
            {product.rating}
          </span>
          <span className="text-[10px] text-gray-400">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 line-through ml-1.5">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-all duration-300
              ${
                added
                  ? "bg-emerald-500 border-emerald-500 text-white scale-95"
                  : "text-[#c9a87c] border-[#c9a87c] hover:bg-[#c9a87c] hover:text-white"
              }`}
          >
            {added ? <Check size={10} /> : <ShoppingCart size={10} />}
            {added ? "Added!" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
