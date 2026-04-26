import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { useInView } from "react-intersection-observer";
import { useSectionTheme } from "../../../hooks/useSectionTheme";
import "swiper/css";
import "swiper/css/navigation";

const countries = [
  { name: "India", flag: "IN", tagline: "Express Delivery", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" },
  { name: "United Kingdom", flag: "UK", tagline: "Same Day", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80" },
  { name: "United States", flag: "US", tagline: "Next Day", image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&q=80" },
  { name: "UAE", flag: "AE", tagline: "Same Day", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { name: "Canada", flag: "CA", tagline: "Next Day", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80" },
  { name: "Australia", flag: "AU", tagline: "Express", image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=400&q=80" },
  { name: "Singapore", flag: "SG", tagline: "Same Day", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80" },
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
    const duration = 1400, start = performance.now();
    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, play]);
  return <span>{value}{suffix}</span>;
};

const WorldwideDelivery = () => {
  const { ref: statsRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { bgAlt, heading, subheading, statCard, statValue, statLabel, countryName, divider } = useSectionTheme();

  return (
    <section className={`py-14 md:py-20 relative ${bgAlt}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${divider}`} />
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">We Deliver Everywhere</p>
          <h2 className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light mb-3 ${heading}`}>Worldwide Delivery</h2>
          <p className={`text-sm md:text-base font-light ${subheading}`}>Across <span className="text-[#c9a87c] font-semibold">135+</span> Countries</p>
          <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-5" />
        </motion.div>

        <Swiper modules={[Navigation, A11y]} slidesPerView={2} spaceBetween={14} navigation loop grabCursor
          breakpoints={{ 480: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 5 } }}>
          {countries.map((country, i) => (
            <SwiperSlide key={country.name}>
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[26px] aspect-square mb-3 border border-white/8 group-hover:border-[#c9a87c]/30 transition-colors duration-300">
                  <img src={country.image} alt={country.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <span className="px-4 py-2 text-xs uppercase tracking-widest border border-white/50 text-white rounded-full">Explore</span>
                  </div>
                  <div className="absolute top-3 left-3 text-[10px] bg-black/60 border border-white/15 text-white px-2 py-1 rounded-full backdrop-blur">{country.flag}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">{country.name}</p>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest">{country.tagline}</p>
                  </div>
                </div>
                <p className={`text-sm text-center font-medium transition-colors ${countryName}`}>{country.name}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div ref={statsRef} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-white/8 pt-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`text-center rounded-3xl backdrop-blur-sm py-5 px-3 transition-colors duration-300 ${statCard}`}>
              <p className={`font-serif-display text-3xl md:text-4xl font-light ${statValue}`}><CountUpValue end={stat.end} suffix={stat.suffix} play={inView} /></p>
              <p className={`text-xs mt-1 tracking-wide ${statLabel}`}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldwideDelivery;
