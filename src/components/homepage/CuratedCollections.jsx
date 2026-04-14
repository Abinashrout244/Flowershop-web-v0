import { useNavigate } from "react-router-dom";

const BASE = "https://images.unsplash.com/";

const collections = [
  {
    label: "Birthday",
    image: `${BASE}photo-1519378058457-4c29a0a2efac?w=800&q=85&auto=format`,
    count: "48 items",
    href: "/shop?category=Mixed",
  },
  {
    label: "Grand Gestures",
    image: `${BASE}photo-1680563094046-5d846e2c59d1?w=800&q=85&auto=format`,
    count: "32 items",
    href: "/shop?category=Roses",
  },
  {
    label: "Anniversary",
    image: `${BASE}photo-1518621736915-f3b1c41bfd00?w=800&q=85&auto=format`,
    count: "56 items",
    href: "/shop?category=Roses",
  },
  {
    label: "Flowers & Candles",
    image: `${BASE}photo-1503525766218-8efbcfe836a0?w=800&q=85&auto=format`,
    count: "24 items",
    href: "/gifts",
  },
  {
    label: "Vase Arrangements",
    image: `${BASE}photo-1508610048659-a06b669e3321?w=800&q=85&auto=format`,
    count: "19 items",
    href: "/flowers",
  },
  {
    label: "Hand Tied Bouquets",
    image: `${BASE}photo-1652346107876-58d7354ce9b8?w=800&q=85&auto=format`,
    count: "37 items",
    href: "/flowers",
  },
  {
    label: "Pastel Collection",
    image: `${BASE}photo-1458682625221-3a45f8a844c7?w=800&q=85&auto=format`,
    count: "29 items",
    href: "/shop?category=Mixed",
  },
  {
    label: "Wildflower Meadow",
    image: `${BASE}photo-1505129137389-dc838a46f3f9?w=800&q=85&auto=format`,
    count: "21 items",
    href: "/flowers",
  },
];

const CuratedCollections = () => {
  const navigate = useNavigate();
  return (
  <section className="py-14 md:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">Handpicked For You</p>
        <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3">
          Curated Collections
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-light max-w-md mx-auto">
          Thoughtfully arranged collections for every occasion, mood, and story.
        </p>
        <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-5" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {collections.map((col) => (
          <div
            key={col.label}
            onClick={() => navigate(col.href)}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="aspect-[4/5]">
              <img
                src={col.image}
                alt={col.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-sm px-4 py-3.5">
              <p className="text-white font-semibold text-sm tracking-wide">{col.label}</p>
              <p className="text-white/60 text-[10px] tracking-widest uppercase mt-0.5">{col.count}</p>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20">
              <span className="text-white text-base">→</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/shop")}
          className="px-10 py-3.5 border border-[#1a1a1a] text-sm font-semibold tracking-[0.2em] uppercase text-gray-800 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
        >
          Browse All Collections
        </button>
      </div>
    </div>
  </section>
  );
};

export default CuratedCollections;


