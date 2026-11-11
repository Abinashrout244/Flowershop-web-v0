import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Move3d, RefreshCw } from "lucide-react";

import { FLOWER_ONLY_IMAGES, COLLECTIONS } from "./ShopInfo";

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

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53) % 100,
  size: 3 + (i % 4) * 2,
  dur: 6 + (i % 5) * 1.6,
  delay: (i * 0.7) % 6,
  drift: (i % 2 ? 1 : -1) * (20 + (i % 4) * 12),
  color: COLORS[i % COLORS.length],
}));

const ORBITERS = [
  { offset: 0, size: 10, color: "#f4b6c8" },
  { offset: 72, size: 7, color: "#c9a87c" },
  { offset: 144, size: 9, color: "#d8c4f0" },
  { offset: 216, size: 6, color: "#ffffff" },
  { offset: 288, size: 8, color: "#e3a1b5" },
];
const ORBIT_R = 130;

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

const faceHidden = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

// bead orbiting the bouquet in 3D
const Orbiter = ({ ry, spin, offset, size, color }) => {
  const x = useTransform(
    [ry, spin],
    ([a, b]) => Math.cos(toRad(a * 1.2 + b + offset)) * ORBIT_R,
  );
  const y = useTransform(
    [ry, spin],
    ([a, b]) => Math.sin(toRad(a * 1.2 + b + offset)) * ORBIT_R,
  );
  return (
    <motion.span
      className="pointer-events-none absolute rounded-full"
      style={{
        x,
        y,
        width: size,
        height: size,
        left: -size / 2,
        top: -size / 2,
        background: color,
        boxShadow: "0 0 10px rgba(244,182,200,0.9)",
      }}
    />
  );
};

const HeroBanner = ({ activeCollection, sorted, heroIndex, setHeroIndex }) => {
  const currentCollection = COLLECTIONS.find((c) => c.id === activeCollection);
  const CollectionIcon = currentCollection?.icon;

  const slideIndex =
    ((heroIndex % SLIDES.length) + SLIDES.length) % SLIDES.length;
  const activeSlide = SLIDES[slideIndex];

  const [auto, setAuto] = useState(true);
  const stageRef = useRef(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startRy = useRef(0);
  const startRx = useRef(0);
  const baseRy = useRef(0);

  const targetRy = useMotionValue(0);
  const targetRx = useMotionValue(0);
  const ry = useSpring(targetRy, { stiffness: 90, damping: 18 });
  const rx = useSpring(targetRx, { stiffness: 90, damping: 18 });

  // slow constant spin for orbit beads
  const spin = useMotionValue(0);

  // hover parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16 });
  const sy = useSpring(my, { stiffness: 70, damping: 16 });
  const bgX = useTransform(sx, (v) => v * -26);
  const bgY = useTransform(sy, (v) => v * -14);
  const glowX = useTransform(sx, (v) => v * 18);
  const glowY = useTransform(sy, (v) => v * 10);
  const bouquetX = useTransform(sx, (v) => v * 16);
  const bouquetY = useTransform(sy, (v) => v * 9);

  // background circle turns with the bouquet (flat Z-rotation)
  const bgRotate = useTransform([ry, spin], ([a, b]) => a * 0.35 + b * 0.05);

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
    spin.set(t / 25);
    if (!auto || dragging.current) return;
    targetRy.set(baseRy.current + Math.sin(t / 1100) * 16);
    targetRx.set(Math.cos(t / 1700) * 4);
  });

  const onDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    startRy.current = targetRy.get();
    startRx.current = targetRx.get();
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    targetRy.set(startRy.current + dx * 0.6);
    targetRx.set(Math.max(-18, Math.min(18, startRx.current - dy * 0.25)));
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const snapped = Math.round(targetRy.get() / 180) * 180;
    baseRy.current = snapped;
    targetRy.set(snapped);
    targetRx.set(0);
  };

  const onStageMove = (e) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onStageLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const prev = () =>
    setHeroIndex((slideIndex - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setHeroIndex((slideIndex + 1) % SLIDES.length);

  return (
    <section className="hidden bg-[#f7f2ee] py-5 md:block lg:py-7">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="grid items-center gap-6 md:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* ---------- LEFT: 3D stage ---------- */}
          <div
            ref={stageRef}
            onPointerMove={onStageMove}
            onPointerLeave={onStageLeave}
            className="relative h-[320px] select-none overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_20px_60px_rgba(120,90,80,0.12)] lg:h-[420px] lg:rounded-[36px]"
          >
            {/* soft glow behind bouquet */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4b6c8]/30 blur-3xl lg:h-[340px] lg:w-[340px]"
              style={{ x: glowX, y: glowY }}
            />

            {/* ---------- ROTATING BACKGROUND CIRCLE ---------- */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-[45%] flex justify-center">
              <motion.div
                className="relative aspect-square w-[85%] rounded-full bg-[conic-gradient(from_0deg,#ebe5e1,#f3eeea,#e6dfda,#f0eae6,#ebe5e1)]"
                style={{ x: bgX, y: bgY, rotate: bgRotate }}
              >
                {/* dashed ring */}
                <div className="absolute inset-[7%] rounded-full border border-dashed border-[#d6527f]/20" />

                {/* dots on the ring: make the rotation readable */}
                <span className="absolute left-1/2 top-[7%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e3a1b5]/70" />
                <span className="absolute bottom-[7%] left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#c9a87c]/70" />
                <span className="absolute left-[7%] top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8c4f0]" />
                <span className="absolute right-[7%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#e3a1b5]/50" />
              </motion.div>
            </div>

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

              {/* hover parallax layer */}
              <motion.div
                style={{
                  x: bouquetX,
                  y: bouquetY,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* ---------- 3D ORBIT RING + BEADS ---------- */}
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
                    style={{
                      transform: "rotateX(72deg)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="absolute rounded-full border border-dashed border-[#e3a1b5]/70"
                      style={{
                        width: ORBIT_R * 2,
                        height: ORBIT_R * 2,
                        left: -ORBIT_R,
                        top: -ORBIT_R,
                      }}
                    />
                    {ORBITERS.map((o) => (
                      <Orbiter key={o.offset} ry={ry} spin={spin} {...o} />
                    ))}
                  </div>

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
                        {/* FRONT */}
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
                          style={{
                            ...faceHidden,
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <div className="relative grid aspect-square w-[150px] place-items-center rounded-full border-[5px] border-[#e3a1b5] bg-[#e8e2df] shadow-[0_24px_40px_rgba(120,60,70,0.22)] lg:w-[200px] lg:border-[6px]">
                            <div className="pointer-events-none absolute inset-3 rounded-full border border-[#e3a1b5]/70 lg:inset-4" />

                            <div className="flex flex-col items-center px-6 text-center">
                              <h3 className="font-serif-display text-[16px] font-bold uppercase leading-none tracking-wide text-[#141414] lg:text-[22px]">
                                Flora & Bloom
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
              </motion.div>
            </div>

            <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[#f4d3df] bg-white/90 px-3.5 py-2 text-xs font-bold text-[#c9507a] shadow-sm">
              Drag to Rotate in 3D
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
