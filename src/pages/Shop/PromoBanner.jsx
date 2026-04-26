import React from "react";
import { useNavigate } from "react-router-dom";
import { FLOWER_ONLY_IMAGES } from "./ShopInfo";
import { Sparkles } from "lucide-react";

const PromoBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-14 relative overflow-hidden rounded-3xl">
      <img
        src="https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=1400&q=80"
        alt="Promo"
        onError={(e) => {
          e.currentTarget.src = FLOWER_ONLY_IMAGES.default[2];
        }}
        className="w-full h-40 md:h-56 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-14">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-[#c9a87c]" />
          <p className="text-[#c9a87c] text-xs font-bold tracking-[0.35em] uppercase">
            Exclusive Offer
          </p>
        </div>
        <h2 className="font-serif-display text-2xl md:text-4xl font-light text-white mb-2">
          Get 20% off your first order
        </h2>
        <p className="text-white/70 text-sm mb-4">
          Use code{" "}
          <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">
            BLOOM20
          </span>{" "}
          at checkout
        </p>
        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2.5 bg-white text-[#1a1a1a] text-sm font-bold rounded-full 
                hover:bg-[#c9a87c] hover:text-white transition-colors duration-300"
        >
          Shop Now →
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
