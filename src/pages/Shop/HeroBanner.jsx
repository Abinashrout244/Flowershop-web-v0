import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Move3d,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { FLOWER_ONLY_IMAGES, COLLECTIONS } from "./ShopInfo";

// Public assets use BASE_URL so their paths also work on subpath deployments.
// const assetsBase = `${import.meta.env.BASE_URL}assets/images/`;
// const bouquet1 = `${assetsBase}bouquet1.png`;
// const bouquet2 = `${assetsBase}bouquet2.png`;
const bouquet1 = `https://res.cloudinary.com/dnxha9arx/image/upload/v1794297760/bouquet1_blatfa.png`;
const bouquet2 = `https://res.cloudinary.com/dnxha9arx/image/upload/v1794297762/bouquet2_u6kxid.png`;

const SLIDES = [
  {
    eyebrow: "Handmade Crochet",
    title: "Flowers That Bloom Forever",
    subtitle:
      "Hand-stitched rose and daisy bouquets in the palette you choose.",
    cutout: bouquet1,
  },
  {
    eyebrow: "Gift Ready",
    title: "Stitched With Love, Wrapped With Care",
    subtitle:
      "A keepsake bouquet that never wilts, made to order for every occasion.",
    cutout: bouquet2,
  },
];

const COLORS = ["#f4b6c8", "#c9a87c", "#d8c4f0", "#ffffff"];

// deterministic particles: no randomness, so no hydration mismatch
const particles = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53) % 100,
  size: 3 + (i % 4) * 2,
  dur: 6 + (i % 5) * 1.6,
  delay: (i * 0.7) % 6,
  drift: (i % 2 ? 1 : -1) * (20 + (i % 4) * 12),
  color: COLORS[i % COLORS.length],
}));

const toRad = (deg) => (deg * Math.PI) / 180;

const faceHidden = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

const HeroBanner = ({ activeCollection, sorted, heroIndex, setHeroIndex }) => {
  const currentCollection = COLLECTIONS.find((c) => c.id === activeCollection);
  const CollectionIcon = currentCollection?.icon;

  // always 0 or 1, even if the parent index goes higher
  const slideIndex =
    ((heroIndex % SLIDES.length) + SLIDES.length) % SLIDES.length;
  const activeSlide = SLIDES[slideIndex];

  const [auto, setAuto] = useState(true);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startRy = useRef(0);
  const baseRy = useRef(0); // multiples of 180: front / back

  const targetRy = useMotionValue(0);
  const targetRx = useMotionValue(0);
  const ry = useSpring(targetRy, { stiffness: 90, damping: 18 });
  const rx = useSpring(targetRx, { stiffness: 90, damping: 18 });

  // shadow reacts to rotation
  const shadowScaleX = useTransform(
    ry,
    (v) => 0.45 + 0.55 * Math.abs(Math.cos(toRad(v))),
  );
  const shadowOpacity = useTransform(
    ry,
    (v) => 0.45 + 0.55 * Math.abs(Math.cos(toRad(v))),
  );
  const shadowX = useTransform(ry, (v) => Math.sin(toRad(v)) * 22);

  useAnimationFrame((t) => {
    if (!auto || dragging.current) return;
    targetRy.set(baseRy.current + Math.sin(t / 1100) * 16);
    targetRx.set(Math.cos(t / 1700) * 4);
  });

  const onDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startRy.current = targetRy.get();
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    targetRy.set(startRy.current + dx * 0.6);
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const snapped = Math.round(targetRy.get() / 180) * 180;
    baseRy.current = snapped;
    targetRy.set(snapped);
    targetRx.set(0);
  };

  const prev = () =>
    setHeroIndex((slideIndex - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setHeroIndex((slideIndex + 1) % SLIDES.length);

  return (
    <section className="hidden bg-[#f7f2ee] py-5 md:block lg:py-7">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="grid items-center gap-6 md:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* ---------- LEFT: 3D stage ---------- */}
          <div className="relative h-[320px] select-none overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_20px_60px_rgba(120,90,80,0.12)] lg:h-[420px] lg:rounded-[36px]">
            <div className="absolute -bottom-[45%] left-1/2 aspect-square w-[85%] -translate-x-1/2 rounded-full bg-[#ebe5e1]" />

            {particles.map((p, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute top-0 rounded-full"
                style={{
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: "0 0 6px rgba(244,182,200,0.6)",
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{
                  y: [-20, 460],
                  x: [0, p.drift],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            <div
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              className="absolute inset-0 flex cursor-grab items-center justify-center pt-8 active:cursor-grabbing"
              style={{ perspective: 1100, touchAction: "pan-y" }}
            >
              {/* ground shadow */}
              <motion.div
                className="pointer-events-none absolute bottom-[9%]"
                animate={{ scale: [1, 0.85, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="h-5 w-44 rounded-full bg-black/25 blur-xl lg:w-52"
                  style={{
                    scaleX: shadowScaleX,
                    opacity: shadowOpacity,
                    x: shadowX,
                  }}
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={slideIndex}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      className="relative"
                      style={{
                        rotateY: ry,
                        rotateX: rx,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* FRONT: this slide's bouquet */}
                      <img
                        src={activeSlide.cutout}
                        alt={activeSlide.title}
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.src = FLOWER_ONLY_IMAGES.default[0];
                        }}
                        className="block h-[220px] w-auto object-contain drop-shadow-[0_24px_30px_rgba(120,60,70,0.25)] lg:h-[300px]"
                        style={faceHidden}
                      />

                      {/* BACK: round seal badge */}
                      <div
                        className="absolute inset-0 grid place-items-center"
                        style={{ ...faceHidden, transform: "rotateY(180deg)" }}
                      >
                        <div className="relative grid aspect-square w-[150px] place-items-center rounded-full border-[5px] border-[#e3a1b5] bg-[#e8e2df] shadow-[0_24px_40px_rgba(120,60,70,0.22)] lg:w-[200px] lg:border-[6px]">
                          {/* thin inner ring */}
                          <div className="pointer-events-none absolute inset-3 rounded-full border border-[#e3a1b5]/70 lg:inset-4" />

                          <div className="flex flex-col items-center px-6 text-center">
                            <h3 className="font-serif-display text-[16px] font-bold uppercase leading-none tracking-wide text-[#141414] lg:text-[22px]">
                              Crochet by N&amp;N
                            </h3>

                            <p className="mt-3 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#d6527f] lg:mt-4 lg:text-[9px]">
                              Signature Floral Keepsake
                            </p>

                            <p className="mt-2 font-serif-display text-[9px] italic text-[#8a817a] lg:text-[11px]">
                              100% Handcrafted with Soft Yarn
                            </p>

                            <div className="mt-3 flex items-center gap-2 text-[10px] text-[#d6527f] lg:mt-4 lg:gap-3 lg:text-xs">
                              <span>✦</span>
                              <span>✦</span>
                              <span>✦</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[#f4d3df] bg-white/90 px-3.5 py-2 text-xs font-bold text-[#c9507a] shadow-sm">
              <Move3d className="h-4 w-4" />
              3D Stage • Drag to Rotate
            </span>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setAuto((a) => !a)}
                className="flex items-center gap-2 rounded-full bg-[#141414] px-4 py-2 text-xs font-bold text-white transition active:scale-95"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${auto ? "animate-spin [animation-duration:3s]" : ""}`}
                />
                {auto ? "Auto-Sway" : "Sway Off"}
              </button>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#f4d3df] bg-white/90 text-[#c9507a]">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* ---------- RIGHT: banner text ---------- */}
          <div className="flex min-w-0 flex-col justify-center">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9507a]">
              <span className="h-px w-8 bg-current opacity-60" />
              {CollectionIcon && <CollectionIcon size={14} />}
              Flora & Bloom
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-4 text-[10px] uppercase tracking-[0.32em] text-[#8a817a] lg:text-xs">
                  {activeSlide.eyebrow}
                </p>

                <h1 className="font-serif-display mt-2 text-4xl font-normal leading-[1.08] tracking-tight text-[#141414] lg:text-[52px]">
                  {activeSlide.title}
                </h1>

                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#6f6964] lg:text-base">
                  {activeSlide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#efe4db] bg-white px-3.5 py-2 text-xs font-semibold text-[#3a3336]">
                {activeCollection === "All"
                  ? "The Full Collection"
                  : currentCollection?.label}
              </span>
              <span className="rounded-full border border-[#efe4db] bg-white px-3.5 py-2 text-xs font-semibold text-[#3a3336]">
                {sorted.length} products
              </span>
              <span className="rounded-full border border-green-200/70 bg-green-50 px-3.5 py-2 text-xs font-semibold text-green-700">
                Free delivery above ₹999
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous banner"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#eadfd6] bg-white text-[#141414] transition hover:bg-[#141414] hover:text-white active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next banner"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#eadfd6] bg-white text-[#141414] transition hover:bg-[#141414] hover:text-white active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.title}
                    onClick={() => setHeroIndex(idx)}
                    aria-label={`Go to banner ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === slideIndex
                        ? "w-8 bg-[#c9507a]"
                        : "w-3 bg-[#d9cdc4] hover:bg-[#c9a87c]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
