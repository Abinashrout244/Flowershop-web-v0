import { useState } from "react";

const fullText = `Sending flowers online has never been more elegant or effortless. Whether you're celebrating a joyful birthday, expressing heartfelt condolences, or simply saying "I'm thinking of you," Flora & Bloom ensures every bouquet arrives in peak perfection.

Our expert florists curate each arrangement with seasonal blooms, ethically sourced from sustainable farms across India and around the world. From the moment your flowers are cut to the second they're delivered to your loved one's doorstep, freshness is our obsession.

We offer same-day delivery across 150+ Indian cities and express international shipping to 135+ countries. Every order is gift-wrapped in our signature packaging — because the unboxing experience is part of the gift.

With over 100 years of floral expertise, thousands of five-star reviews, and a commitment to sustainable practices, Flora & Bloom is more than a flower shop. We are the custodians of moments that matter — the births, the proposals, the apologies, and the everyday "I love you"s that make life beautiful.`;

const shortText = fullText.slice(0, 380) + "...";

const ContentSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-14 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#c9a87c] uppercase mb-4">
          Why Choose Flora & Bloom
        </p>
        <h2 className="font-serif-display text-2xl md:text-3xl font-light text-gray-900 mb-6">
          Sending Flowers Online — Reimagined
        </h2>
        <div className="w-12 h-px bg-[#c9a87c] mx-auto mb-8" />
        <p className="text-gray-500 text-sm md:text-base leading-loose font-light text-left whitespace-pre-line">
          {expanded ? fullText : shortText}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-8 px-10 py-3.5 border border-[#1a1a1a] text-sm font-semibold tracking-[0.2em] uppercase text-gray-800 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
        >
          {expanded ? "SHOW LESS" : "SHOW MORE"}
        </button>
      </div>
    </section>
  );
};

export default ContentSection;


