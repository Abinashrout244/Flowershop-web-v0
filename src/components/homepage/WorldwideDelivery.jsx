import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/navigation";

const countries = [
  {
    name: "India",
    flag: "IN",
    tagline: "Express Delivery",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
  },
  {
    name: "United Kingdom",
    flag: "UK",
    tagline: "Same Day",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80",
  },
  {
    name: "United States",
    flag: "US",
    tagline: "Next Day",
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&q=80",
  },
  {
    name: "UAE",
    flag: "AE",
    tagline: "Same Day",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
  },
  {
    name: "Canada",
    flag: "CA",
    tagline: "Next Day",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80",
  },
  {
    name: "Australia",
    flag: "AU",
    tagline: "Express",
    image:
      "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=400&q=80",
  },
  {
    name: "Singapore",
    flag: "SG",
    tagline: "Same Day",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80",
  },
];

const stats = [
  { end: 135, suffix: "+", label: "Countries Served" },
  { end: 10, suffix: "M+", label: "Happy Customers" },
  { end: 50, suffix: "K+", label: "Orders Daily" },
  { end: 100, suffix: "%", label: "Fresh Guaranteed" },
];

/* 🔢 Count Animation */
const CountUpValue = ({ end, suffix, play }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!play) return;

    let raf;
    const duration = 1400;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * end));

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
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

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">
            We Deliver Everywhere
          </p>
          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3">
            Worldwide Delivery
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light">
            Across <span className="text-[#c9a87c] font-semibold">135+</span>{" "}
            Countries
          </p>
          <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-5" />
        </div>

        {/* 🌍 COUNTRY CAROUSEL */}
        <Swiper
          className="home-swiper-nav"
          modules={[Navigation, A11y]}
          slidesPerView={2}
          spaceBetween={14}
          navigation
          loop
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {countries.map((country) => (
            <SwiperSlide key={country.name}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[26px] aspect-square mb-3">
                  {/* IMAGE */}
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* HOVER BLUR */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <span className="px-4 py-2 text-xs uppercase tracking-widest border border-white/70 text-white rounded-full">
                      Explore
                    </span>
                  </div>

                  {/* FLAG */}
                  <div className="absolute top-3 left-3 text-[10px] bg-white/80 px-2 py-1 rounded-full backdrop-blur">
                    {country.flag}
                  </div>

                  {/* TEXT */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">
                      {country.name}
                    </p>
                    <p className="text-white/70 text-[10px] uppercase tracking-widest">
                      {country.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-center font-medium text-gray-800 group-hover:text-[#8b6f47] transition-colors">
                  {country.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 📊 STATS */}
        <div
          ref={statsRef}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-[#efe4d7] pt-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-3xl border border-[#f3e9dc] bg-white/80 backdrop-blur-sm py-5 px-3"
            >
              <p className="font-serif-display text-3xl md:text-4xl font-light text-[#8b6f47]">
                <CountUpValue
                  end={stat.end}
                  suffix={stat.suffix}
                  play={inView}
                />
              </p>
              <p className="text-xs text-gray-500 mt-1 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldwideDelivery;
