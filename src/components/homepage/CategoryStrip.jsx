import { useRef, useState } from "react";

const categories = [
  { icon: "🚀", label: "Same Day Delivery" },
  { icon: "🎂", label: "Birthday Flowers" },
  { icon: "💍", label: "Anniversary Flowers" },
  { icon: "💐", label: "Grand Gestures" },
  { icon: "🎁", label: "Gift Hampers" },
  { icon: "📅", label: "Subscription Flowers" },
  { icon: "🌿", label: "Potted Plants" },
  { icon: "🏢", label: "Corporate Gifting" },
  { icon: "💑", label: "Weddings" },
  { icon: "🌸", label: "Exotic Flowers" },
  { icon: "🍫", label: "Choco & Flowers" },
  { icon: "🕯️", label: "Sympathy Flowers" },
];

const CategoryStrip = () => {
  const stripRef = useRef(null);
  const [active, setActive] = useState(0);

  // Drag-to-scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - stripRef.current.offsetLeft;
    scrollLeft.current = stripRef.current.scrollLeft;
    stripRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    stripRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    stripRef.current.style.cursor = "grab";
  };

  return (
    <section className="bg-white border-b border-gray-100 py-1">
      <div
        ref={stripRef}
        className="cat-strip flex items-center gap-1 overflow-x-auto select-none cursor-grab"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="flex items-center gap-1 px-4 py-2 min-w-max">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all duration-200 min-w-[90px] hover:bg-[#fdf7ee] group
                ${active === i ? "bg-[#fdf7ee] text-[#c9a87c]" : "text-gray-600"}`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span
                className={`text-[10px] font-medium text-center leading-tight tracking-wide
                  ${active === i ? "text-[#c9a87c]" : "text-gray-600 group-hover:text-[#c9a87c]"}`}
              >
                {cat.label}
              </span>
              {active === i && (
                <span className="w-1 h-1 rounded-full bg-[#c9a87c]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryStrip;
