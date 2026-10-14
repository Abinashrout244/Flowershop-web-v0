import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, FreeMode } from "swiper/modules";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useSectionTheme } from "../../../hooks/useSectionTheme";
import "swiper/css";
import "swiper/css/free-mode";

const countries = [
  {
    name: "India",
    flag: "🇮🇳",
    tagline: "Express Delivery",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    tagline: "Same Day",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    tagline: "Next Day",
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&q=80",
  },
  {
    name: "UAE",
    flag: "🇦🇪",
    tagline: "Same Day",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Next Day",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Express",
    image:
      "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&q=80",
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    tagline: "Same Day",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
  },
];

const stats = [
  { end: 135, suffix: "+", label: "Countries Served" },
  { end: 10, suffix: "M+", label: "Happy Customers" },
  { end: 50, suffix: "K+", label: "Orders Daily" },
  { end: 100, suffix: "%", label: "Fresh Guaranteed" },
];

const CountUpValue = ({ end, suffix, play }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!play) return;
    let raf;
    const duration = 1400;
    const start = performance.now();
    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, play]);
  return (
    <span>
      {value}
      {suffix}
    </span>
  );
};

const WorldwideDelivery = () => {
  const { ref: statsRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const {
    bgAlt,
    heading,
    subheading,
    statCard,
    statValue,
    statLabel,
    divider,
  } = useSectionTheme();

  const swiperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [perView, setPerView] = useState(2);

  const syncView = (s) => {
    const pv =
      typeof s.params.slidesPerView === "number" ? s.params.slidesPerView : 2;
    setPerView(pv);
    setProgress(Math.min(Math.max(s.progress || 0, 0), 1));
  };

  const thumbWidth = Math.min((perView / countries.length) * 100, 100);
  const thumbLeft = progress * (100 - thumbWidth);
  const atStart = progress <= 0.01;
  const atEnd = progress >= 0.99;

  return (
    <section className={`py-14 md:py-24 relative overflow-hidden ${bgAlt}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${divider}`} />
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-[11px] font-semibold tracking-[0.32em] text-[#c9a87c] uppercase mb-3">
            We Deliver Everywhere
          </p>
          <h2
            className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light mb-3 ${heading}`}
          >
            Worldwide Delivery
          </h2>
          <p className={`text-sm md:text-base font-light ${subheading}`}>
            Fresh blooms reaching{" "}
            <span className="text-[#c9a87c] font-semibold">135+</span> countries
          </p>
          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="h-px w-8 bg-[#c9a87c]/50" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#c9a87c]" />
            <span className="h-px w-8 bg-[#c9a87c]/50" />
          </div>
        </motion.div>

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
          slidesPerView={1.7}
          spaceBetween={12}
          slidesOffsetBefore={0}
          speed={450}
          grabCursor
          resistanceRatio={0.6}
          threshold={4}
          touchAngle={35}
          touchStartPreventDefault={false}
          touchReleaseOnEdges
          breakpoints={{
            420: { slidesPerView: 2.2, spaceBetween: 12 },
            640: { slidesPerView: 3.1, spaceBetween: 14 },
            768: { slidesPerView: 3.6, spaceBetween: 16 },
            1024: { slidesPerView: 4.3, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
          }}
          className="!-mx-4 !px-4 md:!mx-0 md:!px-0 !pb-6 !pt-1 touch-pan-y select-none"
        >
          {countries.map((country, i) => (
            <SwiperSlide key={country.name} className="!h-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i, 4) * 0.06,
                  ease: "easeOut",
                }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] md:rounded-3xl bg-neutral-200 ring-1 ring-black/5 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.4)] transition-all duration-500 active:scale-[0.97] md:group-hover:-translate-y-1.5 md:group-hover:shadow-[0_24px_44px_-14px_rgba(0,0,0,0.5)]">
                  <img
                    src={country.image}
                    alt={country.name}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out md:group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />

                  <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 ring-1 ring-white/25 backdrop-blur-md">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                      {country.tagline}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-4">
                    <div className="min-w-0">
                      <span className="block text-xl md:text-2xl leading-none mb-1.5">
                        {country.flag}
                      </span>
                      <p className="font-serif-display text-base md:text-lg leading-tight text-white truncate">
                        {country.name}
                      </p>
                    </div>
                    <span className="grid h-8 w-8 md:h-9 md:w-9 shrink-0 place-items-center rounded-full bg-white text-[#1a1a1a] shadow-lg transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
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

        <div
          ref={statsRef}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-[#c9a87c]/25 bg-[#c9a87c]/25"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className={`text-center py-6 md:py-8 px-3 backdrop-blur-sm !rounded-none !border-0 ${statCard}`}
            >
              <p
                className={`font-serif-display text-3xl md:text-4xl font-light ${statValue}`}
              >
                <CountUpValue
                  end={stat.end}
                  suffix={stat.suffix}
                  play={inView}
                />
              </p>
              <p
                className={`text-[11px] md:text-xs mt-1.5 uppercase tracking-[0.18em] ${statLabel}`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldwideDelivery;
