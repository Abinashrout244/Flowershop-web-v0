import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  Truck,
  Flower2,
  Gift,
  Sparkles,
  Heart,
  Star,
  PartyPopper,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    heading: "Birthday Wishes in Full Bloom",
    subtext:
      "Make their special day unforgettable with stunning seasonal arrangements and surprise gifts.",
    btn: "Explore Birthday",
    badge: "New Arrivals",
    badgeIcon: Sparkles,
    accent: "#be185d", // pink bg match
    image:
      "https://images.unsplash.com/photo-1627682874285-f57cb3c36e41?q=80&w=2074&auto=format&fit=crop",
    textColor: "text-rose-950",
    overlay: "bg-rose-100/45",
    perks: [
      { icon: PartyPopper, label: "Birthday Specials" },
      { icon: Gift, label: "Gift Wrapped" },
      { icon: Truck, label: "Same Day Delivery" },
    ],
  },
  {
    id: 2,
    heading: "Say Congrats in Style",
    subtext:
      "Celebrate every milestone with nature's finest blooms, hand-crafted by our expert florists.",
    btn: "Order Now",
    badge: "Best Seller",
    badgeIcon: Star,
    accent: "#8b6f47", // beige bg match
    image:
      "https://images.unsplash.com/photo-1483136781463-b71cca943b51?q=80&w=1332&auto=format&fit=crop",
    textColor: "text-amber-950",
    overlay: "bg-amber-50/45",
    perks: [
      { icon: Star, label: "Top Rated Picks" },
      { icon: Flower2, label: "Handcrafted Blooms" },
      { icon: Truck, label: "Fast Delivery" },
    ],
  },
  {
    id: 3,
    heading: "Love Blooms Every Day",
    subtext:
      "Express your deepest emotions with our curated anniversary collections, delivered fresh.",
    btn: "Shop Anniversary",
    badge: "Premium",
    badgeIcon: Heart,
    accent: "#6b4d3a", // dark beige bg match
    image:
      "https://images.unsplash.com/photo-1645965050030-015a1527f2ab?q=80&w=1214&auto=format&fit=crop",
    textColor: "text-stone-900",
    overlay: "bg-stone-100/45",
    perks: [
      { icon: Heart, label: "Romantic Collection" },
      { icon: Flower2, label: "Fresh Daily" },
      { icon: Gift, label: "Luxury Packaging" },
    ],
  },
  {
    id: 4,
    heading: "Grand Gestures, Unforgettable",
    subtext:
      "Sometimes love speaks loudest through the most extravagant floral displays.",
    btn: "Shop Luxury",
    badge: "Luxury",
    badgeIcon: Sparkles,
    accent: "#2563eb", // sky bg match
    image:
      "https://images.unsplash.com/photo-1628706335173-954e78631b9b?q=80&w=1170&auto=format&fit=crop",
    textColor: "text-slate-900",
    overlay: "bg-sky-100/50",
    perks: [
      { icon: Sparkles, label: "Signature Arrangements" },
      { icon: Gift, label: "Premium Gift Box" },
      { icon: Truck, label: "Priority Delivery" },
    ],
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-swiper w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        speed={850}
        className="w-full"
      >
        {slides.map((s) => {
          const BadgeIcon = s.badgeIcon;

          return (
            <SwiperSlide key={s.id}>
              <div
                className="relative bg-cover bg-center"
                style={{
                  minHeight: "580px",
                  backgroundImage: `url(${s.image})`,
                }}
              >
                <div className={`absolute inset-0 ${s.overlay}`}></div>

                <div className="relative max-w-7xl mx-auto px-6 md:px-10 h-full">
                  <div className="flex items-center min-h-[580px] py-16">
                    <div
                      className={`max-w-xl text-left z-10 ${s.textColor} px-2 md:px-0`}
                    >
                      <span
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-5 px-4 py-2 rounded-full"
                        style={{ color: s.accent, background: `${s.accent}1F` }}
                      >
                        <BadgeIcon size={14} />
                        {s.badge}
                      </span>

                      <h1 className="font-serif-display text-4xl md:text-5xl lg:text-[56px] font-light leading-[1.1] mb-5">
                        {s.heading}
                      </h1>

                      <p className="text-base md:text-lg leading-relaxed mb-8 font-normal opacity-85">
                        {s.subtext}
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => navigate("/shop")}
                          className="inline-flex items-center gap-2 px-8 py-3.5 text-white text-sm font-bold tracking-[0.08em] uppercase rounded-full transition-all duration-300 hover:brightness-95"
                          style={{ background: s.accent }}
                        >
                          <Gift size={16} />
                          {s.btn}
                        </button>

                        <button
                          onClick={() => navigate("/flowers")}
                          className="px-6 py-3.5 text-sm font-semibold border border-black/15 bg-white/75 rounded-full hover:bg-white transition-colors"
                        >
                          View Collection
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-5 mt-7 text-xs md:text-sm opacity-90">
                        {s.perks.map((perk) => {
                          const PerkIcon = perk.icon;
                          return (
                            <div
                              key={perk.label}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70"
                            >
                              <PerkIcon size={15} color={s.accent} />
                              <span>{perk.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;
