import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SummerBanner = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden h-80 md:h-[480px] lg:h-[520px]">
      <img
        src="https://images.unsplash.com/photo-1629385354811-aaf27a5862d5?w=1600&q=85"
        alt="Summer Blooms"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[8s]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
      {/* Glass shimmer band */}
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-[#c9a87c]/30 to-transparent" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#c9a87c] text-xs tracking-[0.4em] uppercase font-semibold mb-4"
        >
          Limited Season Collection
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-widest uppercase mb-4"
        >
          Summer Blooms
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-sm md:text-base max-w-sm mb-8 font-light leading-relaxed"
        >
          Vibrant, sun-kissed florals handpicked for the season. While stocks last.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => navigate("/flowers")}
          className="group liquid-glass-strong rounded-full px-10 py-4 border border-white/20 text-white text-sm font-semibold tracking-[0.25em] uppercase flex items-center gap-2 hover:border-[#c9a87c]/50 hover:text-[#c9a87c] transition-all duration-400"
        >
          EXPLORE COLLECTION
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </motion.button>

        {/* Floating badge */}
        <div className="absolute bottom-6 right-6 md:right-12 liquid-glass border border-white/10 text-white rounded-2xl px-5 py-3 text-center hidden md:block">
          <p className="text-xl font-bold font-serif-display">40%</p>
          <p className="text-[10px] tracking-widest opacity-80 uppercase">Off Today</p>
        </div>
      </div>
    </section>
  );
};

export default SummerBanner;
