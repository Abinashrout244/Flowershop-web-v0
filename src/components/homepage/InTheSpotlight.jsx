import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Play } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const spotlightItems = [
  {
    id: 1,
    title: "How We Create Our Signature Rose Bouquets",
    duration: "3:24",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80",
    views: "45K views",
  },
  {
    id: 2,
    title: "Behind the Scenes: Morning Flower Market",
    duration: "5:11",
    image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=600&q=80",
    views: "28K views",
  },
  {
    id: 3,
    title: "Summer Collection 2025 — Full Look",
    duration: "2:47",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&q=80",
    views: "61K views",
  },
  {
    id: 4,
    title: "Wedding Floral Design Masterclass",
    duration: "8:02",
    image: "https://images.unsplash.com/photo-1599733594230-6b823276d44c?w=600&q=80",
    views: "32K views",
  },
  {
    id: 5,
    title: "Caring for Fresh Cut Flowers at Home",
    duration: "4:15",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&q=80",
    views: "19K views",
  },
];

const InTheSpotlight = () => (
  <section className="py-14 md:py-20 bg-[#faf9f7]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">Watch & Discover</p>
          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
            In The Spotlight
          </h2>
          <div className="w-12 h-px bg-[#c9a87c] mt-4" />
        </div>
        <a href="#" className="text-sm font-semibold text-[#c9a87c] tracking-wide hover:underline">
          View all videos →
        </a>
      </div>

      <Swiper
        modules={[Navigation, A11y]}
        slidesPerView={1.2}
        spaceBetween={16}
        navigation
        grabCursor
        loop
        breakpoints={{
          480:  { slidesPerView: 2,   spaceBetween: 16 },
          768:  { slidesPerView: 3,   spaceBetween: 20 },
          1024: { slidesPerView: 3.5, spaceBetween: 24 },
        }}
      >
        {spotlightItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg">
                    <Play size={18} className="text-gray-900 fill-gray-900 translate-x-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md tracking-wide">
                  {item.duration}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs text-[#c9a87c] font-semibold tracking-widest uppercase mb-1.5">{item.views}</p>
                <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-[#c9a87c] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default InTheSpotlight;
