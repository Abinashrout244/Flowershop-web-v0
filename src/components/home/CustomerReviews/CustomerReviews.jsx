import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Star } from "lucide-react";
import { useSectionTheme } from "../../../hooks/useSectionTheme";
import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  { id: 1, name: "Priya Sharma", date: "March 15, 2025", rating: 5, text: "Absolutely stunning arrangement! The roses were fresh for over two weeks. My mother was moved to tears — best gifting decision I've ever made. Will definitely order again for every occasion.", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=200&q=80", product: "Eternal Rose Bouquet", location: "Mumbai" },
  { id: 2, name: "Rahul Mehta", date: "March 22, 2025", rating: 5, text: "Same-day delivery was truly same-day. Ordered at 11am, flowers arrived by 4pm perfectly packed with a handwritten note. The lilies were magnificent. Premium experience throughout.", image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=200&q=80", product: "Lily Paradise Basket", location: "Delhi" },
  { id: 3, name: "Sneha Kulkarni", date: "April 2, 2025", rating: 5, text: "I've ordered from many flower shops but Flora & Bloom is in a completely different league. The packaging is gorgeous, flowers are incredibly fresh. My anniversary was made so special.", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=200&q=80", product: "Pink Perfection Hamper", location: "Bangalore" },
  { id: 4, name: "Arjun Nair", date: "April 8, 2025", rating: 5, text: "Sent flowers to my fiancée in London from India. The international delivery was flawless — arrived perfectly fresh on her birthday morning. The tracking system kept me informed throughout.", image: "https://images.unsplash.com/photo-1599733594230-6b823276d44c?w=200&q=80", product: "Red Romance Bouquet", location: "Kochi" },
  { id: 5, name: "Divya Patel", date: "April 11, 2025", rating: 5, text: "The customization options are brilliant. Added a chocolate box and a personal note — the whole package looked like it was from a luxury boutique. My friend couldn't believe I ordered online!", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=200&q=80", product: "Summer Sunrise Bunch", location: "Ahmedabad" },
];

const StarRating = ({ rating, empty }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={12} className={s <= rating ? "fill-amber-400 text-amber-400" : empty} />
    ))}
  </div>
);

const CustomerReviews = () => {
  const { isDark, bgAccent, heading, body, divider } = useSectionTheme();

  return (
    <section className={`dark-swiper py-16 md:py-24 relative ${bgAccent}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${divider}`} />
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.65 }} className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.35em] text-[#c9a87c] uppercase mb-3">What Our Customers Say</p>
          <h2 className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light mb-4 ${heading}`}>Customer Reviews</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} className="fill-amber-400 text-amber-400" />)}</div>
            <span className={`text-lg font-semibold font-serif-display ${heading}`}>4.9</span>
            <span className={`text-sm ${body}`}>based on 28,000+ reviews</span>
          </div>
          <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-6" />
        </motion.div>

        <Swiper modules={[Navigation, A11y]} slidesPerView={1.1} spaceBetween={16} navigation grabCursor loop
          touchStartPreventDefault={false}
          touchReleaseOnEdges
          touchAngle={60}
          breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }}>
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className={`rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ${isDark ? "bg-white/4 border border-white/[0.12] hover:bg-white/7 hover:border-[#c9a87c]/40" : "bg-white border border-[#f1e8de] shadow-sm hover:shadow-md hover:border-[#c9a87c]/30"}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border ${isDark ? "border-white/[0.15]" : "border-gray-100"}`}>
                    <img src={review.image} alt={review.product} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#c9a87c] font-semibold tracking-widest uppercase">{review.product}</p>
                    <StarRating rating={review.rating} empty={isDark ? "text-white/15 fill-white/15" : "text-gray-200 fill-gray-200"} />
                    <p className={`text-[10px] mt-0.5 ${isDark ? "text-white/25" : "text-gray-400"}`}>{review.date}</p>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed flex-1 font-light italic ${body}`}>"{review.text}"</p>
                <div className={`flex items-center justify-between mt-5 pt-4 border-t ${isDark ? "border-white/[0.12]" : "border-gray-100"}`}>
                  <div>
                    <p className={`font-semibold text-sm ${heading}`}>{review.name}</p>
                    <p className={`text-[11px] ${isDark ? "text-white/35" : "text-gray-400"}`}>📍 {review.location}</p>
                  </div>
                  <span className="text-xs text-[#c9a87c] font-semibold tracking-wide">✓ Verified</span>
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-12">
          <button className="px-8 py-3.5 border border-[#c9a87c] text-[#c9a87c] text-sm font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-[#c9a87c] hover:text-white transition-all duration-300">Write a Review</button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
