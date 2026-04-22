import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { addToCart } from "../../features/cart/cartSlice";
import {
  toggleWishlist,
  selectIsWishlisted,
} from "../../features/user/wishlistSlice";

const ProductCard = ({ product }) => {
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
        size: "Medium",
        qty: 1,
      }),
    );
    setAdded(true);
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
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* ── Image ── */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={13}
            className={isWished ? "fill-red-400 text-red-400" : "text-gray-400"}
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-sm bg-[#1a1a1a] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white">
            {product.badge}
          </span>
        )}

        {/* Discount pill */}
        <span className="absolute bottom-3 left-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white">
          {discount}% OFF
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-3.5">
        {/* Tag */}
        <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#c9a87c]">
          {product.tag}
        </p>

        {/* Name */}
        <h3 className="mb-2 font-serif text-[15px] font-medium leading-snug text-gray-800">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="mb-3 flex items-center gap-1.5">
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
          <span className="text-[11px] font-semibold text-gray-600">
            {product.rating}
          </span>
          <span className="text-[11px] text-gray-400">
            ({product.reviews?.toLocaleString()})
          </span>
        </div>

        {/* Price + Add to cart */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="ml-2 text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all duration-200
              ${
                added
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-[#c9a87c] text-[#c9a87c] hover:bg-[#c9a87c] hover:text-white"
              }`}
          >
            <ShoppingCart size={10} />
            {added ? "✓ Added" : "ADD"}
          </button>
        </div>
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#c9a87c] to-amber-300 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default ProductCard;
