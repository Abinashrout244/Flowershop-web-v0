import { useNavigate } from "react-router-dom";

const sentiments = [
  {
    title: "Get Well Soon",
    subtitle: "Warm wishes wrapped in petals",
    image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=700&q=85",
    href: "/flowers",
  },
  {
    title: "For Sympathy",
    subtitle: "Gentle comfort through nature's grace",
    image: "https://images.unsplash.com/photo-1538998073820-4dfa76300194?w=700&q=85",
    href: "/flowers",
  },
  {
    title: "Apologies",
    subtitle: "Let flowers speak when words fall short",
    image: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2??w=700&q=85",
    href: "/flowers",
  },
];

const SoftSentiments = () => {
  const navigate = useNavigate();
  return (
  <section className="py-14 md:py-20 bg-[#faf9f7]">
    <div className="max-w-7xl mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">Express Every Emotion</p>
        <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3">
          Soft Sentiments
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-light max-w-sm mx-auto leading-relaxed">
          Say more, with the universal language of flowers.
        </p>
        <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sentiments.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.href)}
            className="group relative overflow-hidden rounded-3xl cursor-pointer aspect-[3/4]"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-serif-display text-2xl font-light text-white mb-1">{item.title}</h3>
              <p className="text-white/70 text-xs font-light tracking-wide mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.subtitle}
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(item.href); }}
                className="text-[11px] font-semibold text-white border border-white/50 px-5 py-2 rounded-full hover:bg-white hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100 duration-300 tracking-widest uppercase"
              >
                Shop Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default SoftSentiments;




