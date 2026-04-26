import { useState } from "react";
import { motion } from "framer-motion";
import { useSectionTheme } from "../../../hooks/useSectionTheme";

const fullText = `Sending flowers online has never been more elegant or effortless. Whether you're celebrating a joyful birthday, expressing heartfelt condolences, or simply saying "I'm thinking of you," Flora & Bloom ensures every bouquet arrives in peak perfection.

Our expert florists curate each arrangement with seasonal blooms, ethically sourced from sustainable farms across India and around the world. From the moment your flowers are cut to the second they're delivered to your loved one's doorstep, freshness is our obsession.

We offer same-day delivery across 150+ Indian cities and express international shipping to 135+ countries. Every order is gift-wrapped in our signature packaging — because the unboxing experience is part of the gift.

With over 100 years of floral expertise, thousands of five-star reviews, and a commitment to sustainable practices, Flora & Bloom is more than a flower shop. We are the custodians of moments that matter — the births, the proposals, the apologies, and the everyday "I love you"s that make life beautiful.`;

const shortText = fullText.slice(0, 380) + "...";

const ContentSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { bg, heading, subheading, btnOutline, divider } = useSectionTheme();

  return (
    <section className={`py-14 md:py-20 relative ${bg}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${divider}`} />
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}>
          <p className="text-xs font-semibold tracking-[0.35em] text-[#c9a87c] uppercase mb-4">Why Choose Flora & Bloom</p>
          <h2 className={`font-serif-display text-2xl md:text-3xl font-light mb-6 ${heading}`}>Sending Flowers Online — Reimagined</h2>
          <div className="w-12 h-px bg-[#c9a87c] mx-auto mb-8" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          className={`text-sm md:text-base leading-loose font-light text-left whitespace-pre-line ${subheading}`}>
          {expanded ? fullText : shortText}
        </motion.p>
        <motion.button initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => setExpanded(!expanded)}
          className={`mt-8 px-10 py-3.5 text-sm font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${btnOutline}`}>
          {expanded ? "SHOW LESS" : "SHOW MORE"}
        </motion.button>
      </div>
    </section>
  );
};

export default ContentSection;
