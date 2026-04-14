const collections = [
  {
    label: "Birthday",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80",
    count: "48 items",
  },
  {
    label: "Grand Gestures",
    image: "https://images.unsplash.com/photo-1599733594230-6b823276d44c?w=600&q=80",
    count: "32 items",
  },
  {
    label: "Anniversary",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&q=80",
    count: "56 items",
  },
  {
    label: "Flowers & Cake",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80",
    count: "24 items",
  },
  {
    label: "Vase Arrangements",
    image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=600&q=80",
    count: "19 items",
  },
  {
    label: "Hand Tied Bouquets",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&q=80",
    count: "37 items",
  },
];

const CuratedCollections = () => (
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {collections.map((col) => (
          <div
            key={col.label}
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
        <button className="px-10 py-3.5 border border-[#1a1a1a] text-sm font-semibold tracking-[0.2em] uppercase text-gray-800 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all duration-300">
          Browse All Collections
        </button>
      </div>
    </div>
  </section>
);

export default CuratedCollections;
