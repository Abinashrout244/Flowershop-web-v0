import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const countries = [
  {
    name: "India",
    flag: "🇮🇳",
    tagline: "Express Delivery",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    tagline: "Same Day",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    tagline: "Next Day",
    image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&q=80",
  },
  {
    name: "UAE",
    flag: "🇦🇪",
    tagline: "Same Day",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Next Day",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Express",
    image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=400&q=80",
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    tagline: "Same Day",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80",
  },
];

const WorldwideDelivery = () => (
  <section className="py-14 md:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">We Deliver Everywhere</p>
        <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3">
          Worldwide Delivery
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-light">
          Across <span className="text-[#c9a87c] font-semibold">135+</span> Countries — freshness guaranteed.
        </p>
        <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-5" />
      </div>

      <Swiper
        className="home-swiper-nav"
        modules={[Navigation, A11y]}
        slidesPerView={2}
        spaceBetween={14}
        navigation
        grabCursor
        loop
        breakpoints={{
          480:  { slidesPerView: 3, spaceBetween: 16 },
          768:  { slidesPerView: 4, spaceBetween: 18 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {countries.map((country) => (
          <SwiperSlide key={country.name}>
            <div className="group cursor-pointer text-center pb-2">
              {/* Image square */}
              <div className="relative overflow-hidden rounded-2xl aspect-square mb-3 shadow-sm border border-gray-100 group-hover:shadow-lg transition-shadow">
                <img
                  src={country.image}
                  alt={country.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                {/* Flag badge */}
                <div className="absolute top-2.5 right-2.5 text-xl drop-shadow">{country.flag}</div>
              </div>
              <p className="text-sm font-semibold text-gray-800 group-hover:text-[#c9a87c] transition-colors">
                {country.name}
              </p>
              <p className="text-[10px] text-[#c9a87c] font-semibold tracking-widest uppercase mt-0.5">
                {country.tagline}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stats row */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-100 pt-8">
        {[
          { value: "135+", label: "Countries Served" },
          { value: "10M+", label: "Happy Customers" },
          { value: "50K+", label: "Orders Daily" },
          { value: "100%", label: "Fresh Guaranteed" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif-display text-3xl md:text-4xl font-light text-[#c9a87c]">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1 tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WorldwideDelivery;
