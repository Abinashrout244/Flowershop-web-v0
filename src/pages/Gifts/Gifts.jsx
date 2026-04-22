import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Heart,
  ShoppingCart,
  Star,
  Gift,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { addToCart } from "../../features/cart/cartSlice";
import {
  toggleWishlist,
  selectIsWishlisted,
} from "../../features/user/wishlistSlice";
import { products } from "../../data/flowers";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const gifts = products.filter((p) => p.category === "Gifts");

/* ── Gift Card ── */
const GiftCard = ({ product }) => {
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
        size: product.sizes[0]?.label || "Standard",
        qty: 1,
      }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWish = (e) => {
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
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Wishlist */}
        <button
          onClick={handleWish}
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

        {/* Discount */}
        <span className="absolute bottom-3 left-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white">
          {discount}% OFF
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Gift size={11} className="text-[#c9a87c]" />
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#c9a87c]">
            {product.occasions?.[0]}
          </p>
        </div>

        <h3 className="mb-1.5 font-serif text-base font-medium leading-snug text-gray-800">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="mb-3 flex items-center gap-1">
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
          <span className="ml-0.5 text-[10px] text-gray-400">
            ({product.reviews?.toLocaleString()})
          </span>
        </div>

        {/* Price + Add */}
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

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#c9a87c] to-amber-300 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

/* ── Page ── */
const GiftsPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />

    {/* Breadcrumb */}
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="transition-colors hover:text-[#c9a87c]">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Gift Hampers</span>
      </div>
    </div>

    {/* ── Hero Banner ── */}
    <section className="relative mx-4 mb-10 overflow-hidden rounded-3xl md:mx-8 lg:mx-auto lg:max-w-7xl">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Gift Hampers"
        className="h-64 w-full object-cover md:h-80 lg:h-[420px]"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a87c] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-1/3 h-56 w-56 rounded-full bg-rose-400 opacity-10 blur-2xl" />

      {/* Content — left-aligned */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-14">
        {/* Label pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a87c]/40 bg-[#c9a87c]/15 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles size={11} className="text-[#c9a87c]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a87c]">
            Signature Gift Atelier
          </span>
        </div>

        <h1 className="font-serif text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
          Luxury <span className="italic text-[#c9a87c]">Gift</span>
          <br className="hidden sm:block" /> Hampers
        </h1>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
          From intimate celebrations to grand gestures — curated gift sets for
          every special occasion.
        </p>

        {/* Stats row */}
        <div className="mt-6 flex flex-wrap gap-6">
          {[
            { val: `${gifts.length}+`, label: "Gift Sets" },
            { val: "Same Day", label: "Delivery" },
            { val: "Free", label: "Gift Wrap" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-xl font-light text-[#c9a87c]">
                {s.val}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-white/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="mt-7 flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-widest text-gray-900 shadow-lg transition-all duration-300 hover:bg-[#c9a87c] hover:text-white">
          Get a Free Quote
          <ArrowRight size={13} />
        </button>
      </div>
    </section>

    {/* ── Products ── */}
    <main className="mx-auto max-w-7xl px-4 pb-20">
      {/* Section header */}
      <div className="mb-7 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a87c]">
            Our Collection
          </p>
          <h2 className="font-serif text-2xl font-light text-gray-900 md:text-3xl">
            Curated Gift Sets
          </h2>
        </div>
        <p className="hidden text-xs text-gray-400 sm:block">
          {gifts.length} items
        </p>
      </div>

      {/* Grid */}
      {gifts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gifts.map((p) => (
            <GiftCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f1e8]">
            <Gift size={28} className="text-[#c9a87c]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No gifts found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back soon for our curated collection.
          </p>
        </div>
      )}
    </main>

    <FlowerFooter />
  </div>
);

export default GiftsPage;
