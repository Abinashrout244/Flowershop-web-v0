import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/useTheme";

/* ─── Google Fonts injected once ───────────────────────────── */
const injectFonts = () => {
  if (document.getElementById("fleur-fonts")) return;
  const link = document.createElement("link");
  link.id = "fleur-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500;1,600&family=DM+Sans:wght@200;300;400&display=swap";
  document.head.appendChild(link);
};

/* ─── Canvas particle palette ───────────────────────────────── */
const GOLD = [[224, 185, 106], [240, 205, 130], [200, 160, 80], [253, 235, 190], [180, 130, 60], [255, 220, 150]];
const PINK = [[210, 170, 200], [230, 190, 215], [180, 140, 170]];
const LIGHT_PETAL = [[255, 182, 193], [255, 160, 180], [255, 200, 210], [240, 150, 160], [255, 220, 230]];
const LIGHT_GOLD = [[201, 168, 124], [214, 185, 140], [188, 150, 100]];

class Petal {
  constructor(W, H, init = true, lightMode = false) {
    this.W = W; this.H = H; this.ox = 0; this.oy = 0; this.lightMode = lightMode;
    this.reset(init);
  }
  reset(init) {
    this.x = Math.random() * this.W;
    this.y = init ? Math.random() * this.H : -12;
    this.sz = 1.2 + Math.random() * 3.8;
    this.vy = 0.12 + Math.random() * 0.32;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.rot = Math.random() * Math.PI * 2;
    this.rs = (Math.random() - 0.5) * 0.014;
    this.alpha = this.lightMode ? 0.12 + Math.random() * 0.55 : 0.07 + Math.random() * 0.42;
    if (this.lightMode) {
      this.col = Math.random() > 0.4 ? LIGHT_PETAL[Math.floor(Math.random() * LIGHT_PETAL.length)] : LIGHT_GOLD[Math.floor(Math.random() * LIGHT_GOLD.length)];
    } else {
      this.col = Math.random() > 0.3 ? GOLD[Math.floor(Math.random() * GOLD.length)] : PINK[Math.floor(Math.random() * PINK.length)];
    }
    this.shape = Math.random() > 0.45 ? "petal" : "dot";
  }
  update(mouse) {
    this.y += this.vy;
    this.x += this.vx + Math.sin(this.y * 0.007 + this.rot) * 0.18;
    this.rot += this.rs;
    const dx = mouse.x - this.x, dy = mouse.y - this.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 110) {
      const f = ((110 - d) / 110) * 1.5;
      this.ox += (-dx / d) * f;
      this.oy += (-dy / d) * f;
    }
    this.ox *= 0.91; this.oy *= 0.91;
    if (this.y > this.H + 16) this.reset(false);
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.ox * 0.05, this.y + this.oy * 0.05);
    ctx.rotate(this.rot);
    ctx.globalAlpha = this.alpha;
    const [r, g, b] = this.col;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    if (this.shape === "petal") {
      ctx.beginPath();
      ctx.ellipse(0, 0, this.sz * 2.1, this.sz * 0.75, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.sz * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

class Bloom {
  constructor(x, y, lightMode = false) {
    this.x = x; this.y = y; this.r = 0; this.a = 0.65; this.dead = false; this.lightMode = lightMode;
  }
  update() {
    this.r += 3.8; this.a -= 0.02;
    if (this.a <= 0) this.dead = true;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.a;
    ctx.strokeStyle = this.lightMode ? "rgba(201,168,124,1)" : "rgba(224,185,106,1)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.stroke();
    if (this.r > 20) {
      ctx.globalAlpha = this.a * 0.35;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 0.55, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

const STATS = [
  { n: "12k+", l: "Bouquets Delivered" },
  { n: "98%",  l: "Happy Clients" },
  { n: "Daily", l: "Fresh Sourcing" },
  { n: "4hr",  l: "Same-Day Delivery" },
];

/* ─── Component ─────────────────────────────────────────────── */
const Hero = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const canvasRef  = useRef(null);
  const heroRef    = useRef(null);
  const mouseRef   = useRef({ x: 0, y: 0 });
  const petalsRef  = useRef([]);
  const bloomsRef  = useRef([]);
  const rafRef     = useRef(null);
  const isDarkRef  = useRef(isDark);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [btnHover,    setBtnHover]    = useState(null);
  const [scrollHover, setScrollHover] = useState(false);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  /* inject fonts + keyframes */
  useEffect(() => {
    injectFonts();
    if (!document.getElementById("fleur-kf")) {
      const st = document.createElement("style");
      st.id = "fleur-kf";
      st.textContent = `
        @keyframes fleurUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drip     { 0%{transform:scaleY(0) translateY(0);transform-origin:top;opacity:1} 50%{transform:scaleY(1) translateY(0);transform-origin:top;opacity:1} 100%{transform:scaleY(1) translateY(100%);transform-origin:top;opacity:0} }
        @keyframes fleurBob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(5px)} }
        .hero-stat-num  { font-size: 21px !important; }
        .hero-stat-lbl  { font-size: 9.5px !important; }
        .hero-stat-cell { padding: 18px 10px !important; }
        @media (max-width: 479px) {
          .hero-stat-num  { font-size: 15px !important; }
          .hero-stat-lbl  { font-size: 8px  !important; letter-spacing: 0.08em !important; }
          .hero-stat-cell { padding: 12px 6px !important; }
        }
      `;
      document.head.appendChild(st);
    }
  }, []);

  /* canvas loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero   = heroRef.current;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      const r = hero.getBoundingClientRect();
      W = canvas.width  = r.width;
      H = canvas.height = r.height;
      petalsRef.current = Array.from({ length: 100 }, () => new Petal(W, H, true, !isDarkRef.current));
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    hero.addEventListener("mousemove", onMove);

    const onClick = (e) => {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      for (let i = 0; i < 4; i++) bloomsRef.current.push(new Bloom(x, y, !isDarkRef.current));
    };
    hero.addEventListener("click", onClick);

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      petalsRef.current.forEach((p) => { p.update(mouseRef.current); p.draw(ctx); });
      bloomsRef.current = bloomsRef.current.filter((b) => { b.update(); b.draw(ctx); return !b.dead; });
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("click", onClick);
    };
  }, [isDark]);

  /* ── Theme tokens (dynamic — must stay as inline styles) ── */
  const T = isDark ? {
    heroBg: "#0a0603",
    ov1: "radial-gradient(ellipse 80% 65% at 50% 45%, transparent 28%, rgba(6,3,1,0.72) 100%)",
    ov2: "linear-gradient(180deg, rgba(6,3,1,0.42) 0%, transparent 35%, rgba(6,3,1,0.6) 100%)",
    eyeText: "rgba(224,185,106,0.75)",
    eyeLine: "rgba(224,185,106,0.45)",
    titleColor: "#fdf8f0",
    titleGold: "#e0b96a",
    divLine: "rgba(224,185,106,0.35)",
    divDot: "rgba(224,185,106,0.65)",
    sub: "rgba(253,248,240,0.52)",
    accent: "#e0b96a",
    btnGoldBg: "#e0b96a",
    btnGoldBgHover: "#f0cc88",
    btnGoldColor: "#1a1005",
    btnOutlineBorder: "rgba(253,248,240,0.22)",
    btnOutlineBorderHover: "rgba(224,185,106,0.55)",
    btnOutlineColor: "rgba(253,248,240,0.62)",
    btnOutlineColorHover: "#fdf8f0",
    btnOutlineBgHover: "rgba(253,248,240,0.06)",
    statsBarBg: "rgba(10,6,3,0.85)",
    statsBarBorder: "rgba(224,185,106,0.28)",
    statDivider: "rgba(224,185,106,0.12)",
    statDividerHover: "rgba(224,185,106,0.45)",
    statN: "#e0b96a",
    statNHover: "#f5d080",
    statL: "rgba(253,248,240,0.32)",
    statLHover: "rgba(253,248,240,0.7)",
    statHoverBg: "rgba(224,185,106,0.05)",
    scrollTxt: "rgba(224,185,106,0.4)",
    scrollTxtHover: "rgba(224,185,106,0.9)",
    scrollBar: "linear-gradient(to bottom, rgba(224,185,106,0.7), transparent)",
    scrollTrackBg: "rgba(224,185,106,0.12)",
    scrollChevron: "rgba(224,185,106,0.5)",
    scrollChevronHover: "rgba(224,185,106,1)",
  } : {
    heroBg: "#fdf6ee",
    ov1: "radial-gradient(ellipse 80% 65% at 50% 45%, transparent 20%, rgba(253,240,225,0.5) 100%)",
    ov2: "linear-gradient(180deg, rgba(253,240,225,0.35) 0%, transparent 40%, rgba(253,240,225,0.45) 100%)",
    eyeText: "rgba(160,110,60,0.9)",
    eyeLine: "rgba(201,168,124,0.7)",
    titleColor: "#2d1a0e",
    titleGold: "#c9823c",
    divLine: "rgba(201,168,124,0.5)",
    divDot: "rgba(201,168,124,0.7)",
    sub: "rgba(80,50,25,0.65)",
    accent: "#c9823c",
    btnGoldBg: "#c9823c",
    btnGoldBgHover: "#d9923e",
    btnGoldColor: "#fff8f2",
    btnOutlineBorder: "rgba(80,50,25,0.3)",
    btnOutlineBorderHover: "rgba(80,50,25,0.6)",
    btnOutlineColor: "rgba(80,50,25,0.7)",
    btnOutlineColorHover: "rgba(80,50,25,1)",
    btnOutlineBgHover: "rgba(80,50,25,0.05)",
    statsBarBg: "rgba(255,245,235,0.85)",
    statsBarBorder: "rgba(201,168,124,0.25)",
    statDivider: "rgba(201,168,124,0.15)",
    statDividerHover: "rgba(201,168,124,0.35)",
    statN: "#c9823c",
    statNHover: "#d9923e",
    statL: "rgba(80,50,25,0.45)",
    statLHover: "rgba(80,50,25,0.8)",
    statHoverBg: "rgba(201,168,124,0.08)",
    scrollTxt: "rgba(160,110,60,0.55)",
    scrollTxtHover: "rgba(160,110,60,1)",
    scrollBar: "linear-gradient(to bottom, rgba(201,168,124,0.8), transparent)",
    scrollTrackBg: "rgba(201,168,124,0.15)",
    scrollChevron: "rgba(201,168,124,0.5)",
    scrollChevronHover: "rgba(160,110,60,1)",
  };

  return (
    /* ── Section ── position/size/layout → Tailwind; bg/transition → inline (dynamic) */
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden text-center"
      style={{
        height: "100svh",
        minHeight: "clamp(580px, 100svh, 1080px)",
        background: T.heroBg,
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.5s ease",
      }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Overlays — bg is dynamic gradient so stays inline */}
      <div className="absolute inset-0 z-[1] pointer-events-none transition-[background] duration-500"
           style={{ background: T.ov1 }} />
      <div className="absolute inset-0 z-[1] pointer-events-none transition-[background] duration-500"
           style={{ background: T.ov2 }} />

      {/* ── Hero Content ── */}
      <div
        className="relative z-10 w-full box-border"
        style={{ padding: "0 clamp(16px, 5vw, 40px)", maxWidth: "min(700px, 92vw)" }}
      >
        {/* Eyebrow */}
        <div
          className="pt-10 md:pt-3 inline-flex items-center mb-7"
          style={{ gap: 14, opacity: 0, animation: "fleurUp 0.7s 0.15s ease forwards" }}
        >
          {/* sub-pixel height lines must stay inline */}
          <div className="w-8 transition-[background] duration-[400ms]"
               style={{ height: "0.5px", background: T.eyeLine }} />
          <span
            className="text-[10px] font-light uppercase tracking-[0.3em] transition-colors duration-[400ms]"
            style={{ color: T.eyeText }}
          >
            Artisan Floral Studio · Est. 2018
          </span>
          <div className="w-8 transition-[background] duration-[400ms]"
               style={{ height: "0.5px", background: T.eyeLine }} />
        </div>

        {/* Title */}
        <h1
          className="m-0 font-normal italic tracking-[-0.02em] transition-colors duration-[400ms]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 8vw, 5rem)",
            lineHeight: 1.08,
            color: T.titleColor,
            opacity: 0,
            animation: "fleurUp 1s 0.38s ease forwards",
          }}
        >
          Flowers That
          <br />
          <span
            className="block font-semibold italic transition-colors duration-[400ms]"
            style={{ fontFamily: "'Playfair Display', serif", color: T.titleGold }}
          >
            Speak Your Heart
          </span>
        </h1>

        {/* Divider */}
        <div
          className="flex items-center justify-center mx-auto w-fit my-6"
          style={{ gap: 14, opacity: 0, animation: "fleurUp 0.6s 0.75s ease forwards" }}
        >
          <div className="w-9 transition-[background] duration-[400ms]"
               style={{ height: "0.5px", background: T.divLine }} />
          <div className="w-[5px] h-[5px] rounded-full transition-[background] duration-[400ms]"
               style={{ background: T.divDot }} />
          <div className="w-9 transition-[background] duration-[400ms]"
               style={{ height: "0.5px", background: T.divLine }} />
        </div>

        {/* Subtitle */}
        <p
          className="font-light leading-[1.85] tracking-[0.025em] mx-auto transition-colors duration-[400ms]"
          style={{
            fontSize: "clamp(12px, 3.2vw, 14px)",
            maxWidth: "min(420px, 90vw)",
            margin: "0 auto clamp(20px, 4vw, 36px)",
            color: T.sub,
            opacity: 0,
            animation: "fleurUp 0.8s 0.9s ease forwards",
          }}
        >
          Handcrafted with the world's finest blooms. Designed for weddings,
          gifting &amp; life's most cherished moments.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap pb-5 opacity-0 animate-[fleurUp_0.8s_1.1s_ease_forwards]">
          {/* Gold CTA */}
          <button
            className="rounded-full uppercase tracking-[0.2em] text-[10px] px-6 py-3 sm:px-10 sm:py-[15px] sm:text-[11px] transition-all duration-300 cursor-pointer"
            style={{
              background: btnHover === "gold" ? T.btnGoldBgHover : T.btnGoldBg,
              color: T.btnGoldColor,
              transform: btnHover === "gold" ? "translateY(-2px)" : "none",
              boxShadow: btnHover === "gold" ? `0 8px 24px ${T.accent}33` : "none",
            }}
            onMouseEnter={() => setBtnHover("gold")}
            onMouseLeave={() => setBtnHover(null)}
            onClick={() => navigate("/flowers")}
          >
            Order Flowers
          </button>

          {/* Outline CTA */}
          <button
            className="rounded-full uppercase tracking-[0.2em] text-[10px] px-5 py-3 sm:px-8 sm:py-[15px] sm:text-[11px] transition-all duration-300 cursor-pointer"
            style={{
              background: btnHover === "outline" ? T.btnOutlineBgHover : "transparent",
              color: btnHover === "outline" ? T.btnOutlineColorHover : T.btnOutlineColor,
              border: `1px solid ${btnHover === "outline" ? T.btnOutlineBorderHover : T.btnOutlineBorder}`,
              transform: btnHover === "outline" ? "translateY(-2px)" : "none",
            }}
            onMouseEnter={() => setBtnHover("outline")}
            onMouseLeave={() => setBtnHover(null)}
            onClick={() => navigate("/shop")}
          >
            View Collection
          </button>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div
        className="absolute left-1/2 z-10 flex flex-col items-center gap-2 cursor-default"
        style={{
          bottom: "clamp(60px, 8vh, 90px)",
          transform: "translateX(-50%)",
          opacity: 0,
          animation: "fleurUp 1s 1.85s ease forwards, fleurBob 2.4s 2.85s ease-in-out infinite",
        }}
        onMouseEnter={() => setScrollHover(true)}
        onMouseLeave={() => setScrollHover(false)}
      >
        <span
          className="uppercase tracking-[0.28em] font-light text-[8px] sm:text-[9px] transition-colors duration-300"
          style={{ color: scrollHover ? T.scrollTxtHover : T.scrollTxt }}
        >
          Scroll
        </span>

        {/* Drip track */}
        <div
          className="relative w-px h-8 sm:h-11 overflow-hidden"
          style={{ background: T.scrollTrackBg }}
        >
          <div
            className="absolute inset-x-0 top-0 h-full"
            style={{ background: T.scrollBar, animation: "drip 2s ease-in-out infinite" }}
          />
        </div>

        {/* Chevron */}
        <div
          className="w-[6px] h-[6px] -mt-0.5 rotate-45 transition-[border-color] duration-300"
          style={{
            borderRight: `1px solid ${scrollHover ? T.scrollChevronHover : T.scrollChevron}`,
            borderBottom: `1px solid ${scrollHover ? T.scrollChevronHover : T.scrollChevron}`,
          }}
        />
      </div>

      {/* ── Stats bar ── */}
      <div
        className="relative md:absolute bottom-0 left-0 right-0 flex backdrop-blur-md"
        style={{
          zIndex: 15,
          background: T.statsBarBg,
          borderTop: `1px solid ${T.statsBarBorder}`,
          opacity: 0,
          animation: "fleurUp 0.9s 1.6s ease forwards",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.l}
            className="hero-stat-cell flex-1 text-center transition-all duration-300 cursor-default"
            onMouseEnter={() => setHoveredStat(i)}
            onMouseLeave={() => setHoveredStat(null)}
            style={{
              background: hoveredStat === i ? T.statHoverBg : "transparent",
              borderRight: i === STATS.length - 1
                ? "none"
                : `1px solid ${hoveredStat === i ? T.statDividerHover : T.statDivider}`,
              transform: hoveredStat === i ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            <span
              className="hero-stat-num block mb-1 font-[500] italic transition-colors duration-300"
              style={{ fontFamily: "'Playfair Display', serif", color: hoveredStat === i ? T.statNHover : T.statN }}
            >
              {s.n}
            </span>
            <span
              className="hero-stat-lbl uppercase tracking-[0.2em] font-light transition-colors duration-300"
              style={{ color: hoveredStat === i ? T.statLHover : T.statL }}
            >
              {s.l}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;