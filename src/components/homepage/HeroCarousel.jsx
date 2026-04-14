import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/* ── Verified floral Unsplash photos ─────────────────────── */
const slides = [
  {
    id: 1,
    heading: "Say Congrats In Style",
    subtext: "Celebrate every milestone with nature's finest blooms, hand-crafted by our expert florists.",
    btn: "ORDER NOW",
    badge: "Best Seller",
    bg: "from-[#fdf3e8] to-[#f5e4cc]",
    accent: "#c9a87c",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=900&q=85&auto=format",
    tag: "Congratulations 🎉",
  },
  {
    id: 2,
    heading: "Love Blooms Every Day",
    subtext: "Express your deepest emotions with our curated anniversary collections, delivered fresh.",
    btn: "SHOP ANNIVERSARY",
    badge: "Premium",
    bg: "from-[#fdeef2] to-[#f4d4dc]",
    accent: "#d4687a",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=900&q=85&auto=format",
    tag: "Anniversary 💍",
  },
  {
    id: 3,
    heading: "Birthday Wishes in Full Bloom",
    subtext: "Make their special day unforgettable with stunning seasonal arrangements and surprise gifts.",
    btn: "EXPLORE BIRTHDAY",
    badge: "New Arrivals",
    bg: "from-[#fffbea] to-[#fef3c7]",
    accent: "#d97706",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=900&q=85&auto=format",
    tag: "Birthday 🎂",
  },
  {
    id: 4,
    heading: "Grand Gestures, Unforgettable",
    subtext: "Sometimes love speaks loudest through the most extravagant floral displays.",
    btn: "SHOP NOW",
    badge: "Luxury",
    bg: "from-[#f5f0ff] to-[#ede0ff]",
    accent: "#7c3aed",
    image: "https://media.wishque.com/data/images/products/10393/39150774_826197018639_0.68933100-1683365072.jpg",
    tag: "Grand Gestures 💐",
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  return (
  /* hero-swiper class → custom CSS overrides for full-bleed arrows */
  <section className="hero-swiper w-full">
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      loop
      pagination={{ clickable: true, dynamicBullets: true }}
      navigation
      speed={850}
      className="w-full"
    >
      {slides.map((s) => (
        <SwiperSlide key={s.id}>
          <div className={`bg-gradient-to-r ${s.bg} relative`} style={{ minHeight: "580px" }}>
            <div className="max-w-7xl mx-auto px-6 md:px-10 h-full">
              <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[580px] py-16 gap-8 md:gap-16">

                {/* ── Text ─────────────────────────────── */}
                <div className="flex-1 text-center md:text-left z-10 mt-6 md:mt-0">
                  <span
                    className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-5 px-4 py-1.5 rounded-full"
                    style={{ color: s.accent, background: `${s.accent}20` }}
                  >
                    {s.badge}
                  </span>

                  <h1 className="font-serif-display text-4xl md:text-5xl lg:text-[58px] font-light text-gray-900 leading-[1.15] mb-5">
                    {s.heading}
                  </h1>

                  <p className="text-gray-500 text-base max-w-md leading-relaxed mb-8 font-light">
                    {s.subtext}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigate("/shop")}
                      className="px-8 py-3.5 text-white text-sm font-bold tracking-[0.12em] uppercase rounded-full hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
                      style={{ background: s.accent }}
                    >
                      {s.btn}
                    </button>
                    <button
                      onClick={() => navigate("/flowers")}
                      className="px-6 py-3.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-full hover:border-gray-500 transition-colors"
                    >
                      View Collection →
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 mt-7 text-xs text-gray-400 justify-center md:justify-start">
                    <span>🚀 Same Day Delivery</span>
                    <span>🌸 100% Fresh Blooms</span>
                    <span>🎁 Gift Wrapped Free</span>
                  </div>
                </div>

                {/* ── Image ────────────────────────────── */}
                <div className="flex-1 flex items-center justify-center relative">
                  {/* Decorative blob */}
                  <div
                    className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full blur-3xl opacity-30"
                    style={{ background: `radial-gradient(circle, ${s.accent}, transparent 70%)` }}
                  />
                  <div className="relative w-[260px] h-[260px] md:w-[360px] md:h-[360px] lg:w-[430px] lg:h-[430px]">
                    <img
                      src={s.image}
                      alt={s.heading}
                      loading="eager"
                      className="w-full h-full object-cover rounded-[40%_60%_60%_40%/50%_45%_55%_50%] shadow-2xl"
                    />
                    <div
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-white text-xs font-bold shadow-lg whitespace-nowrap"
                      style={{ background: s.accent }}
                    >
                      {s.tag}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
  );
};

export default HeroCarousel;
