import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSectionTheme } from "../../../hooks/useSectionTheme";

/* Floral images for each publication slot */
const row1 = [
  { name: "Vogue", img: "https://images.unsplash.com/photo-1586082207282-3dcb61d25ebd?w=400&q=85&auto=format" },
  { name: "GQ", img: "https://images.unsplash.com/photo-1531874824027-2a0d33bd6338?w=400&q=85&auto=format" },
  { name: "Architectural Digest", img: "https://images.unsplash.com/photo-1487530811015-780780169edd?w=400&q=85&auto=format" },
  { name: "Harper's Bazaar", img: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=400&q=85&auto=format" },
  { name: "Forbes", img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=85&auto=format" },
  { name: "Elle", img: "https://images.unsplash.com/photo-1566114310145-37ac933c6c69?w=400&q=85&auto=format" },
  { name: "Cosmopolitan", img: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&q=85&auto=format" },
];

const row2 = [
  { name: "Femina", img: "https://images.unsplash.com/photo-1444130086668-4dff92408e0e?w=400&q=85&auto=format" },
  { name: "Verve", img: "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?w=400&q=85&auto=format" },
  { name: "Grazia", img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&q=85&auto=format" },
  { name: "Marie Claire", img: "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?w=400&q=85&auto=format" },
  { name: "Tatler", img: "https://images.unsplash.com/photo-1587316830148-c9b01df2da38?w=400&q=85&auto=format" },
  { name: "Condé Nast", img: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400&q=85&auto=format" },
  { name: "Brides", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=85&auto=format" },
];

/* Duplicate for seamless loop */
const dupRow1 = [...row1, ...row1];
const dupRow2 = [...row2, ...row2];

const AsSeenOn = () => {
  const { isDark, bgAlt } = useSectionTheme();
  const sectionRef = useRef(null);

  /* Track scroll progress through this section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Row 1 scrolls left (negative direction) as user scrolls */
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  /* Row 2 scrolls right (positive direction) */
  const x2 = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);

  return (
    <section
      ref={sectionRef}
      className={`py-14 md:py-20 overflow-hidden relative ${bgAlt}`}
    >
      {/* Top separator */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isDark ? "via-white/8" : "via-[#c9a87c]/15"} to-transparent`} />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="text-center mb-10 px-4"
      >
        <p className={`text-xs font-semibold tracking-[0.35em] uppercase mb-2 ${isDark ? "text-white/30" : "text-gray-400"}`}>Featured In</p>
        <h2 className={`font-serif-display text-3xl md:text-4xl font-light ${isDark ? "text-white" : "text-gray-900"}`}>As Seen On</h2>
        <div className="w-10 h-px bg-[#c9a87c] mx-auto mt-4" />
      </motion.div>

      {/* ── Clipping container — prevents both rows from causing horizontal scroll ── */}
      <div className="overflow-hidden">
        {/* Row 1 — slides LEFT on scroll */}
        <motion.div style={{ x: x1 }} className="flex gap-3 mb-3 will-change-transform">
          {dupRow1.map((item, i) => (
            <div
              key={`r1-${i}`}
              className={`relative flex-shrink-0 w-36 sm:w-44 md:w-52 h-24 sm:h-28 rounded-2xl overflow-hidden border transition-all duration-300 group ${
                isDark
                  ? "border-white/8 hover:border-[#c9a87c]/30"
                  : "border-[#ede8e1] hover:border-[#c9a87c]/50 shadow-sm"
              }`}
            >
              <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 flex items-end p-3 ${isDark ? "bg-gradient-to-t from-black/70 via-transparent to-transparent" : "bg-gradient-to-t from-black/50 via-transparent to-transparent"}`}>
                <span className="text-white text-[10px] font-semibold tracking-[0.15em] uppercase drop-shadow">{item.name}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 — slides RIGHT on scroll */}
        <motion.div style={{ x: x2 }} className="flex gap-3 will-change-transform">
          {dupRow2.map((item, i) => (
            <div
              key={`r2-${i}`}
              className={`relative flex-shrink-0 w-36 sm:w-44 md:w-52 h-24 sm:h-28 rounded-2xl overflow-hidden border transition-all duration-300 group ${
                isDark
                  ? "border-white/8 hover:border-[#c9a87c]/30"
                  : "border-[#ede8e1] hover:border-[#c9a87c]/50 shadow-sm"
              }`}
            >
              <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 flex items-end p-3 ${isDark ? "bg-gradient-to-t from-black/70 via-transparent to-transparent" : "bg-gradient-to-t from-black/50 via-transparent to-transparent"}`}>
                <span className="text-white text-[10px] font-semibold tracking-[0.15em] uppercase drop-shadow">{item.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isDark ? "via-white/8" : "via-[#c9a87c]/15"} to-transparent`} />
    </section>
  );

};

export default AsSeenOn;
