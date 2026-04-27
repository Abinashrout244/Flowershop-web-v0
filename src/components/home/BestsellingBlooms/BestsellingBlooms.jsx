import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Heart, Star, ShoppingCart, ArrowUpRight } from "lucide-react";
import { addToCart } from "../../../features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "../../../features/user/wishlistSlice";
import { useSectionTheme } from "../../../hooks/useSectionTheme";
import "swiper/css";
import "swiper/css/navigation";

const products = [
  { id: 1, name: "Eternal Rose Bouquet", price: 1299, originalPrice: 1799, rating: 4.8, reviews: 2341, tag: "Same Day Delivery", image: "https://images.unsplash.com/photo-1586082207282-3dcb61d25ebd?w=600&q=85&auto=format", badge: "Best Seller" },
  { id: 2, name: "Pink Peony Paradise", price: 1599, originalPrice: 2199, rating: 4.9, reviews: 987, tag: "Same Day Delivery", image: "https://images.unsplash.com/photo-1531874824027-2a0d33bd6338?w=600&q=85&auto=format", badge: "Premium" },
  { id: 3, name: "Lavender Dreams", price: 999, originalPrice: 1399, rating: 4.6, reviews: 1432, tag: "Same Day Delivery", image: "https://images.unsplash.com/photo-1566114310145-37ac933c6c69?w=600&q=85&auto=format", badge: null },
  { id: 4, name: "Sunflower Bliss Bunch", price: 799, originalPrice: 1099, rating: 4.7, reviews: 1856, tag: "Same Day Delivery", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=85&auto=format", badge: "Popular" },
  { id: 6, name: "White Lily Serenity", price: 1349, originalPrice: 1849, rating: 4.7, reviews: 892, tag: "Same Day Delivery", image: "https://images.unsplash.com/photo-1486102515046-44130769cb25?w=600&q=85&auto=format", badge: "New" },
  { id: 8, name: "Orchid Elegance", price: 2299, originalPrice: 2999, rating: 4.9, reviews: 543, tag: "Same Day Delivery", image: "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?w=600&q=85&auto=format", badge: "Luxury" },
  { id: 10, name: "Tulip Rainbow Mix", price: 1199, originalPrice: 1699, rating: 4.8, reviews: 765, tag: "Same Day Delivery", image: "https://images.unsplash.com/photo-1587316830148-c9b01df2da38?w=600&q=85&auto=format", badge: "Trending" },
  { id: 11, name: "Mixed Bouquets", price: 849, originalPrice: 1199, rating: 4.6, reviews: 1674, tag: "Same Day Delivery", image: "https://images.unsplash.com/photo-1607035508682-b59eb92d77e8?w=600&q=85&auto=format", badge: null },
  { id: 24, name: "Indoor Plants", price: 899, originalPrice: 1249, rating: 4.5, reviews: 1102, tag: "Same Day Delivery", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&q=85&auto=format", badge: null },
];

const StarRating = ({ rating, emptyClass }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={10} className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : emptyClass} />
    ))}
  </div>
);

const ProductCard = ({ product, idx }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWished = useSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const { isDark, heading, body, bodyMuted, card } = useSectionTheme();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, size: "Medium", qty: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (idx % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/product/${product.id}`)}
    className={`group relative rounded-[26px] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
  ${
    isDark
      ? "bg-[#0f0f0f]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] hover:bg-[#141414]/80 hover:border-[#c9a87c]/30 hover:shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
      : "bg-[#fbf6ef]/90 backdrop-blur-md border border-[#eadfce] shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:bg-[#fdf8f0] hover:border-[#e6d3b8]/70 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]"
  }`}
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-sm">
          <span className="px-5 py-2 text-xs tracking-widest uppercase border border-white/70 text-white rounded-full">View Product</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, category: "Mixed" })); }}
          className={`absolute top-3 right-3 w-9 h-9 backdrop-blur border flex items-center justify-center rounded-full hover:scale-110 transition ${isDark ? "bg-black/50 border-white/20" : "bg-white/90 border-gray-100 shadow-sm"}`}
        >
          <Heart size={14} className={isWished ? "fill-red-400 text-red-400" : isDark ? "text-white/70" : "text-gray-500"} />
        </button>
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[9px] tracking-[0.18em] uppercase px-3 py-1 rounded-full ${isDark ? "bg-black/70 border border-white/10 text-white backdrop-blur" : "bg-black/80 text-white"}`}>
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 left-3 bg-[#c9a87c] text-white text-[10px] px-2.5 py-1 rounded-full">{discount}% OFF</span>
      </div>

      <div className="p-4">
        <p className="text-[10px] text-[#c9a87c] font-semibold tracking-[0.25em] uppercase mb-1">{product.tag}</p>
        <h3 className={`font-serif-display text-[16px] font-medium leading-snug mb-2 ${heading}`}>{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} emptyClass={isDark ? "fill-white/10 text-white/10" : "fill-gray-200 text-gray-200"} />
          <span className={`text-[11px] font-medium ${body}`}>{product.rating}</span>
          <span className={`text-[11px] ${bodyMuted}`}>({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-lg font-semibold ${heading}`}>₹{product.price.toLocaleString()}</span>
            <span className={`text-xs line-through ml-2 ${bodyMuted}`}>₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <button onClick={handleAdd} className={`flex items-center gap-1.5 text-[11px] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-300 ${added ? "bg-emerald-500 text-white" : "border border-[#c9a87c] text-[#c9a87c] hover:bg-[#c9a87c] hover:text-white"}`}>
            <ShoppingCart size={12} />{added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const BestsellingBlooms = () => {
  const navigate = useNavigate();
  const { bg, heading, subheading, btnOutline, divider } = useSectionTheme();

  return (
    <section className={`py-14 md:py-20 relative ${bg}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${divider}`} />

      {/* Heading inside padded container */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">Most Loved</p>
          <h2 className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light mb-3 ${heading}`}>Bestselling Blooms</h2>
          <p className={`text-sm md:text-base font-light max-w-md mx-auto ${subheading}`}>Floral arrangements that get the most love from our customers.</p>
          <div className="w-14 h-[1px] bg-[#c9a87c] mx-auto mt-5" />
        </motion.div>
      </div>

      {/* Swiper — full-width, no overflow-hidden parent */}
      <div className="px-4 max-w-7xl mx-auto">
        <Swiper
          className="!pb-2"
          modules={[Navigation, A11y]}
          slidesPerView={1.2}
          spaceBetween={16}
          touchStartPreventDefault={false}
          touchReleaseOnEdges
          touchAngle={60}
          navigation
          loop
          grabCursor
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 22 },
          }}
        >
          {products.map((p, idx) => (
            <SwiperSlide key={p.id}><ProductCard product={p} idx={idx} /></SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-10">
          <button onClick={() => navigate("/shop")} className={`group px-10 py-3.5 text-sm font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 flex items-center gap-2 mx-auto ${btnOutline}`}>
            View All Flowers <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );

};

export default BestsellingBlooms;
