import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import BlurText from "./BlurText";
import { useNavigate } from "react-router-dom";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const partners = [
  "Wedding Bouquets",
  "Birthday Gifts",
  "Luxury Roses",
  "Custom Arrangements",
  "Same-Day Delivery",
];

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ minHeight: "100vh" }}
    >
      {/* ─── Background video ───────────────────────────────────── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero_bg.jpeg"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-70"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* ─── Radial vignette overlay ────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* ─── Bottom gradient fade into next section ─────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
        style={{
          height: "220px",
          background: "linear-gradient(to bottom, transparent, #000)",
        }}
      />

      {/* ─── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-36 pb-24 min-h-screen">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center liquid-glass rounded-full px-1 py-1 mb-8 gap-0"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-[11px] font-body font-semibold leading-none">
            Fresh Blooms
          </span>
          <span className="text-white/80 text-xs font-body font-medium px-3">
            Handcrafted floral arrangements for every moment.
          </span>
        </motion.div>

        {/* Heading */}
        <h1
          className="font-heading italic text-white leading-[0.88] max-w-4xl mb-7"
          style={{
            fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          <BlurText
            text="Flowers That Speak Your Heart"
            delay={100}
            direction="bottom"
            animateBy="words"
          />
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm md:text-base text-white/70 font-body font-light leading-relaxed max-w-md mb-10"
        >
          Stunning floral designs. Fresh daily blooms. Crafted with love for
          weddings, gifts, and life’s special moments.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ filter: "blur(8px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={() => {
              navigate("/flowers");
            }}
            className="liquid-glass-strong rounded-full px-6 py-3 text-white font-body font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            Order Flowers
            <ArrowUpRight size={15} />
          </button>

          <button
            onClick={() => {
              navigate("/shop");
            }}
            className="flex items-center gap-2.5 text-white/80 font-body font-medium text-sm hover:text-white transition-colors duration-200 group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/25 group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-200">
              <Play size={13} fill="white" className="ml-0.5" />
            </span>
            View Collection
          </button>
        </motion.div>

        {/* ─── Partners strip ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <p className="text-white/35 text-[11px] font-body font-light tracking-widest uppercase mb-5">
            Crafted for every occasion
          </p>
          <div className="flex items-center flex-wrap justify-center gap-8 md:gap-14">
            {partners.map((p) => (
              <span
                key={p}
                className="text-xl md:text-2xl font-heading italic text-white/60 hover:text-white/90 transition-colors duration-200 cursor-default"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
