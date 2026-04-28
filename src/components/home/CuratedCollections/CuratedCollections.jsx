import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSectionTheme } from "../../../hooks/useSectionTheme";

const BASE = "https://images.unsplash.com/";
const collections = [
  { label: "Birthday", image: `${BASE}photo-1519378058457-4c29a0a2efac?w=800&q=85&auto=format`, count: "48 items", href: "/shop?category=Mixed" },
  { label: "Grand Gestures", image: `${BASE}photo-1680563094046-5d846e2c59d1?w=800&q=85&auto=format`, count: "32 items", href: "/shop?category=Roses" },
  { label: "Anniversary", image: `${BASE}photo-1518621736915-f3b1c41bfd00?w=800&q=85&auto=format`, count: "56 items", href: "/shop?category=Roses" },
  { label: "Flowers & Candles", image: `${BASE}photo-1503525766218-8efbcfe836a0?w=800&q=85&auto=format`, count: "24 items", href: "/gifts" },
  { label: "Vase Arrangements", image: `${BASE}photo-1508610048659-a06b669e3321?w=800&q=85&auto=format`, count: "19 items", href: "/flowers" },
  { label: "Hand Tied Bouquets", image: `${BASE}photo-1652346107876-58d7354ce9b8?w=800&q=85&auto=format`, count: "37 items", href: "/flowers" },
  { label: "Pastel Collection", image: `${BASE}photo-1458682625221-3a45f8a844c7?w=800&q=85&auto=format`, count: "29 items", href: "/shop?category=Mixed" },
  { label: "Wildflower Meadow", image: `${BASE}photo-1505129137389-dc838a46f3f9?w=800&q=85&auto=format`, count: "21 items", href: "/flowers" },
];

const CuratedCollections = () => {
  const navigate = useNavigate();
  const { bg, heading, subheading, btnOutline, divider } = useSectionTheme();

  return (
    <section className={`py-14 md:py-20 relative ${bg}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${divider}`} />
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">Handpicked For You</p>
          <h2 className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light mb-3 ${heading}`}>Curated Collections</h2>
          <p className={`text-sm md:text-base font-light max-w-md mx-auto ${subheading}`}>Thoughtfully arranged collections for every occasion, mood, and story.</p>
          <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-5" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {collections.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => navigate(col.href)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer border border-white/[0.12] hover:border-[#c9a87c]/40 hover:shadow-[0_0_40px_rgba(201,168,124,0.18),0_12px_48px_rgba(0,0,0,0.55)] transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={col.image} alt={col.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-lg font-medium tracking-wide">{col.label}</p>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-1">{col.count}</p>
              </div>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <button onClick={(e) => { e.stopPropagation(); navigate(col.href); }} className="px-6 py-2.5 text-sm font-semibold tracking-wide text-white border border-white/50 rounded-full hover:bg-white hover:text-black transition-all duration-300">View Collection</button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-10">
          <button onClick={() => navigate("/shop")} className={`px-10 py-3.5 text-sm font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${btnOutline}`}>Browse All Collections</button>
        </motion.div>
      </div>
    </section>
  );
};

export default CuratedCollections;
