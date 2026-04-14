import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Heart, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    id: 1,
    name: "Eternal Rose Bouquet",
    price: 1299,
    originalPrice: 1799,
    rating: 4.8,
    reviews: 2341,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Summer Sunrise Bunch",
    price: 899,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 1856,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80",
    badge: "New",
  },
  {
    id: 3,
    name: "Pink Perfection Hamper",
    price: 2199,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 987,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=600&q=80",
    badge: "Premium",
  },
  {
    id: 4,
    name: "Lavender Dreams",
    price: 1099,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 1432,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1599733594230-6b823276d44c?w=600&q=80",
    badge: null,
  },
  {
    id: 5,
    name: "Lily Paradise Basket",
    price: 1599,
    originalPrice: 2099,
    rating: 4.8,
    reviews: 765,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&q=80",
    badge: "Trending",
  },
  {
    id: 6,
    name: "Red Romance Bouquet",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 3210,
    tag: "Same Day Delivery",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&q=80",
    badge: "Best Seller",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={11}
        className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
      />
    ))}
  </div>
);

const ProductCard = ({ product }) => {
  const [wished, setWished] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer">
      {/* Image area */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="card-img w-full h-full object-cover"
        />

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setWished(!wished); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={14}
            className={wished ? "fill-red-400 text-red-400" : "text-gray-400"}
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm">
            {product.badge}
          </span>
        )}

        {/* Discount pill */}
        <span className="absolute bottom-3 left-3 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
          {discount}% OFF
        </span>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-[10px] text-[#c9a87c] font-semibold tracking-widest uppercase mb-1">
          {product.tag}
        </p>
        <h3 className="font-serif-display text-base font-medium text-gray-800 leading-snug mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-gray-500 font-medium">{product.rating}</span>
          <span className="text-[11px] text-gray-400">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <button className="text-[11px] font-semibold text-[#c9a87c] border border-[#c9a87c] px-3 py-1.5 rounded-full hover:bg-[#c9a87c] hover:text-white transition-colors">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

const BestsellingBlooms = () => (
  <section className="py-14 md:py-20 bg-[#faf9f7]">
    <div className="max-w-7xl mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">Our Favourites</p>
        <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3">
          Bestselling Blooms
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-light max-w-md mx-auto">
          Floral arrangements that get the most love from our customers.
        </p>
        <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-5" />
      </div>

      <Swiper
        modules={[Navigation, A11y]}
        slidesPerView={1.2}
        spaceBetween={16}
        navigation
        loop
        grabCursor
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="!pb-2"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CTA */}
      <div className="text-center mt-10">
        <button className="px-10 py-3.5 border border-[#1a1a1a] text-sm font-semibold tracking-[0.2em] uppercase text-gray-800 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all duration-300">
          View All Products
        </button>
      </div>
    </div>
  </section>
);

export default BestsellingBlooms;
