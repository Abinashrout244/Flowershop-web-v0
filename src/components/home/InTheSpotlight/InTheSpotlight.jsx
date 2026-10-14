import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, FreeMode } from "swiper/modules";
import { Play, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useSectionTheme } from "../../../hooks/useSectionTheme";
import "swiper/css";
import "swiper/css/free-mode";

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

const InTheSpotlight = () => {
  const { bg, heading, divider } = useSectionTheme();

  const swiperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [perView, setPerView] = useState(1.3);

  const syncView = (s) => {
    const pv =
      typeof s.params.slidesPerView === "number" ? s.params.slidesPerView : 1.3;
    setPerView(pv);
    setProgress(Math.min(Math.max(s.progress || 0, 0), 1));
  };

  const thumbWidth = Math.min((perView / spotlightItems.length) * 100, 100);
  const thumbLeft = progress * (100 - thumbWidth);
  const atStart = progress <= 0.01;
  const atEnd = progress >= 0.99;

  return (
    <section className={`py-14 md:py-24 relative overflow-hidden ${bg}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${divider}`} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8 md:mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold tracking-[0.32em] text-[#c9a87c] uppercase mb-3">
              Watch & Discover
            </p>
            <h2
              className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light ${heading}`}
            >
              In The Spotlight
            </h2>
            <div className="flex items-center gap-2 mt-4">
              <span className="h-1.5 w-1.5 rotate-45 bg-[#c9a87c]" />
              <span className="h-px w-10 bg-[#c9a87c]/50" />
            </div>
          </motion.div>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group inline-flex shrink-0 items-center gap-1.5 text-xs md:text-sm font-semibold text-[#c9a87c] tracking-wide"
          >
            <span className="border-b border-transparent group-hover:border-[#c9a87c] transition-colors">
              View all
            </span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>
        </div>

        <Swiper
          modules={[A11y, FreeMode]}
          onSwiper={(s) => {
            swiperRef.current = s;
            syncView(s);
          }}
          onProgress={(s, p) => setProgress(Math.min(Math.max(p, 0), 1))}
          onBreakpoint={syncView}
          onResize={syncView}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.7,
            momentumVelocityRatio: 0.8,
            sticky: false,
          }}
          slidesPerView={1.3}
          spaceBetween={12}
          speed={450}
          grabCursor={true}
          // --- Updated Touch Settings for Mobile ---
          touchEventsTarget="container"
          preventClicks={true}
          preventClicksPropagation={true}
          touchStartPreventDefault={false}
          touchRatio={1}
          resistance={true}
          resistanceRatio={0.6}
          breakpoints={{
            480: { slidesPerView: 2.1, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            1024: { slidesPerView: 3.5, spaceBetween: 22 },
          }}
          // REMOVED 'touch-pan-y' from className below:
          className="!-mx-4 !px-4 md:!mx-0 md:!px-0 !pb-6 !pt-1 select-none"
        >
          {spotlightItems.map((item, i) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i, 3) * 0.07,
                  ease: "easeOut",
                }}
              >
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  className="group relative block aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[20px] md:rounded-3xl bg-neutral-200 ring-1 ring-black/5 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.4)] transition-all duration-500 active:scale-[0.97] md:hover:-translate-y-1.5 md:hover:shadow-[0_24px_44px_-14px_rgba(0,0,0,0.5)]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out md:group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                  <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white ring-1 ring-white/20 backdrop-blur-md">
                    {item.duration}
                  </span>

                  <div className="absolute inset-0 grid place-items-center">
                    <span className="relative grid h-14 w-14 md:h-16 md:w-16 place-items-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-500 md:group-hover:scale-110 md:group-hover:bg-[#c9a87c]/90">
                      <span className="absolute inset-0 rounded-full ring-1 ring-white/30 animate-ping opacity-40" />
                      <Play
                        size={18}
                        className="relative translate-x-0.5 fill-white text-white"
                      />
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-5">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9bc92]">
                      {item.views}
                    </p>
                    <h3 className="font-serif-display text-[15px] md:text-lg leading-snug text-white line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </a>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-2 md:mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={atStart}
            className="hidden md:grid h-10 w-10 place-items-center rounded-full border border-[#c9a87c]/40 text-[#c9a87c] transition-all duration-300 hover:bg-[#c9a87c] hover:text-white active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="relative h-[3px] w-40 md:w-60 overflow-hidden rounded-full bg-[#c9a87c]/20">
            <span
              className="absolute top-0 h-full rounded-full bg-gradient-to-r from-[#d9bc92] to-[#b8965f] transition-[width] duration-300 ease-out"
              style={{ width: `${thumbWidth}%`, left: `${thumbLeft}%` }}
            />
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={atEnd}
            className="hidden md:grid h-10 w-10 place-items-center rounded-full border border-[#c9a87c]/40 text-[#c9a87c] transition-all duration-300 hover:bg-[#c9a87c] hover:text-white active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default InTheSpotlight;
