import React from "react";

import {
  HERO_SLIDES,
  FLOWER_ONLY_IMAGES,
  COLLECTIONS,
  COLLECTION_IMAGES,
} from "./ShopInfo";

import { ChevronRight, ChevronLeft } from "lucide-react";

const HeroBanner = ({ activeCollection, sorted, heroIndex, setHeroIndex }) => {
  const currentCollection = COLLECTIONS.find((c) => c.id === activeCollection);
  const activeSlide = HERO_SLIDES[heroIndex];
  const collectionHeroImg =
    COLLECTION_IMAGES[activeCollection] || COLLECTION_IMAGES["All"];
  return (
    <div className="relative hidden md:block md:h-[320px] lg:h-[400px] overflow-hidden">
      <img
        src={collectionHeroImg}
        alt={activeCollection}
        onError={(e) => {
          e.currentTarget.src = FLOWER_ONLY_IMAGES.default[1];
        }}
        className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px] opacity-70"
        style={{ objectPosition: "center 40%" }}
      />
      <img
        src={activeSlide.image}
        alt={activeSlide.title}
        onError={(e) => {
          e.currentTarget.src = FLOWER_ONLY_IMAGES.default[0];
        }}
        className="w-full h-full object-cover scale-[1.05] transition-all duration-1000 ease-in-out"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20 flex flex-col items-start justify-center px-8 md:px-16">
        <p className="text-[#c9a87c] text-xs tracking-[0.4em] uppercase font-bold mb-2 drop-shadow">
          {currentCollection?.icon} Flora & Bloom
        </p>
        <p className="text-[10px] md:text-xs tracking-[0.32em] uppercase text-white/80 mb-1.5">
          {activeSlide.eyebrow}
        </p>
        <h1 className="font-serif-display text-3xl md:text-5xl font-light text-white mb-2 leading-tight max-w-3xl">
          {activeSlide.title}
        </h1>
        <p className="text-white/80 text-xs md:text-sm max-w-2xl mb-3">
          {activeSlide.subtitle}
        </p>
        <p className="text-white/70 text-xs md:text-sm">
          {activeCollection === "All"
            ? "The Full Collection"
            : currentCollection?.label}{" "}
          · {sorted.length} products · Free delivery above ₹999
        </p>
      </div>
      <div className="absolute right-4 md:right-8 bottom-4 hidden md:flex items-center gap-2.5">
        <button
          onClick={() =>
            setHeroIndex(
              (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
            )
          }
          className="group w-10 h-10 rounded-full bg-gradient-to-br from-[#f3e3c8]/70 to-[#c9a87c]/40 border border-[#f2dfbf]/70 text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md flex items-center justify-center hover:from-[#f3e3c8]/90 hover:to-[#c9a87c]/60 hover:scale-105 transition-all duration-300"
          aria-label="Previous banner"
        >
          <ChevronLeft
            size={15}
            className="drop-shadow-sm group-hover:-translate-x-0.5 transition-transform duration-300"
          />
        </button>
        <button
          onClick={() =>
            setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length)
          }
          className="group w-10 h-10 rounded-full bg-gradient-to-br from-[#f3e3c8]/70 to-[#c9a87c]/40 border border-[#f2dfbf]/70 text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md flex items-center justify-center hover:from-[#f3e3c8]/90 hover:to-[#c9a87c]/60 hover:scale-105 transition-all duration-300"
          aria-label="Next banner"
        >
          <ChevronRight
            size={15}
            className="drop-shadow-sm group-hover:translate-x-0.5 transition-transform duration-300"
          />
        </button>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.title}
            onClick={() => setHeroIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === heroIndex ? "w-8 bg-[#c9a87c]" : "w-3 bg-white/60 hover:bg-white/80"}`}
            aria-label={`Go to banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
