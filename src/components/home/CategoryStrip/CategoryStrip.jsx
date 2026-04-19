import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: "🌸", label: "All", url: "/shop" },

  { icon: "🌹", label: "Roses", url: "/shop?category=Roses" },
  { icon: "🌻", label: "Sunflowers", url: "/shop?category=Sunflowers" },
  { icon: "🌸", label: "Lilies", url: "/shop?category=Lilies" },
  { icon: "🌷", label: "Tulips", url: "/shop?category=Tulips" },
  { icon: "🌺", label: "Orchids", url: "/shop?category=Orchids" },

  { icon: "💐", label: "Mixed Bouquets", url: "/shop?category=Mixed" },
  { icon: "🎁", label: "Gift Hampers", url: "/shop?category=Gifts" },

  { icon: "🪴", label: "Plants", url: "/shop?category=Plants" },
  { icon: "🌿", label: "Indoor Plants", url: "/shop?category=Plants&subcategory=Indoor" },
  { icon: "🌵", label: "Succulents", url: "/shop?category=Plants&subcategory=Succulents" },

  { icon: "🌴", label: "Tropical", url: "/shop?category=Tropical" },
  { icon: "🌼", label: "Seasonal", url: "/shop?category=Seasonal" },

  { icon: "💎", label: "Luxury", url: "/shop?badge=Luxury" },
  { icon: "🔥", label: "Best Sellers", url: "/shop?badge=Best Seller" },
  { icon: "⭐", label: "Trending", url: "/shop?badge=Trending" },

  { icon: "🎂", label: "Birthday", url: "/shop?occasion=Birthday" },
  { icon: "❤️", label: "Anniversary", url: "/shop?occasion=Anniversary" },
  { icon: "🎉", label: "Celebrations", url: "/shop?occasion=Congratulations" },
  { icon: "🙏", label: "Sympathy", url: "/shop?occasion=Sympathy" },

];

const CategoryStrip = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white border-b border-gray-100 py-1">
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-2">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => {
              setActive(i);
              navigate(cat.url);
            }}
            className={`flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl min-w-[90px]
              ${
                active === i
                  ? "bg-[#fdf7ee] text-[#c9a87c]"
                  : "text-gray-600 hover:bg-[#fdf7ee] hover:text-[#c9a87c]"
              }`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-[10px] font-medium text-center leading-tight">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryStrip;

