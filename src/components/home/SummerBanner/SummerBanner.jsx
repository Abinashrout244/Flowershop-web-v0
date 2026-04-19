import { useNavigate } from "react-router-dom";

const SummerBanner = () => {
  const navigate = useNavigate();
  return (
    <section className="banner-wrapper  relative overflow-hidden h-80 md:h-[480px] lg:h-[520px] my-0">
      {/* Background image with zoom effect */}
      <img
        src="https://images.unsplash.com/photo-1629385354811-aaf27a5862d5?w=1600&q=85"
        alt="Summer Blooms"
        loading="lazy"
        className="banner-zoom absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/15" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <p className="text-[#c9a87c] text-xs tracking-[0.4em] uppercase font-semibold mb-4 drop-shadow">
          Limited Season Collection
        </p>
        <h2 className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-widest uppercase mb-4 drop-shadow-lg">
          Summer Blooms
        </h2>
        <p className="text-white/80 text-sm md:text-base max-w-sm mb-8 font-light leading-relaxed">
          Vibrant, sun-kissed florals handpicked for the season. While stocks
          last.
        </p>
        <button
          onClick={() => navigate("/flowers")}
          className="group px-10 py-4 border-2 border-white text-white text-sm font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-white hover:text-gray-900 transition-all duration-400 flex items-center gap-2"
        >
          EXPLORE COLLECTION
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>

        {/* Bottom floating badge */}
        <div className="absolute bottom-6 right-6 md:right-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl px-5 py-3 text-center hidden md:block">
          <p className="text-xl font-bold font-serif-display">40%</p>
          <p className="text-[10px] tracking-widest opacity-80 uppercase">
            Off Today
          </p>
        </div>
      </div>
    </section>
  );
};

export default SummerBanner;


