import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useSectionTheme } from "../../../hooks/useSectionTheme";

const publications = [
  { name: "Rose Bouquet", category: "Romantic", img: "https://images.unsplash.com/photo-1510232227693-0ec5a507727c?w=600&auto=format", accent: "#d2b48c" },
  { name: "White Lilies", category: "Elegant", img: "https://images.unsplash.com/photo-1598764557991-b9f211b73b81?q=80&w=600&auto=format", accent: "#b89c72" },
  { name: "Orchid Bloom", category: "Luxury", img: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=600&auto=format", accent: "#d2b48c" },
  { name: "Sunflower Bunch", category: "Bright", img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=600&auto=format", accent: "#a0845c" },
  { name: "Pink Tulips", category: "Soft", img: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=600&auto=format", accent: "#d2b48c" },
  { name: "Mixed Bouquet", category: "Classic", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format", accent: "#b89c72" },

  { name: "Red Roses", category: "Love", img: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=600&auto=format", accent: "#d2b48c" },
  { name: "Peony Garden", category: "Premium", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format", accent: "#a0845c" },
  { name: "Lavender Field", category: "Calm", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=600&auto=format", accent: "#d2b48c" },
  { name: "Daisy Fresh", category: "Fresh", img: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?q=80&w=600&auto=format", accent: "#b89c72" },
  { name: "Wedding Bouquet", category: "Bridal", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format", accent: "#d2b48c" },
  { name: "Exotic Mix", category: "Luxury", img: "https://images.unsplash.com/photo-1506193740263-c75b058a9463?q=80&w=600&auto=format", accent: "#a0845c" },

  { name: "Floral Basket", category: "Gift", img: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=600&auto=format", accent: "#d2b48c" },
  { name: "Spring Flowers", category: "Seasonal", img: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?q=80&w=600&auto=format", accent: "#b89c72" },
  { name: "Bloom Box", category: "Modern", img: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=600&auto=format", accent: "#d2b48c" },
  { name: "Garden Roses", category: "Classic", img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=600&auto=format", accent: "#a0845c" },
  { name: "Luxury Arrangement", category: "Premium", img: "https://images.unsplash.com/photo-1518709268805-4e90f2af0f23?q=80&w=600&auto=format", accent: "#d2b48c" },
  { name: "Anniversary Flowers", category: "Occasion", img: "https://images.unsplash.com/photo-1519214605650-76a613ee3245?q=80&w=600&auto=format", accent: "#b89c72" },
];

// Split into 3 rows (6/6/6) and double to create loop
const row1 = [...publications.slice(0, 6), ...publications.slice(0, 6)];
const row2 = [...publications.slice(6, 12), ...publications.slice(6, 12)];
const row3 = [...publications.slice(12, 18), ...publications.slice(12, 18)];

const PubCard = ({ item, isDark }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [10, -10]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-12, 12]), { stiffness: 300, damping: 25 });
  const shimmerX = useTransform(mouseX, [-80, 80], [-40, 140]);
  const shimmerY = useTransform(mouseY, [-60, 60], [-40, 140]);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { mouseX.set(0); mouseY.set(0); };

  const borderCol = isDark ? "rgba(210, 180, 140, 0.18)" : "rgba(160, 110, 60, 0.15)";
  const bgCol = isDark ? "rgba(10, 7, 3, 0.7)" : "rgba(255, 250, 245, 0.7)";

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ scale: { type: "spring", stiffness: 400, damping: 20, borderColor: borderCol, backgroundColor: bgCol, backdropFilter: "blur(12px)"} }}
      className={`
        relative flex-shrink-0 cursor-pointer group
        w-[140px] h-[88px] sm:w-[170px] sm:h-[105px]
        md:w-[200px] md:h-[120px] lg:w-[220px] lg:h-[132px]
        rounded-2xl overflow-hidden
        transition-shadow duration-500 will-change-transform
        ${isDark
          ? "border shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "border shadow-[0_4px_24px_rgba(160,110,60,0.06)]"
        }
      `}
     
    >
      {/* Background image container — added padding for "framed" look */}
      <div className="absolute inset-1 rounded-2xl overflow-hidden">
        <motion.img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        />
      </div>

      {/* Main Overlay Gradient */}
      <div className="absolute inset-1 rounded-2xl bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
      
      {/* Dynamic Accent Glow — follows cursor */}
      <motion.div
        className="absolute inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${item.accent}33 0%, transparent 60%)` }}
      />

      {/* Shimmer highlight — follows cursor */}
      <motion.div
        className="absolute inset-1 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 70px at ${shimmerX}% ${shimmerY}%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
          transition: "opacity 0.4s",
        }}
      />

      {/* Top badge — updated premium style */}
      <div className="absolute top-3.5 left-3.5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
        <span
          className="text-[9px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full text-white"
          style={{ background: item.accent + "40", border: `0.5px solid ${item.accent}77`, backdropFilter: "blur(10px)" }}
        >
          {item.category}
        </span>
      </div>

      {/* Bottom name bar — updated animation and premium font */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 pt-6 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent">
        <div>
          <p className="text-white text-[10px] sm:text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase leading-none drop-shadow-md">
            {item.name}
          </p>
          <div
            className="mt-2 h-[1.5px] w-0 group-hover:w-full transition-all duration-600 ease-out"
            style={{ background: item.accent }}
          />
        </div>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 scale-75 group-hover:scale-100 ml-2 flex-shrink-0"
          style={{ background: item.accent + "33", border: `0.5px solid ${item.accent}77`, backdropFilter: "blur(10px)" }}
        >
          <svg width="10" height="10" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 6.5L6.5 1.5M6.5 1.5H2.5M6.5 1.5V5.5" stroke={item.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const ScrollRow = ({ items, direction, speed, isDark, className }) => {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
  const range = direction === "left" ? ["0%", `-${speed}%`] : [`-${speed}%`, "0%"];
  const x = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.div
      ref={rowRef}
      style={{ x }}
      className={`flex gap-4 sm:gap-6 will-change-transform ${className}`}
    >
      {items.map((item, i) => (
        <PubCard key={`${item.name}-${i}`} item={item} isDark={isDark} />
      ))}
    </motion.div>
  );
};

const AsSeenOn = () => {
  const { isDark, bgAlt } = useSectionTheme();
  const sectionRef = useRef(null);

  const headingColor = isDark ? "text-white"    : "text-gray-900";
  const subColor     = isDark ? "text-[#d2b48c]/70" : "text-[#a0845c]";
  const bgCol        = isDark ? "bg-[#0a0703]"  : "bg-[#faf8f5]";
  const separatorCol = isDark
    ? "rgba(210,180,140,0.22)"
    : "rgba(160,110,60,0.18)";
  const fadeMaskDark  = "linear-gradient(to right, #0a0703, transparent)";
  const fadeMaskLight = "linear-gradient(to right, #faf8f5, transparent)";

  return (
    <section ref={sectionRef} className={`relative py-16 md:py-24 lg:py-32 overflow-hidden transition-colors duration-500 ${bgCol}`}>

      {/* Separators — inline style avoids broken dynamic Tailwind class */}
      <div className="absolute top-0 inset-x-0 h-px"
           style={{ background: `linear-gradient(to right, transparent, ${separatorCol}, transparent)` }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
           style={{ background: `linear-gradient(to right, transparent, ${separatorCol}, transparent)` }} />

      {/* Heading — updated premium styling */}
      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="text-center mb-12 md:mb-16 lg:mb-20 px-4"
      >
        <div className="flex items-center justify-center gap-3.5 mb-4">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#d2b48c]/80" />
          <p className={`text-[10px] md:text-[11px] font-bold tracking-[0.45em] uppercase ${subColor}`}>Featured In</p>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#d2b48c]/80" />
        </div>
        <h2 className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight ${headingColor} transition-colors duration-500`}>
          As Seen On
        </h2>
        <div className="flex items-center justify-center gap-2.5 mt-5">
          <div className="h-px w-7 bg-[#d2b48c]/50" />
          <div className="w-2 h-2 rounded-full border border-[#d2b48c] bg-transparent" />
          <div className="h-px w-7 bg-[#d2b48c]/50" />
        </div>
      </motion.div>

      {/* Rows — clipped container */}
      <div className="overflow-hidden space-y-4 sm:space-y-6">
        {/* Row 1: scrolls LEFT */}
        <ScrollRow items={row1} direction="left" speed={16} isDark={isDark} className="pl-6" />

        {/* Row 2: scrolls RIGHT */}
        <ScrollRow items={row2} direction="right" speed={14} isDark={isDark} className="pr-6" />

        {/* Row 3: scrolls LEFT */}
        <ScrollRow
          items={row3}
          direction="left"
          speed={18}
          isDark={isDark}
          className="pl-6 md:hidden"
        />
      </div>

      {/* Left / Right fade masks — adjusted for Fleuriga background */}
      <div
        className="absolute inset-y-0 left-0 w-20 sm:w-28 md:w-36 pointer-events-none z-10"
        style={{ background: isDark ? fadeMaskDark : fadeMaskLight }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 sm:w-28 md:w-36 pointer-events-none z-10"
        style={{ background: isDark
          ? "linear-gradient(to left, #0a0703, transparent)"
          : "linear-gradient(to left, #faf8f5, transparent)" }}
      />
    </section>
  );
};

export default AsSeenOn;