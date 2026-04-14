import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Play } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const BASE = "https://images.unsplash.com/";

const spotlightItems = [
  {
    id: 1,
    title: "How We Create Our Signature Rose Bouquets",
    duration: "3:24",
    image: `${BASE}photo-1582794543139-8ac9cb0f7b11?w=800&q=85&auto=format`,
    views: "45K views",
    videoUrl: "https://www.youtube.com/watch?v=Y3v2NaDFnTQ",
  },
  {
    id: 2,
    title: "Behind the Scenes: Morning Flower Market",
    duration: "5:11",
    image: `${BASE}photo-1525310072745-f49212b5ac6d?w=800&q=85&auto=format`,
    views: "28K views",
    videoUrl: "https://www.youtube.com/watch?v=Y3v2NaDFnTQ",
  },
  {
    id: 3,
    title: "Summer Collection 2025 — Full Look",
    duration: "2:47",
    image: `${BASE}photo-1559934043-a18baf6c367f?w=800&q=85&auto=format`,
    views: "61K views",
    videoUrl: "https://www.youtube.com/watch?v=Y3v2NaDFnTQ",
  },
  {
    id: 4,
    title: "Wedding Floral Design Masterclass",
    duration: "8:02",
    image: `${BASE}photo-1562859135-3c009b776595?w=800&q=85&auto=format`,
    views: "32K views",
    videoUrl: "https://www.youtube.com/watch?v=Y3v2NaDFnTQ",
  },
  {
    id: 5,
    title: "Caring for Fresh Cut Flowers at Home",
    duration: "4:15",
    image: `${BASE}photo-1519378058457-4c29a0a2efac?w=800&q=85&auto=format`,
    views: "19K views",
    videoUrl: "https://www.youtube.com/watch?v=Y3v2NaDFnTQ",
  },
  {
    id: 6,
    title: "Lavender Fields — The Farm Experience",
    duration: "6:30",
    image: `${BASE}photo-1471086569966-db3eebc25a59?w=800&q=85&auto=format`,
    views: "37K views",
    videoUrl: "https://www.youtube.com/watch?v=Y3v2NaDFnTQ",
  },
  {
    id: 7,
    title: "Wildflower Meadow Walk & Picking Guide",
    duration: "7:05",
    image: `${BASE}photo-1462275646964-a0e3386b89fa?w=800&q=85&auto=format`,
    views: "22K views",
    videoUrl: "https://www.youtube.com/watch?v=Y3v2NaDFnTQ",
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
        className="home-swiper-nav"
        modules={[Navigation, A11y]}
        slidesPerView={1.2}
        spaceBetween={8}
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
            <a
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer  overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
            >
             <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden group">
  
  {/* Image */}
  <img
    src={item.image}
    alt={item.title}
    loading="lazy"
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
  />

  {/* Dark gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

  {/* Play button center */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
      <Play size={18} className="text-gray-900 fill-gray-900 translate-x-0.5" />
    </div>
  </div>

  {/* 🔥 Bottom Text */}
  <div className="absolute bottom-0 left-0 w-full p-4">
    <p className="text-[10px] text-[#c9a87c] font-semibold tracking-widest uppercase mb-1">
      {item.views}
    </p>
    
    <h3 className="text-sm md:text-base font-medium text-white leading-snug line-clamp-2">
      {item.title}
    </h3>

    <span className="text-[10px] text-white/70 mt-1 inline-block">
      {item.duration}
    </span>
  </div>
</div>
             
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default InTheSpotlight;
