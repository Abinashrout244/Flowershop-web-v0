import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   Reusable Shimmer skeleton block
   ───────────────────────────────────────────────────────────────── */
const Shimmer = ({ className = "" }) => (
  <div
    className={`relative overflow-hidden bg-stone-200/80 rounded ${className}`}
  >
    {/* Travelling highlight */}
    <span
      className="absolute inset-0 -translate-x-full animate-shimmer
                 bg-gradient-to-r from-transparent via-white/60 to-transparent"
    />
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Navbar skeleton
   ───────────────────────────────────────────────────────────────── */
const NavbarSkeleton = () => (
  <div className="w-full px-6 md:px-16 py-4 flex items-center justify-between border-b border-stone-200/60">
    {/* Logo area */}
    <div className="flex items-center gap-3">
      <Shimmer className="w-8 h-8 rounded-full" />
      <Shimmer className="w-28 h-5" />
    </div>
    {/* Nav links – hide on mobile */}
    <div className="hidden md:flex gap-6">
      {[64, 52, 72, 56, 68].map((w, i) => (
        <Shimmer key={i} className="h-4" style={{ width: w }} />
      ))}
    </div>
    {/* Icon group */}
    <div className="flex gap-3">
      {[1, 2, 3].map((i) => (
        <Shimmer key={i} className="w-8 h-8 rounded-full" />
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Hero skeleton
   ───────────────────────────────────────────────────────────────── */
const HeroSkeleton = ({ visible }) => (
  <div
    className={`w-full h-[55vh] md:h-[70vh] relative overflow-hidden
                transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
  >
    <Shimmer className="absolute inset-0 rounded-none" />
    {/* Overlay text block */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
      <Shimmer className="w-16 h-4 rounded-full" />
      <Shimmer className="w-72 md:w-[480px] h-10 md:h-14" />
      <Shimmer className="w-48 md:w-72 h-5" />
      <Shimmer className="w-56 md:w-80 h-5" />
      <div className="flex gap-4 mt-3">
        <Shimmer className="w-36 h-12 rounded-full" />
        <Shimmer className="w-36 h-12 rounded-full" />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Category strip skeleton
   ───────────────────────────────────────────────────────────────── */
const CategorySkeleton = ({ visible }) => (
  <div
    className={`px-6 md:px-16 py-10 flex gap-4 overflow-hidden
                transition-all duration-700 delay-100 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
  >
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0">
        <Shimmer className="w-20 h-20 rounded-full" />
        <Shimmer className="w-16 h-3 rounded-full" />
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Section header skeleton
   ───────────────────────────────────────────────────────────────── */
const SectionHeader = () => (
  <div className="flex flex-col items-center gap-3 mb-8">
    <Shimmer className="w-20 h-3 rounded-full" />
    <Shimmer className="w-48 md:w-64 h-7" />
    <Shimmer className="w-72 md:w-96 h-4" />
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Product card skeleton
   ───────────────────────────────────────────────────────────────── */
const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Shimmer className="w-full aspect-[3/4] rounded-2xl" />
    <Shimmer className="w-3/4 h-4" />
    <Shimmer className="w-1/2 h-3" />
    <div className="flex items-center justify-between mt-1">
      <Shimmer className="w-16 h-5" />
      <Shimmer className="w-8 h-8 rounded-full" />
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Product cards grid skeleton
   ───────────────────────────────────────────────────────────────── */
const ProductsSkeleton = ({ visible }) => (
  <section
    className={`px-6 md:px-16 py-12
                transition-all duration-700 delay-200 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
  >
    <SectionHeader />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {[1, 2, 3, 4].map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   Banner skeleton (full-width promo)
   ───────────────────────────────────────────────────────────────── */
const BannerSkeleton = ({ visible }) => (
  <div
    className={`mx-6 md:mx-16 rounded-3xl overflow-hidden
                transition-all duration-700 delay-300 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
  >
    <div className="relative h-52 md:h-72">
      <Shimmer className="absolute inset-0 rounded-none" />
      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 gap-4">
        <Shimmer className="w-14 h-3 rounded-full" />
        <Shimmer className="w-56 md:w-80 h-8" />
        <Shimmer className="w-40 md:w-56 h-4" />
        <Shimmer className="w-32 h-10 rounded-full mt-2" />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Testimonials row skeleton
   ───────────────────────────────────────────────────────────────── */
const TestimonialsSkeleton = ({ visible }) => (
  <section
    className={`px-6 md:px-16 py-12
                transition-all duration-700 delay-[400ms] ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
  >
    <SectionHeader />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-3 p-5 border border-stone-200 rounded-2xl">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Shimmer key={s} className="w-4 h-4 rounded" />
            ))}
          </div>
          <Shimmer className="w-full h-4" />
          <Shimmer className="w-5/6 h-4" />
          <Shimmer className="w-3/4 h-4" />
          <div className="flex items-center gap-3 mt-2">
            <Shimmer className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Shimmer className="w-24 h-3" />
              <Shimmer className="w-16 h-2.5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   Animated loading dots
   ───────────────────────────────────────────────────────────────── */
const LoadingDots = () => (
  <span className="inline-flex gap-[3px] ml-0.5 mb-0.5 align-bottom">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="inline-block w-[5px] h-[5px] rounded-full bg-gold-500 animate-bounce"
        style={{ animationDelay: `${i * 0.18}s`, animationDuration: "0.9s" }}
      />
    ))}
  </span>
);

/* ─────────────────────────────────────────────────────────────────
   Progress bar
   ───────────────────────────────────────────────────────────────── */
const ProgressBar = ({ progress }) => (
  <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-stone-200/60">
    <div
      className="h-full bg-gradient-to-r from-gold-400 via-gold-500 to-amber-400
                 transition-all duration-300 ease-out relative overflow-hidden"
      style={{ width: `${progress}%` }}
    >
      {/* Glint on progress bar */}
      <span
        className="absolute inset-0 animate-shimmer
                   bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   Main PageLoader
   ───────────────────────────────────────────────────────────────── */
const PageLoader = () => {
  const [progress, setProgress] = useState(8);
  const [sectionsVisible, setSectionsVisible] = useState(false);
  const [phase, setPhase] = useState(0); // 0=navbar 1=hero 2=rest

  /* Simulate progress ticking up */
  useEffect(() => {
    const steps = [
      { target: 35,  delay: 120 },
      { target: 60,  delay: 280 },
      { target: 78,  delay: 480 },
      { target: 90,  delay: 680 },
      { target: 97,  delay: 900 },
    ];

    let timeouts = [];
    steps.forEach(({ target, delay }) => {
      timeouts.push(setTimeout(() => setProgress(target), delay));
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  /* Stagger skeleton sections into view */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 80);
    const t2 = setTimeout(() => setSectionsVisible(true), 220);
    const t3 = setTimeout(() => setPhase(2), 300);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <ProgressBar progress={progress} />

      {/* Full-page overlay */}
      <div
        className="fixed inset-0 z-[9990] flex flex-col
                   bg-[#faf9f7]/70 backdrop-blur-[6px]
                   overflow-y-auto"
        aria-label="Loading page content"
        role="status"
      >

        {/* ── Floating status badge ───────────────────── */}
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9995]
                     flex items-center gap-2.5
                     bg-white/90 backdrop-blur-md border border-stone-200
                     shadow-xl shadow-stone-200/60
                     px-5 py-2.5 rounded-full
                     text-sm font-medium text-stone-600 font-jost
                     animate-fade-up"
        >
          {/* Pulsing green dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full
                         bg-gold-400 opacity-75 animate-ping"
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500" />
          </span>
          Loading<LoadingDots />
        </div>

        {/* ── Skeleton layout ─────────────────────────── */}
        <div
          className={`w-full min-h-screen transition-all duration-500
                      ${phase >= 1 ? "opacity-100" : "opacity-0"}`}
        >
          {/* Navbar */}
          <NavbarSkeleton />

          {/* Hero */}
          <HeroSkeleton visible={phase >= 1} />

          {/* Category strip */}
          <CategorySkeleton visible={sectionsVisible} />

          {/* Products grid */}
          <ProductsSkeleton visible={sectionsVisible} />

          {/* Banner */}
          <BannerSkeleton visible={sectionsVisible} />

          {/* Testimonials */}
          <TestimonialsSkeleton visible={sectionsVisible} />

          {/* ── Footer stub ─────────────────────────── */}
          <div
            className={`px-6 md:px-16 py-10 border-t border-stone-200/60 mt-6
                        transition-all duration-700 delay-[500ms] ease-out
                        ${sectionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((col) => (
                <div key={col} className="flex flex-col gap-3">
                  <Shimmer className="w-24 h-4" />
                  {[1, 2, 3, 4].map((row) => (
                    <Shimmer key={row} className="h-3" style={{ width: `${50 + (row * 7)}%` }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLoader;
