import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSectionTheme } from "../../../hooks/useSectionTheme";
import { useCategoriesController } from "../../../controllers/useCategoriesController";
import Loader from "../../ui/Loader/Loader";

const CategoryStrip = () => {
  const navigate = useNavigate();
  const { categories, loading, error } = useCategoriesController();
  const [active, setActive] = useState(0);
  const { isDark } = useSectionTheme();

  const handleCategoryClick = (cat, index) => {
    setActive(index);

    const params = new URLSearchParams();

    switch (cat.filter_type) {
      case "all":
        navigate("/shop");
        return;

      case "category":
        params.set("category", cat.filter_value || cat.name);
        break;

      case "subcategory":
        params.set("category", cat.parent_category || "Plants");
        params.set("subcategory", cat.filter_value || cat.name);
        break;

      case "badge":
        params.set("badge", cat.filter_value || cat.name);
        break;

      case "occasion":
        params.set("occasion", cat.filter_value || cat.name);
        break;

      default:
        navigate("/shop");
        return;
    }

    navigate(`/shop?${params.toString()}`);
  };

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-black" : "bg-[#faf9f7]"
      }`}
      style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
          isDark ? "via-white/15" : "via-[#c9a87c]/20"
        } to-transparent`}
      />

      <p
        className={`text-center text-[11px] font-body font-light tracking-[0.25em] uppercase mb-5 px-4 ${
          isDark ? "text-white/40" : "text-gray-400"
        }`}
      >
        Browse by category
      </p>

      {loading ? (
        <Loader size="sm" className="py-8" />
      ) : error ? (
        <div className="px-6 py-8 text-center text-sm text-red-500">
          {error}
        </div>
      ) : categories.length === 0 ? (
        <div
          className={`px-6 py-8 text-center text-sm ${
            isDark ? "text-white/50" : "text-gray-500"
          }`}
        >
          No categories available.
        </div>
      ) : (
        <div className="flex items-center gap-3 overflow-x-auto px-6 pb-1 pt-5 cat-strip">
          {categories.map((cat, index) => {
            const isActive = active === index;

            return (
              <motion.button
                key={cat.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCategoryClick(cat, index)}
                className={`relative flex-shrink-0 flex flex-col items-center gap-2 rounded-2xl px-3 py-3 min-w-[90px] transition-all duration-300 group ${
                  isDark
                    ? isActive
                      ? "bg-white/10 backdrop-blur-xl ring-1 ring-[#c9a87c]/40 shadow-[0_0_28px_rgba(201,168,124,0.2),0_4px_24px_rgba(0,0,0,0.5)]"
                      : "bg-white/5 backdrop-blur-md hover:bg-white/10 hover:ring-1 hover:ring-[#c9a87c]/30 hover:shadow-[0_0_28px_rgba(201,168,124,0.16),0_4px_20px_rgba(0,0,0,0.45)]"
                    : isActive
                      ? "bg-white ring-1 ring-[#c9a87c]/50 shadow-[0_4px_20px_rgba(0,0,0,0.10)]"
                      : "bg-white/70 hover:bg-white hover:shadow-md"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? "ring-2 ring-[#c9a87c] ring-offset-1 ring-offset-black/80"
                        : "ring-2 ring-[#c9a87c] ring-offset-1 ring-offset-white"
                      : isDark
                        ? "ring-1 ring-white/15 group-hover:ring-white/30"
                        : "ring-1 ring-gray-200 group-hover:ring-[#c9a87c]/40"
                  }`}
                >
                  {cat.image_url && (
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                </div>

                <span
                  className={`text-[10px] font-body font-medium text-center leading-tight whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? "text-[#c9a87c]"
                      : isDark
                        ? "text-white/60 group-hover:text-white/90"
                        : "text-gray-500 group-hover:text-gray-800"
                  }`}
                >
                  {cat.name}
                </span>

                {isActive && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c9a87c]" />
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
          isDark ? "via-[#c9a87c]/20" : "via-[#c9a87c]/15"
        } to-transparent`}
      />
    </section>
  );
};

export default CategoryStrip;
