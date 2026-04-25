import React from "react";
import { products } from "../../data/flowers";
import { Sparkles } from "lucide-react";

const HeroBanner = () => {
  return (
    <header className="relative mx-4 mb-10 overflow-hidden rounded-3xl md:mx-8 lg:mx-auto lg:max-w-7xl">
      <img
        src="https://images.unsplash.com/photo-1533907650686-70576141c030?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Fresh Flowers"
        className="h-64 w-full object-cover md:h-80 lg:h-[420px]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a87c] opacity-15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-1/3 h-56 w-56 rounded-full bg-rose-400 opacity-10 blur-2xl" />

      {/* Hero text */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-14">
        {/* Pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a87c]/40 bg-[#c9a87c]/15 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles size={11} className="text-[#c9a87c]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a87c]">
            Farm Fresh
          </span>
        </div>

        <h1 className="font-serif text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
          Fresh <span className="italic text-[#c9a87c]">Flowers</span>
        </h1>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
          Handpicked blooms from the finest farms — delivered fresh to your
          door, same day.
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-6">
          {[
            { val: `${products.length}+`, label: "Varieties" },
            { val: "Same Day", label: "Delivery" },
            { val: "Farm", label: "Fresh" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-xl font-light text-[#c9a87c]">
                {s.val}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-white/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HeroBanner;
