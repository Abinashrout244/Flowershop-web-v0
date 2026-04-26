import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BASE = "https://images.unsplash.com/";

const categories = [
  {
    img: `${BASE}photo-1496062031456-07b8f162a322?w=300`,
    label: "All",
    url: "/shop",
  },
  {
    img: `${BASE}photo-1586082207282-3dcb61d25ebd?w=300`,
    label: "Roses",
    url: "/shop?category=Roses",
  },
  {
    img: `${BASE}photo-1551945326-df678a97c3af?w=300`,
    label: "Sunflowers",
    url: "/shop?category=Sunflowers",
  },
  {
    img: `${BASE}photo-1486102515046-44130769cb25?w=300`,
    label: "Lilies",
    url: "/shop?category=Lilies",
  },
  {
    img: `${BASE}photo-1587316830148-c9b01df2da38?w=300`,
    label: "Tulips",
    url: "/shop?category=Tulips",
  },
  {
    img: `${BASE}photo-1605996370592-b6f7a81e382e?w=300`,
    label: "Orchids",
    url: "/shop?category=Orchids",
  },
  {
    img: `${BASE}photo-1602934585418-f588bea4215c?w=300`,
    label: "Mixed Bouquets",
    url: "/shop?category=Mixed",
  },
  {
    img: `${BASE}photo-1601004890684-d8cbf643f5f2?w=300`,
    label: "Gift Hampers",
    url: "/shop?category=Gifts",
  },
  {
    img: "https://images.unsplash.com/photo-1598764557991-b9f211b73b81?q=80&w=300&auto=format&fit=crop",
    label: "Plants",
    url: "/shop?category=Plants",
  },
  {
    img: `${BASE}photo-1614594975525-e45190c55d0b?w=300`,
    label: "Indoor Plants",
    url: "/shop?category=Plants&subcategory=Indoor",
  },
  {
    img: `${BASE}photo-1459411552884-841db9b3cc2a?w=300`,
    label: "Succulents",
    url: "/shop?category=Plants&subcategory=Succulents",
  },
  {
    img: `${BASE}photo-1688481156464-4285423c8b39?w=300`,
    label: "Tropical",
    url: "/shop?category=Tropical",
  },
  {
    img: `${BASE}photo-1563245159-f793f19d8c37?w=300`,
    label: "Seasonal",
    url: "/shop?category=Seasonal",
  },
  {
    img: `${BASE}photo-1597583995844-edce63cc1cb0?w=300`,
    label: "Luxury",
    url: "/shop?badge=Luxury",
  },
  {
    img: `${BASE}photo-1595886535782-0f757640a574?w=300`,
    label: "Trending",
    url: "/shop?badge=Trending",
  },
  {
    img: `${BASE}photo-1530103043960-ef38714abb15?w=300`,
    label: "Birthday",
    url: "/shop?occasion=Birthday",
  },
  {
    img: `${BASE}photo-1602934585418-f588bea4215c?w=300`,
    label: "Anniversary",
    url: "/shop?occasion=Anniversary",
  },
  {
    img: `${BASE}photo-1559849608-e88ec5d1c6f4?w=300`,
    label: "Celebrations",
    url: "/shop?occasion=Congratulations",
  },
  {
    img: `${BASE}photo-1486102515046-44130769cb25?w=300`,
    label: "Sympathy",
    url: "/shop?occasion=Sympathy",
  },
];

const CategoryStrip = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  return (
    /* ── Transition bridge: dark hero → light shop sections ── */
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #000 0%, #0a0a0a 90%, #ffffff 100%)",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
      }}
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Section label */}
      <p className="text-center text-[11px] font-body font-light tracking-[0.25em] uppercase text-white/40 mb-5 px-4">
        Browse by category
      </p>

      {/* Horizontally scrollable pill strip */}
      <div className="flex items-center gap-3 overflow-x-auto px-6 pb-1 cat-strip">
        {categories.map((cat, i) => {
          const isActive = active === i;
          return (
            <motion.button
              key={cat.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setActive(i);
                navigate(cat.url);
              }}
              className={`relative flex-shrink-0 flex flex-col items-center gap-2 rounded-2xl px-3 py-3 min-w-[90px] transition-all duration-200 group
                ${
                  isActive
                    ? "bg-white/10 ring-1 ring-white/30"
                    : "bg-white/5 hover:bg-white/10"
                }`}
            >
              {/* Image */}
              <div
                className={`w-14 h-14 rounded-xl overflow-hidden transition-all duration-300
                ${isActive ? "ring-2 ring-[#c9a87c] ring-offset-1 ring-offset-black/80" : "ring-1 ring-white/15 group-hover:ring-white/30"}`}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-body font-medium text-center leading-tight whitespace-nowrap transition-colors duration-200
                ${isActive ? "text-[#c9a87c]" : "text-white/60 group-hover:text-white/90"}`}
              >
                {cat.label}
              </span>

              {/* Active dot */}
              {isActive && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c9a87c]" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom glow line → transitions into white */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a87c]/20 to-transparent" />
    </section>
  );
};

export default CategoryStrip;
