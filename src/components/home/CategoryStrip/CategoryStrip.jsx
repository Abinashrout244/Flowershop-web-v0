import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ use SAME BASE from your flowers.js
const BASE = "https://images.unsplash.com/";

const categories = [
  { img: `${BASE}photo-1496062031456-07b8f162a322?w=200`, label: "All", url: "/shop" },

  { img: `${BASE}photo-1586082207282-3dcb61d25ebd?w=200`, label: "Roses", url: "/shop?category=Roses" },
  { img: `${BASE}photo-1551945326-df678a97c3af?w=200`, label: "Sunflowers", url: "/shop?category=Sunflowers" },
  { img: `${BASE}photo-1486102515046-44130769cb25?w=200`, label: "Lilies", url: "/shop?category=Lilies" },
  { img: `${BASE}photo-1587316830148-c9b01df2da38?w=200`, label: "Tulips", url: "/shop?category=Tulips" },
  { img: `${BASE}photo-1605996370592-b6f7a81e382e?w=200`, label: "Orchids", url: "/shop?category=Orchids" },

  { img: `${BASE}photo-1602934585418-f588bea4215c?w=200`, label: "Mixed Bouquets", url: "/shop?category=Mixed" },
  { img: `${BASE}photo-1601004890684-d8cbf643f5f2?w=200`, label: "Gift Hampers", url: "/shop?category=Gifts" },

  { 
  img: "https://images.unsplash.com/photo-1598764557991-b9f211b73b81?q=80&w=200&auto=format&fit=crop", 
  label: "Plants", 
  url: "/shop?category=Plants" 
},
  { img: `${BASE}photo-1614594975525-e45190c55d0b?w=200`, label: "Indoor Plants", url: "/shop?category=Plants&subcategory=Indoor" },
  { img: `${BASE}photo-1459411552884-841db9b3cc2a?w=200`, label: "Succulents", url: "/shop?category=Plants&subcategory=Succulents" },

  { img: `${BASE}photo-1688481156464-4285423c8b39?w=200`, label: "Tropical", url: "/shop?category=Tropical" },
  { img: `${BASE}photo-1563245159-f793f19d8c37?w=200`, label: "Seasonal", url: "/shop?category=Seasonal" },

  { img: `${BASE}photo-1597583995844-edce63cc1cb0?w=200`, label: "Luxury", url: "/shop?badge=Luxury" },
  { img: `${BASE}photo-1602934585418-f588bea4215c?w=200`, label: "Best Sellers", url: "/shop?badge=Best Seller" },
  { img: `${BASE}photo-1595886535782-0f757640a574?w=200`, label: "Trending", url: "/shop?badge=Trending" },

  { img: `${BASE}photo-1530103043960-ef38714abb15?w=200`, label: "Birthday", url: "/shop?occasion=Birthday" },
  { img: `${BASE}photo-1602934585418-f588bea4215c?w=200`, label: "Anniversary", url: "/shop?occasion=Anniversary" },
  { img: `${BASE}photo-1559849608-e88ec5d1c6f4?w=200`, label: "Celebrations", url: "/shop?occasion=Congratulations" },
  { img: `${BASE}photo-1486102515046-44130769cb25?w=200`, label: "Sympathy", url: "/shop?occasion=Sympathy" },
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
            {/* ✅ replaced emoji with real image */}
            <img
              src={cat.img}
              alt={cat.label}
              className="w-11 h-11 object-cover rounded-full shadow-sm"
              loading="lazy"
            />

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