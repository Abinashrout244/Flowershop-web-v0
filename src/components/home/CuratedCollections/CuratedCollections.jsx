import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSectionTheme } from "../../../hooks/useSectionTheme";
import { useProductsController } from "../../../controllers/useProductsController";

const BASE = "https://images.unsplash.com/";

const collections = [
  {
    id: 1,
    number: "01",
    badge: "Your Style",
    label: "Birthday",
    subtitle: "Celebrate Every Special Moment",
    description:
      "Discover beautiful birthday flower arrangements and make someone's special day even more memorable.",
    image: `${BASE}photo-1519378058457-4c29a0a2efac?w=800&q=85&auto=format`,
    filter: "occasion",
    value: "Birthday",
    actionLabel: "View Step Product",
  },
  {
    id: 2,
    number: "02",
    badge: "Grand & Elegant",
    label: "Grand Gestures",
    subtitle: "Make A Lasting Impression",
    description:
      "Explore stunning rose arrangements designed to express your deepest feelings.",
    image: `${BASE}photo-1680563094046-5d846e2c59d1?w=800&q=85&auto=format`,
    filter: "category",
    value: "Roses",
    actionLabel: "View Collection",
  },
  {
    id: 3,
    number: "03",
    badge: "Romantic Moments",
    label: "Anniversary",
    subtitle: "Celebrate Your Love Story",
    description:
      "Find timeless floral arrangements to make every anniversary unforgettable.",
    image: `${BASE}photo-1518621736915-f3b1c41bfd00?w=800&q=85&auto=format`,
    filter: "occasion",
    value: "Anniversary",
    actionLabel: "View Collection",
  },
  {
    id: 4,
    number: "04",
    badge: "Thoughtful Gifts",
    label: "Flowers & Candles",
    subtitle: "A Perfect Gift Combination",
    description:
      "Explore beautiful floral gifts and thoughtful accessories for someone special.",
    image: `${BASE}photo-1503525766218-8efbcfe836a0?w=800&q=85&auto=format`,
    filter: "category",
    value: "Mixed",
    actionLabel: "View Collection",
  },
  {
    id: 5,
    number: "05",
    badge: "Elegant Spaces",
    label: "Vase Arrangements",
    subtitle: "Bring Beauty Into Your Space",
    description:
      "Discover elegant vase arrangements that add warmth and beauty to every corner.",
    image: `${BASE}photo-1508610048659-a06b669e3321?w=800&q=85&auto=format`,
    filter: "category",
    value: "Vase",
    actionLabel: "View Collection",
  },
  {
    id: 6,
    number: "06",
    badge: "Handcrafted",
    label: "Hand Tied Bouquets",
    subtitle: "Beautifully Arranged With Love",
    description:
      "Discover thoughtfully arranged hand-tied bouquets for life's most beautiful occasions.",
    image: `${BASE}photo-1652346107876-58d7354ce9b8?w=800&q=85&auto=format`,
    filter: "category",
    value: "Bouquets",
    actionLabel: "View Collection",
  },
];

const CuratedCollections = () => {
  const navigate = useNavigate();
  const { isDark, bg, heading, subheading, btnOutline, divider } =
    useSectionTheme();

  const { products = [] } = useProductsController();

  const getCollectionCount = (collection) => {
    return products.filter((product) => {
      if (collection.filter === "category") {
        return (
          product.category?.toLowerCase() === collection.value.toLowerCase()
        );
      }

      if (collection.filter === "occasion") {
        return (product.occasions || []).some(
          (occasion) =>
            occasion.toLowerCase() === collection.value.toLowerCase(),
        );
      }

      return false;
    }).length;
  };

  const getCollectionURL = (collection) => {
    return `/shop?${collection.filter}=${encodeURIComponent(collection.value)}`;
  };

  return (
    <section className={`py-14 md:py-20 relative ${bg}`}>
      <div className={`absolute top-0 left-0 right-0 h-px ${divider}`} />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-[#c9a87c] uppercase mb-2">
            Handpicked For You
          </p>

          <h2
            className={`font-serif-display text-3xl md:text-4xl lg:text-5xl font-light mb-3 ${heading}`}
          >
            Curated Collections
          </h2>

          <p
            className={`text-sm md:text-base font-light max-w-md mx-auto ${subheading}`}
          >
            Thoughtfully arranged collections for every occasion, mood, and
            story.
          </p>

          <div className="w-12 h-px bg-[#c9a87c] mx-auto mt-5" />
        </motion.div>

        {/* Grid wrapper: 3 columns, wide container */}
        <div className="mx-auto grid w-full max-w-[1520px] grid-cols-2 gap-3 px-3 sm:gap-5 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:px-12">
          {collections.map((col, i) => {
            const count = getCollectionCount(col);
            const href = getCollectionURL(col);
            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.55,
                  delay: (i % 3) * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => navigate(href)}
                className={`group flex min-w-0 cursor-pointer flex-col rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-6 lg:p-8 ${
                  isDark
                    ? "border-white/10 bg-[#161214] shadow-[0_10px_40px_rgba(0,0,0,0.45)] hover:border-[#c9a87c]/40 hover:shadow-[0_0_40px_rgba(201,168,124,0.15),0_16px_50px_rgba(0,0,0,0.55)]"
                    : "border-transparent bg-white shadow-[0_2px_20px_rgba(120,90,80,0.05)] hover:shadow-[0_12px_40px_rgba(201,80,122,0.13)]"
                }`}
              >
                {/* Top row */}
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <span
                    className={`text-2xl font-extrabold leading-none tracking-tight sm:text-4xl lg:text-5xl ${
                      isDark ? "text-[#c9a87c]/25" : "text-[#f4d3df]"
                    }`}
                  >
                    {col.number}
                  </span>
                  <span
                    className={`min-w-0 truncate rounded-full px-2 py-1 text-[10px] font-semibold sm:px-3.5 sm:py-1.5 sm:text-xs ${
                      isDark
                        ? "bg-white/[0.07] text-white/70"
                        : "bg-[#f4efeb] text-[#6b635d]"
                    }`}
                  >
                    {col.badge}
                  </span>
                </div>

                {/* Image: wide and short */}
                <div className="relative mt-3 aspect-[2/1] overflow-hidden rounded-xl sm:mt-5 sm:rounded-2xl">
                  <img
                    src={col.image}
                    alt={col.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {isDark && (
                    <div className="pointer-events-none absolute inset-0 bg-black/15" />
                  )}
                </div>

                {/* Text */}
                <h3
                  className={`mt-3 text-sm font-semibold leading-snug tracking-tight sm:mt-5 sm:text-lg lg:text-xl ${
                    isDark ? "text-white" : "text-[#141414]"
                  }`}
                >
                  {col.label}
                </h3>

                <p
                  className={`mt-0.5 text-[11px] font-medium sm:text-sm ${
                    isDark ? "text-[#e38aa8]" : "text-[#c9507a]"
                  }`}
                >
                  {col.subtitle}
                </p>

                <p
                  className={`mb-3 mt-2 line-clamp-3 text-[11px] leading-relaxed sm:mb-5 sm:mt-3 sm:line-clamp-none sm:text-sm ${
                    isDark ? "text-white/55" : "text-[#6f6964]"
                  }`}
                >
                  {col.description}
                </p>

                {/* Footer pinned to bottom so all cards align */}
                <div
                  className={`mt-auto flex items-center justify-between gap-2 border-t pt-3 sm:pt-4 ${
                    isDark ? "border-white/10" : "border-[#f0e9e5]"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(href);
                    }}
                    className={`min-w-0 truncate text-left text-xs font-semibold sm:text-sm ${
                      isDark ? "text-white" : "text-[#141414]"
                    }`}
                  >
                    {col.actionLabel}
                    {count > 0 && (
                      <span
                        className={`ml-1 text-[10px] font-medium sm:ml-2 sm:text-xs ${
                          isDark ? "text-white/40" : "text-[#9a918a]"
                        }`}
                      >
                        ({count})
                      </span>
                    )}
                  </button>
                  <span
                    className={`text-base transition-transform duration-300 group-hover:translate-x-1 sm:text-lg ${
                      isDark ? "text-[#c9a87c]" : "text-[#cc5580]"
                    }`}
                  >
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/shop")}
            className={` px-6 md:px-10 py-2 md:py-3.5 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${btnOutline}`}
          >
            Browse All Collections
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CuratedCollections;
