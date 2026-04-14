import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: "🚀", label: "Same Day Delivery",   href: "/shop?category=All" },
  { icon: "🎂", label: "Birthday Flowers",    href: "/flowers?category=Birthday" },
  { icon: "💍", label: "Anniversary Flowers", href: "/flowers?category=Anniversary" },
  { icon: "💐", label: "Grand Gestures",      href: "/shop?category=Roses" },
  { icon: "🎁", label: "Gift Hampers",        href: "/gifts" },
  { icon: "📅", label: "Subscription Flowers",href: "/flowers" },
  { icon: "🌿", label: "Potted Plants",       href: "/plants" },
  { icon: "🏢", label: "Corporate Gifting",   href: "/gifts" },
  { icon: "💑", label: "Weddings",            href: "/weddings" },
  { icon: "🌸", label: "Exotic Flowers",      href: "/shop?category=Orchids" },
  { icon: "🍫", label: "Choco & Flowers",     href: "/gifts" },
  { icon: "🕯️", label: "Sympathy Flowers",   href: "/flowers" },
  { icon: "💐", label: "Grand Gestures",      href: "/shop?category=Roses" },
  { icon: "🎁", label: "Gift Hampers",        href: "/gifts" },
  { icon: "📅", label: "Subscription Flowers",href: "/flowers" },
];

const CategoryStrip = () => {
  const stripRef = useRef(null);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const loopCategories = useMemo(() => [...categories, ...categories, ...categories], []);

  // Drag / swipe to scroll
  const isDragging = useRef(false);
  const startClientX = useRef(0);
  const scrollLeft = useRef(0);
  const didDrag = useRef(false);
  const pauseAutoScroll = useRef(false);
  const loopWidthRef = useRef(0);

  useEffect(() => {
    const node = stripRef.current;
    if (!node) return;

    const syncLoopWidth = () => {
      loopWidthRef.current = node.scrollWidth / 3;
      node.scrollLeft = loopWidthRef.current;
    };

    syncLoopWidth();
    window.addEventListener("resize", syncLoopWidth);

    let frameId;
    const tick = () => {
      if (!pauseAutoScroll.current && !isDragging.current) {
        node.scrollLeft += 0.45;

        const loopWidth = loopWidthRef.current;
        if (loopWidth > 0) {
          if (node.scrollLeft <= loopWidth * 0.2) {
            node.scrollLeft += loopWidth;
          } else if (node.scrollLeft >= loopWidth * 1.8) {
            node.scrollLeft -= loopWidth;
          }
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", syncLoopWidth);
    };
  }, []);

  const onPointerDown = (e) => {
    const node = stripRef.current;
    if (!node) return;
    isDragging.current = true;
    pauseAutoScroll.current = true;
    didDrag.current = false;
    startClientX.current = e.clientX;
    scrollLeft.current = node.scrollLeft;
    node.style.cursor = "grabbing";
    if (node.setPointerCapture && e.pointerId !== undefined) {
      node.setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const node = stripRef.current;
    if (!node) return;
    const walk = (e.clientX - startClientX.current) * 1.5;
    if (Math.abs(walk) > 5) didDrag.current = true;
    node.scrollLeft = scrollLeft.current - walk;
  };

  const onPointerUp = () => {
    const node = stripRef.current;
    if (!node) return;
    isDragging.current = false;
    node.style.cursor = "grab";
    setTimeout(() => {
      pauseAutoScroll.current = false;
    }, 700);
  };

  return (
    <section className="bg-white border-b border-gray-100 py-1">
      <div
        ref={stripRef}
        className="cat-strip flex items-center gap-1 overflow-x-auto select-none cursor-grab touch-pan-x"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        onMouseEnter={() => { pauseAutoScroll.current = true; }}
        onMouseLeave={() => { pauseAutoScroll.current = false; }}
      >
        <div className="flex items-center gap-1 px-4 py-2 min-w-max">
          {loopCategories.map((cat, i) => {
            const baseIndex = i % categories.length;
            return (
            <button
              key={`${cat.label}-${i}`}
              onClick={() => {
                if (!didDrag.current) {
                  setActive(baseIndex);
                  navigate(cat.href);
                }
              }}
              className={`flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all duration-200 min-w-[90px] hover:bg-[#fdf7ee] group
                ${active === baseIndex ? "bg-[#fdf7ee] text-[#c9a87c]" : "text-gray-600"}`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span
                className={`text-[10px] font-medium text-center leading-tight tracking-wide
                  ${active === baseIndex ? "text-[#c9a87c]" : "text-gray-600 group-hover:text-[#c9a87c]"}`}
              >
                {cat.label}
              </span>
              {active === baseIndex && (
                <span className="w-1 h-1 rounded-full bg-[#c9a87c]" />
              )}
            </button>
          )})}
        </div>
      </div>
    </section>
  );
};

export default CategoryStrip;

