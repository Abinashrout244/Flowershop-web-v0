import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  ShoppingCart,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Truck,
} from "lucide-react";
import { addToCart } from "../../../features/cart/cartSlice";
import {
  toggleWishlist,
  selectIsWishlisted,
} from "../../../features/user/wishlistSlice";
import { useSectionTheme } from "../../../hooks/useSectionTheme";

const products = [
  {
    id: 1,
    name: "Eternal Rose Bouquet",
    price: 1299,
    originalPrice: 1799,
    rating: 4.8,
    reviews: 2341,
    tag: "Same Day Delivery",
    image:
      "https://images.unsplash.com/photo-1586082207282-3dcb61d25ebd?w=600&q=85&auto=format",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Pink Peony Paradise",
    price: 1599,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 987,
    tag: "Same Day Delivery",
    image:
      "https://images.unsplash.com/photo-1531874824027-2a0d33bd6338?w=600&q=85&auto=format",
    badge: "Premium",
  },
  {
    id: 3,
    name: "Lavender Dreams",
    price: 999,
    originalPrice: 1399,
    rating: 4.6,
    reviews: 1432,
    tag: "Same Day Delivery",
    image:
      "https://images.unsplash.com/photo-1566114310145-37ac933c6c69?w=600&q=85&auto=format",
    badge: null,
  },
  {
    id: 4,
    name: "Sunflower Bliss Bunch",
    price: 799,
    originalPrice: 1099,
    rating: 4.7,
    reviews: 1856,
    tag: "Same Day Delivery",
    image:
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=85&auto=format",
    badge: "Popular",
  },
  {
    id: 6,
    name: "White Lily Serenity",
    price: 1349,
    originalPrice: 1849,
    rating: 4.7,
    reviews: 892,
    tag: "Same Day Delivery",
    image:
      "https://images.unsplash.com/photo-1486102515046-44130769cb25?w=600&q=85&auto=format",
    badge: "New",
  },
  {
    id: 8,
    name: "Orchid Elegance",
    price: 2299,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 543,
    tag: "Same Day Delivery",
    image:
      "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?w=600&q=85&auto=format",
    badge: "Luxury",
  },
  {
    id: 10,
    name: "Tulip Rainbow Mix",
    price: 1199,
    originalPrice: 1699,
    rating: 4.8,
    reviews: 765,
    tag: "Same Day Delivery",
    image:
      "https://images.unsplash.com/photo-1587316830148-c9b01df2da38?w=600&q=85&auto=format",
    badge: "Trending",
  },
  {
    id: 11,
    name: "Mixed Bouquets",
    price: 849,
    originalPrice: 1199,
    rating: 4.6,
    reviews: 1674,
    tag: "Same Day Delivery",
    image:
      "https://images.unsplash.com/photo-1607035508682-b59eb92d77e8?w=600&q=85&auto=format",
    badge: null,
  },
  {
    id: 24,
    name: "Indoor Plants",
    price: 899,
    originalPrice: 1249,
    rating: 4.5,
    reviews: 1102,
    tag: "Same Day Delivery",
    image:
      "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&q=85&auto=format",
    badge: null,
  },
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const StarRating = ({ rating, emptyClass }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={9}
        className={
          s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : emptyClass
        }
      />
    ))}
  </div>
);

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWished = useSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const { isDark, heading, body, bodyMuted } = useSectionTheme();
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
        image: product.image,
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
        image: product.image,
        category: "Mixed",
      }),
    );
  };

  return (
    // Outer wrapper: w-[44%] gives Flipkart-style compact card sizing on phones
    <motion.div
      variants={cardVariants}
      className="w-[44%] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] md:w-[calc((100%-40px)/3)] lg:w-[calc((100%-60px)/4)]"
    >
      {/* Inner card */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className={`group relative h-full cursor-pointer overflow-hidden rounded-2xl sm:rounded-[26px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 ${
          isDark
            ? "border border-white/[0.12] bg-[#0f0f0f]/70 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl hover:border-[#c9a87c]/40 hover:bg-[#141414]/80 hover:shadow-[0_0_40px_rgba(201,168,124,0.18),0_20px_60px_rgba(0,0,0,0.6)]"
            : "border border-[#eadfce] bg-[#fbf6ef]/90 shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-md hover:border-[#e6d3b8] hover:bg-[#fdf8f0] hover:shadow-[0_25px_70px_rgba(0,0,0,0.14)]"
        }`}
      >
        {/* ---------- image ---------- */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

          {product.badge && (
            <span className="absolute left-2 top-2 rounded-full border border-white/20 bg-black/65 px-2 py-0.5 text-[8px] sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.18em] text-white backdrop-blur">
              {product.badge}
            </span>
          )}

          <button
            onClick={handleWishlist}
            aria-label="Add to wishlist"
            className={`absolute right-2 top-2 sm:right-3 sm:top-3 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border backdrop-blur transition hover:scale-110 ${
              isDark
                ? "border-white/[0.22] bg-black/50"
                : "border-white/60 bg-white/90 shadow-sm"
            }`}
          >
            <Heart
              size={12}
              className={
                isWished
                  ? "fill-red-400 text-red-400"
                  : isDark
                    ? "text-white/70"
                    : "text-gray-500"
              }
            />
          </button>

          <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 rounded-full bg-[#c9a87c] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-white shadow-md">
            {discount}% OFF
          </span>

          <span className="absolute bottom-3 right-3 hidden sm:flex translate-y-3 items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-stone-900 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View <ArrowUpRight size={11} />
          </span>
        </div>

        {/* ---------- details ---------- */}
        <div className="p-2.5 sm:p-5">
          <p className="mb-1 flex items-center gap-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.22em] text-[#c9a87c]">
            <Truck size={10} />
            <span className="truncate">{product.tag}</span>
          </p>

          <h3
            className={`mb-1 line-clamp-1 sm:line-clamp-2 min-h-0 sm:min-h-[2.75rem] font-serif-display text-[13px] sm:text-[16px] font-medium leading-snug ${heading}`}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1">
            <StarRating
              rating={product.rating}
              emptyClass={
                isDark
                  ? "fill-white/10 text-white/10"
                  : "fill-gray-200 text-gray-200"
              }
            />
            <span className={`text-[10px] sm:text-[11px] font-medium ${body}`}>
              {product.rating}
            </span>
            <span
              className={`hidden xs:inline text-[10px] sm:text-[11px] ${bodyMuted}`}
            >
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          <div
            className={`mt-2.5 sm:mt-4 flex flex-col gap-1.5 xs:flex-row xs:items-center xs:justify-between border-t pt-2.5 sm:pt-4 ${isDark ? "border-white/10" : "border-[#eadfce]"}`}
          >
            <div className="leading-tight">
              <span className={`text-sm sm:text-lg font-semibold ${heading}`}>
                ₹{product.price.toLocaleString()}
              </span>
              <span
                className={`ml-1 text-[10px] sm:text-xs line-through ${bodyMuted}`}
              >
                ₹{product.originalPrice.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`flex items-center justify-center gap-1 rounded-full px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-[11px] font-semibold transition-all duration-300 active:scale-95 ${
                added
                  ? "bg-emerald-500 text-white"
                  : "border border-[#c9a87c] text-[#c9a87c] hover:bg-[#c9a87c] hover:text-white"
              }`}
            >
              <ShoppingCart size={11} />
              {added ? "Added" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BestsellingBlooms = () => {
  const navigate = useNavigate();
  const { isDark, bg, heading, subheading, btnOutline, divider } =
    useSectionTheme();

  const scrollerRef = useRef(null);

  const [scrollState, setScrollState] = useState({
    atStart: true,
    atEnd: false,
    thumbWidth: 100,
    thumbLeft: 0,
  });

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const thumbWidth = (el.clientWidth / el.scrollWidth) * 100;
    const thumbLeft =
      maxScroll > 0 ? (el.scrollLeft / maxScroll) * (100 - thumbWidth) : 0;

    setScrollState({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= maxScroll - 4,
      thumbWidth,
      thumbLeft,
    });
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollPage = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const arrowClass = `absolute top-[42%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 hover:border-[#c9a87c] hover:bg-[#c9a87c] hover:text-white active:scale-95 md:flex ${
    isDark
      ? "border-white/20 bg-black/60 text-white backdrop-blur"
      : "border-[#eadfce] bg-white text-stone-800 shadow-lg"
  }`;
  const arrowDisabled = "pointer-events-none opacity-30";

  return (
    <section className={`relative overflow-hidden py-14 md:py-24 ${bg}`}>
      <div className={`absolute left-0 right-0 top-0 h-px ${divider}`} />

      <div className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c9a87c]/10 blur-3xl" />

      {/* ---------- heading ---------- */}
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="mb-10 text-center md:mb-14"
        >
          <p className="mb-3 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#c9a87c]">
            <span className="h-px w-8 bg-[#c9a87c]/60" />
            Most Loved
            <span className="h-px w-8 bg-[#c9a87c]/60" />
          </p>
          <h2
            className={`mb-3 font-serif-display text-3xl font-light md:text-4xl lg:text-5xl ${heading}`}
          >
            Bestselling Blooms
          </h2>
          <p
            className={`mx-auto max-w-md text-sm font-light md:text-base ${subheading}`}
          >
            Floral arrangements that get the most love from our customers.
          </p>
        </motion.div>
      </div>

      {/* ---------- product list ---------- */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-14">
        <button
          onClick={() => scrollPage(-1)}
          aria-label="Previous flowers"
          className={`${arrowClass} md:left-2 ${scrollState.atStart ? arrowDisabled : ""}`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollPage(1)}
          aria-label="Next flowers"
          className={`${arrowClass} md:right-2 ${scrollState.atEnd ? arrowDisabled : ""}`}
        >
          <ChevronRight size={20} />
        </button>

        <motion.div
          ref={scrollerRef}
          onScroll={updateScrollState}
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="-mx-4 -my-6 flex gap-3 sm:gap-5 overflow-x-auto overscroll-x-contain scroll-pl-4 px-4 py-6 [scrollbar-width:none] md:snap-x md:snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="relative mx-auto mt-8 hidden h-[3px] w-40 rounded-full bg-[#c9a87c]/20 md:block">
          <div
            className="absolute top-0 h-full rounded-full bg-[#c9a87c] transition-[left,width] duration-200 ease-out"
            style={{
              width: `${scrollState.thumbWidth}%`,
              left: `${scrollState.thumbLeft}%`,
            }}
          />
        </div>
      </div>

      {/* ---------- view all ---------- */}
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => navigate("/shop")}
            className={`group mx-auto flex items-center gap-2 rounded-full px-10 py-3.5 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 ${btnOutline}`}
          >
            View All Flowers
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BestsellingBlooms;
