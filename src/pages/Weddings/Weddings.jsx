import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";

const services = [
  {
    title: "Bridal Bouquet",
    desc: "Custom bouquets crafted to match your wedding theme and dress perfectly.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80&auto=format",
    from: "₹4,999",
  },
  {
    title: "Reception Décor",
    desc: "Stunning centrepieces and aisle arrangements that transform any venue.",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&q=80&auto=format",
    from: "₹24,999",
  },
  {
    title: "Mandap Florals",
    desc: "Traditional yet modern floral mandap designs for every ceremony style.",
    image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=600&q=80&auto=format",
    from: "₹14,999",
  },
  {
    title: "Mehendi Décor",
    desc: "Vibrant and fragrant floral setups that make your mehendi unforgettable.",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&q=80&auto=format",
    from: "₹9,999",
  },
  {
    title: "Car & Entry Decoration",
    desc: "Grand entry moments with bespoke floral arches and car decorations.",
    image: "https://images.unsplash.com/photo-1599733594230-6b823276d44c?w=600&q=80&auto=format",
    from: "₹6,999",
  },
  {
    title: "Favourites & Return Gifts",
    desc: "Beautifully packaged floral return gifts your guests will cherish.",
    image: "https://images.unsplash.com/photo-1585668286386-6cbf5e27e5a5?w=600&q=80&auto=format",
    from: "₹199 each",
  },
];

const WeddingsPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />

    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="transition-colors hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Weddings</span>
      </div>
    </div>

    {/* Hero */}
    <div className="relative h-72 md:h-[460px] overflow-hidden rounded-3xl mx-4 md:mx-auto md:max-w-7xl">
      <img
        src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1600&q=85&auto=format"
        alt="Wedding Flowers"
        className="w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20 flex flex-col items-center justify-center text-center px-4">
        <p className="text-[#e7cda7] text-xs tracking-[0.45em] uppercase font-semibold mb-3">Signature Wedding Atelier</p>
        <h1 className="font-serif-display text-4xl md:text-6xl font-light text-white mb-4">Luxury Wedding Florals</h1>
        <p className="text-white/80 text-sm md:text-base max-w-xl">
          From intimate ceremonies to grand destination celebrations, we design couture floral experiences for every chapter of your day.
        </p>
        <button className="mt-6 px-8 py-3.5 bg-white text-gray-900 text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-[#c9a87c] hover:text-white transition-all">
          Get a Free Quote
        </button>
      </div>
    </div>

    {/* Why us */}
    <div className="bg-[#f8f3ec] py-12 mt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { icon:"🌸", title:"500+ Weddings", sub:"Successfully decorated" },
          { icon:"✂️", title:"Expert Florists", sub:"With 10+ years experience" },
          { icon:"🎨", title:"Custom Designs", sub:"Tailored to your vision" },
          { icon:"🚚", title:"On-Time Setup", sub:"Zero delays guaranteed" },
        ].map(i=>(
          <div key={i.title}>
            <div className="text-4xl mb-2">{i.icon}</div>
            <p className="font-semibold text-gray-900 text-sm">{i.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{i.sub}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="flex items-center gap-2 text-[#c9a87c]">
          <Sparkles size={16} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em]">Why Couples Choose Us</p>
        </div>
        <p className="mt-3 max-w-3xl text-sm md:text-base text-gray-600 leading-relaxed">
          Our team collaborates with planners, venues, and families to ensure every floral element feels cohesive, elegant, and deeply personal.
          From color storytelling to on-site execution, we deliver premium detail at every touchpoint.
        </p>
      </div>
    </div>

    {/* Services grid */}
    <div className="max-w-7xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <p className="text-xs font-bold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">Our Services</p>
        <h2 className="font-serif-display text-3xl md:text-4xl font-light text-gray-900 mb-2">
          What We Offer
        </h2>
        <div className="w-12 h-[2px] bg-[#c9a87c] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="relative overflow-hidden aspect-[4/3]">
              <img src={s.image} alt={s.title} loading="lazy" className="card-img w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="p-5">
              <h3 className="font-serif-display text-xl font-medium text-gray-900 mb-2">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#c9a87c]">Starting from {s.from}</span>
                <button className="text-xs font-bold text-gray-800 border border-gray-300 px-4 py-2 rounded-full hover:border-[#c9a87c] hover:text-[#c9a87c] transition-colors">
                  Enquire →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <FlowerFooter />
  </div>
);

export default WeddingsPage;


