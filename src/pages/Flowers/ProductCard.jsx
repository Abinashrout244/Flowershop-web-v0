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
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 sm:right-3 sm:top-3 sm:h-8 sm:w-8"
        >
          <Heart
            size={12}
            className={isWished ? "fill-red-400 text-red-400" : "text-gray-400"}
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-sm bg-[#1a1a1a] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px] sm:tracking-widest">
            {product.badge}
          </span>
        )}

        {/* Discount pill */}
        <span className="absolute bottom-2 left-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[8px] font-bold text-white sm:bottom-3 sm:left-3 sm:text-[9px]">
          {discount}% OFF
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3.5">
        {/* Tag */}
        <p className="mb-0.5 truncate text-[8px] font-bold uppercase tracking-[0.18em] text-[#c9a87c] sm:mb-1 sm:text-[9px] sm:tracking-[0.25em]">
          {product.tag}
        </p>

        {/* Name */}
        <h3 className="mb-1.5 line-clamp-2 font-serif text-[13px] font-medium leading-tight text-gray-800 sm:mb-2 sm:text-[15px] sm:leading-snug">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="mb-2 flex items-center gap-0.5 sm:mb-3 sm:gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={9}
              className={
                s <= Math.round(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
          <span className="ml-0.5 text-[10px] font-semibold text-gray-600 sm:ml-0 sm:text-[11px]">
            {product.rating}
          </span>
          <span className="truncate text-[10px] text-gray-400 sm:text-[11px]">
            ({product.reviews?.toLocaleString()})
          </span>
        </div>

        {/* Price + Add to cart */}
        <div className="mt-auto flex items-center justify-between gap-1.5">
          <div className="flex min-w-0 flex-col leading-tight sm:block">
            <span className="text-[14px] font-bold text-gray-900 sm:text-base">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-[10px] text-gray-400 line-through sm:ml-2 sm:text-xs">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`flex shrink-0 items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all duration-200 sm:px-3 sm:py-1.5 sm:text-[11px]
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
