import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
  Star,
  Scissors,
  Clock,
} from "lucide-react";
import { useSectionTheme } from "../../../hooks/useSectionTheme";

import craft1 from "/assets/images/craft1.jpg";
import craft2 from "/assets/images/craft2.jpg";
import craft3 from "/assets/images/craft3.jpg";
import craft4 from "/assets/images/craft4.jpg";
import craft5 from "/assets/images/craft5.jpg";

const AUTOPLAY_MS = 3000;

const slides = [
  {
    id: 1,
    eyebrow: "Customer Spotlight",
    title: "Crochet Flowers",
    badge: "Custom Colors",
    quote:
      "A bouquet that never wilts, stitched in the exact palette I dreamed of.",
    note: "Small details, made with care",
    labelA: "Best For",
    valueA: "Desks, Shelves & Vases",
    labelB: "Made In",
    valueB: "5 - 7 Days",
    image: craft1,
  },
  {
    id: 2,
    eyebrow: "Customer Spotlight",
    title: "Handmade Bouquets",
    badge: "Gift Ready",
    quote:
      "I gifted this on our anniversary and she still keeps it on her nightstand.",
    note: "Wrapped by hand, ready to gift",
    labelA: "Best For",
    valueA: "Anniversaries & Birthdays",
    labelB: "Made In",
    valueB: "4 - 6 Days",
    image: craft2,
  },
  {
    id: 3,
    eyebrow: "Customer Spotlight",
    title: "Crochet Bags",
    badge: "Made to Order",
    quote: "Sturdy, soft and unique. Nobody else has a bag like this one.",
    note: "Sized and confirmed before we begin",
    labelA: "Best For",
    valueA: "Everyday & Weekend Carry",
    labelB: "Made In",
    valueB: "7 - 10 Days",
    image: craft3,
  },
  {
    id: 4,
    eyebrow: "Customer Spotlight",
    title: "Plushie Companions",
    badge: "Soft & Charming",
    quote: "My daughter hasn't put her bunny down since the day it arrived.",
    note: "Gentle yarn, stitched snug",
    labelA: "Best For",
    valueA: "Kids & Keepsakes",
    labelB: "Made In",
    valueB: "6 - 8 Days",
    image: craft4,
  },
  {
    id: 5,
    eyebrow: "Customer Spotlight",
    title: "Crochet Accessories",
    badge: "Custom Colors",
    quote:
      "From keychains to wearable accessories, choose a handmade piece in a palette you love.",
    note: "Small details, made with care",
    labelA: "Best For",
    valueA: "Hair, Bags & Keychains",
    labelB: "Made In",
    valueB: "3 - 5 Days",
    image: craft5,
  },
];

const HandmadeShowcase = () => {
  const { isDark } = useSectionTheme();
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const barRef = useRef(null);
  const elapsedRef = useRef(0);
  const running = playing;

  const go = useCallback((i) => setIndex((i + total) % total), [total]);

  // theme tokens: every color lives here, so light and dark stay in sync
  const t = isDark
    ? {
        section: "bg-[#0d0a0c]",
        title: "text-white",
        sub: "text-white/55",
        card: "border-white/10 bg-[#161214] shadow-[0_16px_50px_rgba(0,0,0,0.55)]",
        bar: "bg-[#1d1719]",
        barIcon: "bg-[#c9a87c]/15 text-[#c9a87c]",
        barTitle: "text-white",
        barSub: "text-white/50",
        track: "bg-white/10",
        ctrl: "border-white/10 bg-white/5 text-white hover:border-[#c9a87c]/50 hover:text-[#c9a87c]",
        nav: "border-white/10 bg-white/5 text-white hover:bg-[#c9a87c] hover:text-[#161214]",
        imgBg: "bg-[#231d20]",
        pill: "bg-black/55 text-white border border-white/15",
        eyebrow: "text-[#e38aa8]",
        heart: "fill-[#e38aa8] text-[#e38aa8]",
        h3: "text-white",
        verified: "text-emerald-400",
        quoteBox: "border-[#e38aa8] bg-white/[0.04]",
        quoteText: "text-white/85",
        note: "text-white/45",
        tile: "bg-white/[0.04]",
        tileLabel: "text-white/45",
        tileA: "text-white",
        tileB: "text-[#e3c08f]",
        thumbTitle: "text-white/45",
        thumbActive:
          "ring-[#c9a87c] ring-offset-[#161214] shadow-[0_8px_20px_rgba(201,168,124,0.25)]",
        thumbIdle: "ring-white/10",
      }
    : {
        section: "bg-[#faf8f5]",
        title: "text-[#1b1f33]",
        sub: "text-[#7b8090]",
        card: "border-[#efe4db] bg-white shadow-[0_16px_50px_rgba(120,90,80,0.09)]",
        bar: "bg-[#fbf7f3]",
        barIcon: "bg-[#f9e3ea] text-[#c9507a]",
        barTitle: "text-[#141414]",
        barSub: "text-[#8a817a]",
        track: "bg-[#efe4db]",
        ctrl: "border-[#eadfd6] bg-white text-[#141414] hover:border-[#c9507a]/50 hover:text-[#c9507a]",
        nav: "border-[#eadfd6] bg-white text-[#141414] hover:bg-[#141414] hover:text-white",
        imgBg: "bg-[#f3ebe4]",
        pill: "bg-white/85 text-[#141414]",
        eyebrow: "text-[#c9507a]",
        heart: "fill-[#c9507a] text-[#c9507a]",
        h3: "text-[#1b1f33]",
        verified: "text-emerald-700",
        quoteBox: "border-[#c9507a] bg-[#fbf7f3]",
        quoteText: "text-[#2a2326]",
        note: "text-[#8a817a]",
        tile: "bg-[#fbf7f3]",
        tileLabel: "text-[#8a817a]",
        tileA: "text-[#141414]",
        tileB: "text-[#c9507a]",
        thumbTitle: "text-[#8a817a]",
        thumbActive:
          "ring-[#c9507a] ring-offset-white shadow-[0_8px_20px_rgba(201,80,122,0.25)]",
        thumbIdle: "ring-[#eadfd6]",
      };

  // reset progress on every slide change
  useEffect(() => {
    elapsedRef.current = 0;
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
  }, [index]);

  // time-based progress: no re-renders, only a transform update
  useEffect(() => {
    if (!running) return;
    let raf;
    let last = performance.now();

    const tick = (now) => {
      elapsedRef.current += Math.min(now - last, 100);
      last = now;
      const p = Math.min(elapsedRef.current / AUTOPLAY_MS, 1);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (p >= 1) {
        setIndex((i) => (i + 1) % total);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, index, total]);

  const slide = slides[index];

  return (
    <section className={`${t.section} px-4 py-10 sm:px-6 sm:py-14`}>
      {/* ---------- section header ---------- */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span className="h-px w-8 bg-[#c9a87c]/60 sm:w-14" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a87c] sm:text-xs">
            Loved by Customers
          </span>
          <span className="h-px w-8 bg-[#c9a87c]/60 sm:w-14" />
        </div>

        <h2
          className={`font-serif-display mt-3 text-[34px] font-normal leading-[1.1] tracking-tight sm:mt-4 sm:text-[52px] ${t.title}`}
        >
          Every Stitch Tells a Story
        </h2>

        <p
          className={`mx-auto mt-3 max-w-xl text-[13px] font-light leading-relaxed sm:mt-4 sm:text-lg ${t.sub}`}
        >
          Real pieces, real colors, and real smiles from our customers.
        </p>
      </div>

      {/* ---------- showcase card ---------- */}
      <div
        className={`mx-auto mt-7 max-w-6xl overflow-hidden rounded-[22px] border sm:mt-10 sm:rounded-[30px] ${t.card}`}
      >
        {/* control bar */}
        <div
          className={`relative flex items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 ${t.bar}`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full sm:h-10 sm:w-10 ${t.barIcon}`}
            >
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="min-w-0 leading-tight">
              <p className={`truncate text-sm font-bold ${t.barTitle}`}>
                Real Customer Gallery
              </p>
              <p
                className={`mt-0.5 truncate text-[11px] sm:text-xs ${t.barSub}`}
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
                {" • "}
                {playing ? "Auto-playing" : "Paused"}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause autoplay" : "Play autoplay"}
              className={`flex h-9 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition active:scale-95 sm:px-4 ${t.ctrl}`}
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {playing ? "Pause" : "Play"}
              </span>
            </button>
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className={`grid h-9 w-9 place-items-center rounded-full border transition active:scale-95 ${t.nav}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className={`grid h-9 w-9 place-items-center rounded-full border transition active:scale-95 ${t.nav}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* time-based progress bar */}
          <div className={`absolute inset-x-0 bottom-0 h-[3px] ${t.track}`}>
            <div
              ref={barRef}
              className="h-full w-full origin-left bg-gradient-to-r from-[#e3c08f] to-[#c9507a] will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* body */}
        <div className="grid lg:h-[clamp(520px,calc(100vh_-_330px),580px)] lg:grid-cols-[1fr_1fr]">
          {/* image side */}
          <div
            className={`relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full ${t.imgBg}`}
          >
            {slides.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt={s.title}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                  i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

            <span
              className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur-md sm:left-4 sm:top-4 ${t.pill}`}
            >
              <ShieldCheck
                className={`h-4 w-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
              />
              {slide.badge}
            </span>

            <span className="font-serif-display absolute bottom-2 left-4 text-5xl font-medium leading-none text-white/90 drop-shadow sm:bottom-3 sm:left-5 sm:text-6xl">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span
              className={`absolute bottom-3 right-3 rounded-full px-3 py-1.5 text-[10px] font-bold backdrop-blur sm:bottom-4 sm:right-4 sm:text-xs ${t.pill}`}
            >
              100% Unfiltered Customer Photo
            </span>
          </div>

          {/* content side */}
          <div className="flex min-h-0 flex-col p-4 sm:p-6 lg:p-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs ${t.eyebrow}`}
                >
                  <Heart className={`h-3.5 w-3.5 ${t.heart}`} />
                  {slide.eyebrow}
                </p>

                <h3
                  className={`font-serif-display mt-1.5 text-[28px] font-medium leading-tight sm:text-[34px] ${t.h3}`}
                >
                  {slide.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, k) => (
                      <Star
                        key={k}
                        className="h-4 w-4 fill-[#e3b04b] text-[#e3b04b]"
                      />
                    ))}
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold ${t.verified}`}
                  >
                    <BadgeCheck className="h-4 w-4" />
                    Verified Customer Photo
                  </span>
                </div>

                <blockquote
                  className={`mt-3.5 rounded-2xl border-l-4 px-4 py-3 ${t.quoteBox}`}
                >
                  <p
                    className={`line-clamp-3 text-sm italic leading-relaxed sm:text-[15px] ${t.quoteText}`}
                  >
                    “{slide.quote}”
                  </p>
                  <p className={`mt-1.5 text-xs ${t.note}`}>— {slide.note}</p>
                </blockquote>

                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <div className={`rounded-2xl px-3.5 py-2.5 ${t.tile}`}>
                    <p
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${t.tileLabel}`}
                    >
                      <Scissors className="h-3 w-3" />
                      {slide.labelA}
                    </p>
                    <p
                      className={`mt-0.5 truncate text-[13px] font-bold sm:text-sm ${t.tileA}`}
                    >
                      {slide.valueA}
                    </p>
                  </div>
                  <div className={`rounded-2xl px-3.5 py-2.5 ${t.tile}`}>
                    <p
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${t.tileLabel}`}
                    >
                      <Clock className="h-3 w-3" />
                      {slide.labelB}
                    </p>
                    <p
                      className={`mt-0.5 truncate text-[13px] font-bold sm:text-sm ${t.tileB}`}
                    >
                      {slide.valueB}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* thumbnails: hover or tap to switch */}
            <div className="mt-auto pt-4">
              <p
                className={`mb-2 text-[10px] font-bold uppercase tracking-wider sm:text-[11px] ${t.thumbTitle}`}
              >
                Select photo to view
              </p>
              <div className="grid grid-cols-5 gap-2">
                {slides.map((s, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={s.id}
                      onMouseEnter={() => setIndex(i)}
                      onFocus={() => setIndex(i)}
                      onClick={() => setIndex(i)}
                      aria-label={`View ${s.title}`}
                      aria-current={active}
                      className={`relative aspect-[4/3] overflow-hidden rounded-xl transition-all duration-300 ${
                        active
                          ? `-translate-y-0.5 ring-2 ring-offset-2 ${t.thumbActive}`
                          : `opacity-60 ring-1 hover:opacity-100 ${t.thumbIdle}`
                      }`}
                    >
                      <img
                        src={s.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HandmadeShowcase;
