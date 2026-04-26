import { motion } from "framer-motion";
import { useSectionTheme } from "../../../hooks/useSectionTheme";

const BrandStory = () => {
  const { bgAccent, heading, body, bodyMuted, divider } = useSectionTheme();

  return (
    <section className={`py-14 md:py-24 relative ${bgAccent}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${divider}`} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-3xl aspect-[3/4] md:aspect-auto md:h-[540px] border border-white/8 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1685798066531-543166f5f425?w=800&q=80" alt="Founder Anuja Joshi" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            {/* Quote card */}
            <div className="absolute -bottom-6 -right-4 md:-right-10 liquid-glass border border-white/15 rounded-2xl px-5 py-4 max-w-[200px] shadow-xl">
              <p className="font-serif-display text-3xl text-[#c9a87c] leading-none mb-1">"</p>
              <p className="text-xs text-white/70 leading-relaxed font-light italic">Every bloom tells a story only the heart can read.</p>
              <p className="text-[10px] font-semibold text-white/40 mt-2 tracking-widest uppercase">— Anuja Joshi</p>
            </div>
            {/* Years badge */}
            <div className="absolute -top-4 -left-4 md:-left-8 bg-[#c9a87c] text-white rounded-2xl px-5 py-4 text-center shadow-lg">
              <p className="font-serif-display text-4xl font-light leading-none">100</p>
              <p className="text-[10px] tracking-widest uppercase font-semibold opacity-90 mt-0.5">Years</p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:pl-4"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-4">Our Heritage</p>
            <h2 className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 ${heading}`}>
              Celebrating <span className="text-[#c9a87c] italic">100</span> Incredible Years
            </h2>
            <div className="w-12 h-px bg-[#c9a87c] mb-6" />
            <p className={`text-base leading-relaxed mb-5 font-light ${body}`}>Since 1924, Flora & Bloom has been India's most beloved floral destination. What began as a small family garden in Pune has blossomed into a nationwide celebration of nature's most beautiful creations.</p>
            <p className={`text-sm leading-relaxed mb-8 font-light ${bodyMuted}`}>With over a century of craftsmanship, we've had the privilege of being part of millions of life's most meaningful moments — weddings, anniversaries, births, and quiet, everyday gestures of love.</p>

            {/* Milestones */}
            <div className={`grid grid-cols-3 gap-4 mb-10 py-6 border-y ${divider.includes("white") ? "border-white/8" : "border-[#e8ddd1]"}`}>
              {[{ value: "1924", label: "Est. Year" }, { value: "500+", label: "Expert Florists" }, { value: "10M+", label: "Happy Customers" }].map((m) => (
                <div key={m.label} className="text-center">
                  <p className="font-serif-display text-2xl text-[#c9a87c]">{m.value}</p>
                  <p className={`text-[10px] tracking-wide mt-1 uppercase ${bodyMuted}`}>{m.label}</p>
                </div>
              ))}
            </div>

            {/* Founder */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#c9a87c]/30 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80" alt="Anuja Joshi" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className={`font-semibold text-sm ${heading}`}>Anuja Joshi</p>
                <p className={`text-xs tracking-wide ${bodyMuted}`}>Founder & Creative Director</p>
              </div>
              <div className="ml-auto">
                <button className="text-sm font-semibold text-[#c9a87c] tracking-wide hover:underline">Read Our Story →</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
