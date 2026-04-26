import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSectionTheme } from "../../../hooks/useSectionTheme";

const sentiments = [
  { title: "Get Well Soon", subtitle: "Warm wishes wrapped in petals", image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=700&q=85", href: "/flowers" },
  { title: "For Sympathy", subtitle: "Gentle comfort through nature's grace", image: "https://images.unsplash.com/photo-1538998073820-4dfa76300194?w=700&q=85", href: "/flowers" },
  { title: "Apologies", subtitle: "Let flowers speak when words fall short", image: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=700&q=85", href: "/flowers" },
];

const SoftSentiments = () => {
  const navigate = useNavigate();
  const { bgAlt, heading, subheading, divider } = useSectionTheme();

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
          <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">Express Every Emotion</p>
          <h2 className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light mb-3 ${heading}`}>Soft Sentiments</h2>
          <p className={`text-sm md:text-base font-light max-w-sm mx-auto leading-relaxed ${subheading}`}>Say more, with the universal language of flowers.</p>
          <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-5" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sentiments.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => navigate(item.href)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer aspect-[3/4] border border-white/8 hover:border-[#c9a87c]/30 transition-colors duration-300"
            >
              <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-serif-display text-2xl font-light text-white mb-1">{item.title}</h3>
                <p className="text-white/60 text-xs font-light tracking-wide mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.subtitle}</p>
                <button onClick={(e) => { e.stopPropagation(); navigate(item.href); }}
                  className="text-[11px] font-semibold text-white border border-white/30 px-5 py-2 rounded-full hover:bg-white hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100 duration-300 tracking-widest uppercase">
                  Shop Now →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSentiments;
