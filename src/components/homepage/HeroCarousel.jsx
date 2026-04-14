import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    heading: "Say Congrats In Style",
    subtext: "Celebrate every milestone with nature's finest blooms, hand-crafted by our expert florists.",
    buttonText: "ORDER NOW",
    badge: "Best Seller",
    bg: "from-[#fdf3e8] to-[#fae8d0]",
    accent: "#c9a87c",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80",
    tag: "Congratulations",
  },
  {
    id: 2,
    heading: "Love Blooms Every Day",
    subtext: "Express your deepest emotions with our curated anniversary collections, delivered fresh.",
    buttonText: "SHOP ANNIVERSARY",
    badge: "Premium",
    bg: "from-[#fdeef2] to-[#f8dde5]",
    accent: "#d4687a",
    image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=800&q=80",
    tag: "Anniversary",
  },
  {
    id: 3,
    heading: "Birthday Wishes in Full Bloom",
    subtext: "Make their special day unforgettable with stunning seasonal arrangements and surprise gifts.",
    buttonText: "EXPLORE BIRTHDAY",
    badge: "New Arrivals",
    bg: "from-[#eef6f3] to-[#d8ede6]",
    accent: "#5a9e82",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80",
    tag: "Birthday",
  },
  {
    id: 4,
    heading: "Grand Gestures, Unforgettable",
    subtext: "Sometimes love speaks loudest through the most extravagant floral displays.",
    buttonText: "SHOP GRAND GESTURES",
    badge: "Luxury",
    bg: "from-[#f0eef8] to-[#e0dbf0]",
    accent: "#7c6ea8",
    image: "https://images.unsplash.com/photo-1599733594230-6b823276d44c?w=800&q=80",
    tag: "Grand Gestures",
  },
];

const HeroCarousel = () => (
  <section className="hero-swiper w-full overflow-hidden">
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      loop
      pagination={{ clickable: true }}
      navigation
      speed={900}
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className={`bg-gradient-to-r ${slide.bg} min-h-[420px] md:min-h-[560px] lg:min-h-[620px]`}>
            <div className="max-w-7xl mx-auto px-4 h-full">
              <div className="flex flex-col-reverse md:flex-row items-center justify-between h-full pt-10 pb-16 md:pt-0 md:pb-0 gap-6 md:gap-12">

                {/* Text content */}
                <div className="flex-1 text-center md:text-left z-10">
                  <span
                    className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4 px-3 py-1 rounded-full"
                    style={{ color: slide.accent, background: `${slide.accent}18` }}
                  >
                    {slide.badge}
                  </span>
                  <h1 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-tight mb-5">
                    {slide.heading}
                  </h1>
                  <p className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed mb-8 font-light">
                    {slide.subtext}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center md:items-start gap-3">
                    <button
                      className="px-8 py-3.5 text-white text-sm font-semibold tracking-[0.1em] uppercase rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-100"
                      style={{ background: slide.accent }}
                    >
                      {slide.buttonText}
                    </button>
                    <button className="px-6 py-3.5 text-sm font-medium tracking-wide text-gray-600 border border-gray-300 rounded-full hover:border-gray-400 transition-colors">
                      View All Collections
                    </button>
                  </div>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center md:justify-start gap-6 mt-8 text-xs text-gray-400">
                    <span>🚀 Same Day Delivery</span>
                    <span>💯 100% Fresh</span>
                    <span>🎁 Gift Wrapped</span>
                  </div>
                </div>

                {/* Image */}
                <div className="flex-1 flex items-center justify-center relative">
                  <div className="relative w-72 h-72 md:w-[380px] md:h-[380px] lg:w-[460px] lg:h-[460px]">
                    {/* Decorative circle behind */}
                    <div
                      className="absolute inset-4 rounded-full opacity-20"
                      style={{ background: `radial-gradient(circle, ${slide.accent}, transparent)` }}
                    />
                    <img
                      src={slide.image}
                      alt={slide.heading}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-[40%_60%_60%_40%/40%_50%_60%_50%] shadow-2xl"
                    />
                    {/* Tag pill */}
                    <div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg whitespace-nowrap"
                      style={{ background: slide.accent }}
                    >
                      {slide.tag}
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

export default HeroCarousel;
