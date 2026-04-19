import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    date: "March 15, 2025",
    rating: 5,
    text: "Absolutely stunning arrangement! The roses were fresh for over two weeks. My mother was moved to tears — best gifting decision I've ever made. Will definitely order again for every occasion.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=200&q=80",
    product: "Eternal Rose Bouquet",
    location: "Mumbai",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    date: "March 22, 2025",
    rating: 5,
    text: "Same-day delivery was truly same-day. Ordered at 11am, flowers arrived by 4pm perfectly packed with a handwritten note. The lilies were magnificent. Premium experience throughout.",
    image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=200&q=80",
    product: "Lily Paradise Basket",
    location: "Delhi",
  },
  {
    id: 3,
    name: "Sneha Kulkarni",
    date: "April 2, 2025",
    rating: 5,
    text: "I've ordered from many flower shops but Flora & Bloom is in a completely different league. The packaging is gorgeous, flowers are incredibly fresh. My anniversary was made so special.",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=200&q=80",
    product: "Pink Perfection Hamper",
    location: "Bangalore",
  },
  {
    id: 4,
    name: "Arjun Nair",
    date: "April 8, 2025",
    rating: 5,
    text: "Sent flowers to my fiancée in London from India. The international delivery was flawless — arrived perfectly fresh on her birthday morning. The tracking system kept me informed throughout.",
    image: "https://images.unsplash.com/photo-1599733594230-6b823276d44c?w=200&q=80",
    product: "Red Romance Bouquet",
    location: "Kochi",
  },
  {
    id: 5,
    name: "Divya Patel",
    date: "April 11, 2025",
    rating: 5,
    text: "The customization options are brilliant. Added a chocolate box and a personal note — the whole package looked like it was from a luxury boutique. My friend couldn't believe I ordered online!",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=200&q=80",
    product: "Summer Sunrise Bunch",
    location: "Ahmedabad",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={12} className={s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-600 fill-gray-600"} />
    ))}
  </div>
);

const CustomerReviews = () => (
  <section className="dark-swiper py-16 md:py-24 bg-[#0f0f0f]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#c9a87c] uppercase mb-3">What Our Customers Say</p>
        <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
          Customer Reviews
        </h2>
        <div className="flex items-center justify-center gap-3 text-white/60">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-white text-lg font-semibold font-serif-display">4.9</span>
          <span className="text-sm text-white/50">based on 28,000+ reviews</span>
        </div>
        <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-6" />
      </div>

      <Swiper
        className="home-swiper-nav"
        modules={[Navigation, A11y]}
        slidesPerView={1.1}
        spaceBetween={16}
        navigation
        grabCursor
        loop
        breakpoints={{
          640:  { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col hover:bg-white/8 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={review.image} alt={review.product} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] text-[#c9a87c] font-semibold tracking-widest uppercase">{review.product}</p>
                  <StarRating rating={review.rating} />
                  <p className="text-[10px] text-white/30 mt-0.5">{review.date}</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1 font-light italic">"{review.text}"</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-white/40 text-[11px]">📍 {review.location}</p>
                </div>
                <span className="text-xs text-[#c9a87c] font-semibold tracking-wide">✓ Verified</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-12">
        <button className="px-8 py-3.5 border border-[#c9a87c] text-[#c9a87c] text-sm font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-[#c9a87c] hover:text-white transition-all duration-300">
          Write a Review
        </button>
      </div>
    </div>
  </section>
);

export default CustomerReviews;


