import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, FreeMode } from "swiper/modules";
import { Heart, ShoppingBag, Star, Truck, RefreshCw, Shield, ChevronRight, Minus, Plus, Share2 } from "lucide-react";
import { getProductById, products } from "../../data/products";
import { addToCart } from "../../utils/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "../../utils/wishlistSlice";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const StarRating = ({ rating, count }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={14} className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
      ))}
    </div>
    <span className="text-sm font-semibold text-gray-700">{rating}</span>
    {count && <span className="text-sm text-gray-400">({count.toLocaleString()} reviews)</span>}
  </div>
);

const mockReviews = [
  { id:1, name:"Priya S.", rating:5, date:"April 10, 2025", text:"Absolutely stunning! Fresh for 10+ days. Delivery was prompt and the packaging was gorgeous.", avatar:"P" },
  { id:2, name:"Rahul M.", rating:5, date:"April 8, 2025",  text:"Ordered for my wife's anniversary. She was in tears. Premium quality, worth every rupee.", avatar:"R" },
  { id:3, name:"Sneha K.", rating:4, date:"April 5, 2025",  text:"Beautiful flowers and great packaging. Delivery was slightly delayed but still same day.", avatar:"S" },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = getProductById(id);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedAnim, setAddedAnim] = useState(false);
  const isWished = useSelector(selectIsWishlisted(product?.id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f7]">
        <div className="text-center">
          <p className="font-serif-display text-3xl text-gray-400 mb-4">Product not found</p>
          <Link to="/flowers" className="text-[#c9a87c] font-semibold hover:underline">Browse flowers →</Link>
        </div>
      </div>
    );
  }

  const currentSize = product.sizes[selectedSize];
  const discount = Math.round(((product.originalPrice - currentSize.price) / product.originalPrice) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: currentSize.price,
      image: product.images[0],
      size: currentSize.label,
      qty,
    }));
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 2000);
  };

  const handleBuyNow = () => {
    dispatch(addToCart({
      id: product.id, name: product.name, price: currentSize.price,
      image: product.images[0], size: currentSize.label, qty,
    }));
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#c9a87c] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/flowers" className="hover:text-[#c9a87c] transition-colors">Flowers</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── Left: Image Gallery ──────────────────── */}
          <div className="space-y-3">
            {/* Main Swiper */}
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-100">
              <Swiper
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Thumbs, Navigation]}
                navigation
                loop
                className="aspect-square product-detail-swiper"
              >
                {product.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img src={img} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Badges overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-[#1a1a1a] text-white text-[9px] font-bold px-3 py-1.5 rounded-sm tracking-widest uppercase">
                    {product.badge}
                  </span>
                )}
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {discount}% OFF
                </span>
              </div>
              {/* Share button */}
              <button className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                <Share2 size={15} className="text-gray-600" />
              </button>
            </div>

            {/* Thumbnails */}
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs, FreeMode]}
              slidesPerView={5}
              spaceBetween={8}
              freeMode
              watchSlidesProgress
              className="thumbs-swiper !p-0"
            >
              {product.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#c9a87c] transition-colors">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ── Right: Product Info ──────────────────── */}
          <div className="flex flex-col gap-5 lg:pt-2">

            {/* Category & Title */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">{product.category} • {product.tag}</p>
              <h1 className="font-serif-display text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>
              <StarRating rating={product.rating} count={product.reviews} />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-4 border-y border-gray-100">
              <span className="font-serif-display text-4xl font-light text-gray-900">₹{currentSize.price.toLocaleString()}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-sm font-bold text-emerald-600">{discount}% off</span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed font-light">{product.description}</p>

            {/* Size Selector */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Select Size: <span className="text-[#c9a87c]">{currentSize.label} ({currentSize.stems} stems)</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(i)}
                    className={`relative p-3 rounded-xl border-2 text-center transition-all
                      ${selectedSize === i
                        ? "border-[#c9a87c] bg-[#fdf8f0]"
                        : "border-gray-200 bg-white hover:border-gray-300"}`}
                  >
                    <p className="text-xs font-semibold text-gray-800">{size.label}</p>
                    <p className="text-[10px] text-gray-500">{size.stems} stems</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">₹{size.price.toLocaleString()}</p>
                    {selectedSize === i && (
                      <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-[#c9a87c] rounded-full flex items-center justify-center">
                        <span className="text-white text-[8px]">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q-1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty(q => q+1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-xs text-gray-400">Total: <span className="font-bold text-gray-700">₹{(currentSize.price * qty).toLocaleString()}</span></span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-full font-bold text-sm tracking-widest uppercase border-2 transition-all duration-300
                    ${addedAnim
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"}`}
                >
                  {addedAnim ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-full font-bold text-sm tracking-widest uppercase bg-[#c9a87c] text-white hover:bg-[#b8966b] hover:shadow-xl transition-all duration-300"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => dispatch(toggleWishlist({ id: product.id, name: product.name, price: currentSize.price, image: product.images[0], category: product.category }))}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all
                    ${isWished ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300"}`}
                >
                  <Heart size={18} className={isWished ? "fill-red-400 text-red-400" : "text-gray-400"} />
                </button>
              </div>
            </div>

            {/* Trust pills */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { Icon: Truck,    text: product.deliveryInfo, label: "Delivery" },
                { Icon: RefreshCw,text: "7-day freshness", label: "Guarantee"  },
                { Icon: Shield,   text: "100% authentic blooms", label: "Quality" },
              ].map(({ Icon, text, label }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-sm">
                  <Icon size={18} className="text-[#c9a87c] mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">{label}</p>
                  <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{text}</p>
                </div>
              ))}
            </div>

            {/* Occasions */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Perfect for:</p>
              <div className="flex flex-wrap gap-2">
                {product.occasions.map(o => (
                  <span key={o} className="px-3 py-1 bg-[#fdf8f0] text-[#c9a87c] text-xs font-semibold rounded-full border border-[#c9a87c]/20">
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Reviews ─────────────────────────────────── */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif-display text-3xl font-light text-gray-900 mb-1">Customer Reviews</h2>
              <StarRating rating={product.rating} count={product.reviews} />
            </div>
            <button className="px-6 py-3 border border-[#c9a87c] text-[#c9a87c] text-sm font-semibold rounded-full hover:bg-[#c9a87c] hover:text-white transition-colors">
              Write a Review
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mockReviews.map(r => (
              <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#c9a87c] flex items-center justify-center text-white font-bold text-sm">
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                    <p className="text-[10px] text-gray-400">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(s => <Star key={s} size={11} className={s<=r.rating?"fill-amber-400 text-amber-400":"fill-gray-200 text-gray-200"} />)}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Related Products ─────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif-display text-3xl font-light text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={p.images[0]} alt={p.name} className="card-img w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-serif-display text-sm font-medium text-gray-800 mb-1">{p.name}</h3>
                    <p className="text-sm font-bold text-gray-900">₹{p.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <FlowerFooter />
    </div>
  );
};

export default ProductDetailPage;
