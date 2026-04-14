import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { addToCart } from "../../utils/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "../../utils/wishlistSlice";
import "swiper/css";
import "swiper/css/navigation";

/* ── All Unsplash flower photos verified ─────────────────── */
const products = [
  {
    id: 1,
    name: "Eternal Rose Bouquet",
    price: 1299, originalPrice: 1799,
    rating: 4.8, reviews: 2341,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1586082207282-3dcb61d25ebd?w=600&q=85&auto=format",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Sunflower Bliss Bunch",
    price: 799, originalPrice: 1099,
    rating: 4.7, reviews: 1856,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=85&auto=format",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Pink Peony Paradise",
    price: 1599, originalPrice: 2199,
    rating: 4.9, reviews: 987,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600&q=85&auto=format",
    badge: "Premium",
  },
  {
    id: 4,
    name: "Lavender Dreams",
    price: 999, originalPrice: 1399,
    rating: 4.6, reviews: 1432,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?w=600&q=85&auto=format",
    badge: null,
  },
  {
    id: 5,
    name: "Tulip Rainbow Mix",
    price: 1199, originalPrice: 1699,
    rating: 4.8, reviews: 765,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1554631221-f9603e6808be?w=600&q=85&auto=format",
    badge: "Trending",
  },
  {
    id: 6,
    name: "Red Rose Romance",
    price: 1899, originalPrice: 2499,
    rating: 4.9, reviews: 3210,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1615678790117-8b46c38435ef?w=600&q=85&auto=format",
    badge: "Best Seller",
  },
  {
    id: 7,
    name: "Orchid Elegance",
    price: 2299, originalPrice: 2999,
    rating: 4.9, reviews: 543,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1533616688419-b3a58eeb09b8?w=600&q=85&auto=format",
    badge: "Luxury",
  },
  {
    id: 8,
    name: "Daisy Garden Hamper",
    price: 899, originalPrice: 1249,
    rating: 4.5, reviews: 1102,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1457089328109-e5d9f56adce9?w=600&q=85&auto=format",
    badge: null,
  },
  {
    id: 9,
    name: "White Lily Serenity",
    price: 1349, originalPrice: 1849,
    rating: 4.7, reviews: 892,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&q=85&auto=format",
    badge: "New",
  },
  {
    id: 10,
    name: "Wildflower Meadow Bunch",
    price: 849, originalPrice: 1199,
    rating: 4.6, reviews: 1674,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=85&auto=format",
    badge: null,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <Star
        key={s}
        size={10}
        className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
      />
    ))}
  </div>
);

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWished = useSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, size: "Medium", qty: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer group"
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="card-img w-full h-full object-cover"
        />
        {/* Wishlist btn */}
        <button
          onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, category: "Mixed" })); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10"
        >
          <Heart size={13} className={isWished ? "fill-red-400 text-red-400" : "text-gray-400"} />
        </button>
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm">
            {product.badge}
          </span>
        )}
        {/* Discount */}
        <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
          {discount}% OFF
        </span>
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      <div className="p-3.5">
        <p className="text-[9px] text-[#c9a87c] font-bold tracking-[0.25em] uppercase mb-1">{product.tag}</p>
        <h3 className="font-serif-display text-[15px] font-medium text-gray-800 leading-snug mb-2">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
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
            className={`flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-colors
              ${added ? "bg-emerald-500 border-emerald-500 text-white" : "text-[#c9a87c] border-[#c9a87c] hover:bg-[#c9a87c] hover:text-white"}`}
          >
            <ShoppingCart size={11} /> {added ? "✓" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};

const BestsellingBlooms = () => {
  const navigate = useNavigate();
  return (
  <section className="py-14 md:py-20 bg-[#faf9f7] overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <p className="text-xs font-bold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">Most Loved</p>
        <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3">
          Bestselling Blooms
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-light max-w-md mx-auto">
          Floral arrangements that get the most love from our customers.
        </p>
        <div className="w-14 h-[2px] bg-[#c9a87c] mx-auto mt-5" />
      </div>

      <Swiper
        className="home-swiper-nav !pb-2"
        modules={[Navigation, A11y]}
        slidesPerView={1.2}
        spaceBetween={16}
        navigation
        loop
        grabCursor
        breakpoints={{
          480: { slidesPerView: 2,   spaceBetween: 16 },
          768: { slidesPerView: 3,   spaceBetween: 20 },
          1024: { slidesPerView: 4,  spaceBetween: 22 },
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/shop")}
          className="px-10 py-3.5 border border-[#1a1a1a] text-sm font-bold tracking-[0.2em] uppercase text-gray-800 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
        >
          View All Flowers
        </button>
      </div>
    </div>
  </section>
  );
};

export default BestsellingBlooms;
