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
const GOLD = [
  [224, 185, 106],[240, 205, 130],[200, 160, 80],
  [253, 235, 190],[180, 130, 60],[255, 220, 150],
];
const PINK = [[210, 170, 200],[230, 190, 215],[180, 140, 170]];
const LIGHT_PETAL = [
  [255, 182, 193],[255, 160, 180],[255, 200, 210],
  [240, 150, 160],[255, 220, 230],
];
const LIGHT_GOLD = [[201, 168, 124],[214, 185, 140],[188, 150, 100]];

class Petal {
  constructor(W, H, init = true, lightMode = false) {
    this.W = W; this.H = H; this.ox = 0; this.oy = 0;
    this.lightMode = lightMode;
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
      this.col = Math.random() > 0.4
        ? LIGHT_PETAL[Math.floor(Math.random() * LIGHT_PETAL.length)]
        : LIGHT_GOLD[Math.floor(Math.random() * LIGHT_GOLD.length)];
    } else {
      this.col = Math.random() > 0.3
        ? GOLD[Math.floor(Math.random() * GOLD.length)]
        : PINK[Math.floor(Math.random() * PINK.length)];
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
      this.ox += (-dx / d) * f; this.oy += (-dy / d) * f;
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
    this.x = x; this.y = y; this.r = 0; this.a = 0.65;
    this.dead = false; this.lightMode = lightMode;
  }
  update() { this.r += 3.8; this.a -= 0.02; if (this.a <= 0) this.dead = true; }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.a;
    ctx.strokeStyle = this.lightMode ? "rgba(201,168,124,1)" : "rgba(224,185,106,1)";
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.stroke();
    if (this.r > 20) {
      ctx.globalAlpha = this.a * 0.35;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r * 0.55, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
  }
}

const STATS = [
  { n: "12k+", l: "Bouquets Delivered" },
  { n: "98%",  l: "Happy Clients" },
  { n: "Daily",l: "Fresh Sourcing" },
  { n: "4hr",  l: "Same-Day Delivery" },
];

const TAGS = ["Hand-Picked","Same Day","Bespoke","Seasonal","Eco-Sourced","Studio Fresh"];

/* ─── Component ─────────────────────────────────────────────── */
const Hero = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const canvasRef  = useRef(null);
  const heroRef    = useRef(null);
  const mouseRef   = useRef({ x: 0, y: 0 });
  const petalsRef  = useRef([]);
  const bloomsRef  = useRef([]);
  const rafRef     = useRef(null);
  const isDarkRef  = useRef(isDark);
  const [activeTag, setActiveTag]     = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [btnHover, setBtnHover]       = useState(null); // "gold" | "outline"
  const [scrollHover, setScrollHover] = useState(false);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  /* inject fonts + keyframes */
  useEffect(() => {
    injectFonts();
    if (!document.getElementById("fleur-kf")) {
      const st = document.createElement("style");
      st.id = "fleur-kf";
      st.textContent = `
        @keyframes fleurUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fleurPulse { 0%,100%{opacity:0.3;transform:scaleY(0.65) translateY(-4px)} 50%{opacity:1;transform:scaleY(1) translateY(0)} }
        @keyframes drip       { 0%{transform:scaleY(0) translateY(0);transform-origin:top;opacity:1} 50%{transform:scaleY(1) translateY(0);transform-origin:top;opacity:1} 100%{transform:scaleY(1) translateY(100%);transform-origin:top;opacity:0} }
        @keyframes fleurBob   { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(5px)} }
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
      W = canvas.width = r.width; H = canvas.height = r.height;
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
      for (let i = 0; i < 6; i++) {
        const p = new Petal(W, H, false, !isDarkRef.current);
        p.x = x; p.y = y;
        p.vx = (Math.random() - 0.5) * 2.5;
        p.vy = -1 - Math.random() * 2;
        p.alpha = 0.5 + Math.random() * 0.4;
        petalsRef.current.push(p);
      }
    };
    hero.addEventListener("click", onClick);

    const drawBg = () => {
      const light = !isDarkRef.current;
      if (light) {
        ctx.fillStyle = "#fdf6ee"; ctx.fillRect(0, 0, W, H);
        const cx = W / 2, cy = H * 0.4;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.7);
        g.addColorStop(0, "rgba(255,235,210,0.85)"); g.addColorStop(0.5, "rgba(255,245,230,0.4)"); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        const g2 = ctx.createRadialGradient(W * 0.1, H * 0.1, 0, W * 0.1, H * 0.1, W * 0.45);
        g2.addColorStop(0, "rgba(255,200,210,0.25)"); g2.addColorStop(1, "transparent");
        ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
        const g3 = ctx.createRadialGradient(W * 0.85, H * 0.8, 0, W * 0.85, H * 0.8, W * 0.35);
        g3.addColorStop(0, "rgba(201,168,124,0.15)"); g3.addColorStop(1, "transparent");
        ctx.fillStyle = g3; ctx.fillRect(0, 0, W, H);
      } else {
        ctx.fillStyle = "#0a0603"; ctx.fillRect(0, 0, W, H);
        const cx = W / 2, cy = H * 0.4;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.6);
        g.addColorStop(0, "rgba(55,38,10,0.6)"); g.addColorStop(0.5, "rgba(28,18,5,0.35)"); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        const g2 = ctx.createRadialGradient(cx * 1.4, cy * 0.6, 0, cx * 1.4, cy * 0.6, W * 0.28);
        g2.addColorStop(0, "rgba(224,185,106,0.06)"); g2.addColorStop(1, "transparent");
        ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
      }
    };

    const loop = () => {
      drawBg();
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
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current, hero = heroRef.current;
    if (!canvas || !hero) return;
    const r = hero.getBoundingClientRect();
    petalsRef.current = Array.from({ length: 100 }, () => new Petal(r.width, r.height, true, !isDark));
    bloomsRef.current = [];
  }, [isDark]);

  /* ── Theme tokens ── */
  const T = isDark ? {
    heroBg: "#0a0603",
    ov1: "radial-gradient(ellipse 80% 65% at 50% 45%, transparent 28%, rgba(6,3,1,0.72) 100%)",
    ov2: "linear-gradient(180deg, rgba(6,3,1,0.42) 0%, transparent 35%, rgba(6,3,1,0.6) 100%)",
    eyeText: "rgba(224,185,106,0.75)", eyeLine: "rgba(224,185,106,0.55)",
    titleColor: "#fdf8f0", titleGold: "#e0b96a",
    divLine: "rgba(224,185,106,0.3)", divDot: "rgba(224,185,106,0.5)",
    sub: "rgba(253,248,240,0.52)",
    accent: "#e0b96a",
    btnGoldBg: "#e0b96a",       btnGoldBgHover: "#f0cc88",
    btnGoldColor: "#1a1005",
    btnOutlineBorder: "rgba(253,248,240,0.26)", btnOutlineBorderHover: "rgba(253,248,240,0.55)",
    btnOutlineColor: "rgba(253,248,240,0.62)",  btnOutlineColorHover: "rgba(253,248,240,0.95)",
    btnOutlineBgHover: "rgba(253,248,240,0.06)",
    tagColor: "rgba(253,248,240,0.3)",  tagColorActive: "#1a1005",
    tagBorder: "rgba(253,248,240,0.1)",
    tagHoverColor: "rgba(253,248,240,0.65)", tagHoverBorder: "rgba(224,185,106,0.45)",
    statsBarBg: "rgba(10,6,3,0.55)", statsBarBorder: "rgba(224,185,106,0.1)",
    statDivider: "rgba(224,185,106,0.08)",
    statN: "#e0b96a", statNHover: "#f5d080",
    statL: "rgba(253,248,240,0.32)", statLHover: "rgba(253,248,240,0.6)",
    statHoverBg: "rgba(224,185,106,0.06)",
    scrollTxt: "rgba(224,185,106,0.4)", scrollTxtHover: "rgba(224,185,106,0.9)",
    scrollBar: "linear-gradient(to bottom, rgba(224,185,106,0.7), transparent)",
    scrollTrackBg: "rgba(224,185,106,0.12)",
    scrollChevron: "rgba(224,185,106,0.5)", scrollChevronHover: "rgba(224,185,106,1)",
  } : {
    heroBg: "#fdf6ee",
    ov1: "radial-gradient(ellipse 80% 65% at 50% 45%, transparent 20%, rgba(253,240,225,0.5) 100%)",
    ov2: "linear-gradient(180deg, rgba(253,240,225,0.35) 0%, transparent 40%, rgba(253,240,225,0.45) 100%)",
    eyeText: "rgba(160,110,60,0.9)", eyeLine: "rgba(201,168,124,0.7)",
    titleColor: "#2d1a0e", titleGold: "#c9823c",
    divLine: "rgba(201,168,124,0.5)", divDot: "rgba(201,168,124,0.7)",
    sub: "rgba(80,50,25,0.65)",
    accent: "#c9823c",
    btnGoldBg: "#c9823c",       btnGoldBgHover: "#d9923e",
    btnGoldColor: "#fff8f2",
    btnOutlineBorder: "rgba(80,50,25,0.3)", btnOutlineBorderHover: "rgba(80,50,25,0.6)",
    btnOutlineColor: "rgba(80,50,25,0.7)",  btnOutlineColorHover: "rgba(80,50,25,1)",
    btnOutlineBgHover: "rgba(80,50,25,0.05)",
    tagColor: "rgba(80,50,25,0.4)",  tagColorActive: "#fff8f2",
    tagBorder: "rgba(80,50,25,0.12)",
    tagHoverColor: "rgba(80,50,25,0.8)", tagHoverBorder: "rgba(201,168,124,0.6)",
    statsBarBg: "rgba(255,245,235,0.85)", statsBarBorder: "rgba(201,168,124,0.25)",
    statDivider: "rgba(201,168,124,0.15)",
    statN: "#c9823c", statNHover: "#d9923e",
    statL: "rgba(80,50,25,0.45)", statLHover: "rgba(80,50,25,0.8)",
    statHoverBg: "rgba(201,168,124,0.08)",
    scrollTxt: "rgba(160,110,60,0.55)", scrollTxtHover: "rgba(160,110,60,1)",
    scrollBar: "linear-gradient(to bottom, rgba(201,168,124,0.8), transparent)",
    scrollTrackBg: "rgba(201,168,124,0.15)",
    scrollChevron: "rgba(201,168,124,0.5)", scrollChevronHover: "rgba(160,110,60,1)",
  };

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative", height: "100vh", minHeight: 680,
        overflow: "hidden", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        background: T.heroBg, fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.5s ease",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Overlays */}
      <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none", background:T.ov1, transition:"background 0.5s ease" }} />
      <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none", background:T.ov2, transition:"background 0.5s ease" }} />

      {/* ── Hero Content ── */}
      <div style={{ position:"relative", zIndex:10, padding:"0 24px", maxWidth:700 }}>

        {/* Eyebrow */}
        <div className="pt-10 md:pt-3" style={{ display:"inline-flex", alignItems:"center", gap:14, marginBottom:28, opacity:0, animation:"fleurUp 0.7s 0.15s ease forwards" }}>
          <div style={{ width:32, height:0.5, background:T.eyeLine, transition:"background 0.4s" }} />
          <span style={{ fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", color:T.eyeText, fontWeight:300, transition:"color 0.4s" }}>
            Artisan Floral Studio · Est. 2018
          </span>
          <div style={{ width:32, height:0.5, background:T.eyeLine, transition:"background 0.4s" }} />
        </div>

        {/* Title */}
        <h1 style={{ fontFamily:"'Playfair Display', serif", fontWeight:400, fontStyle:"italic", fontSize:"clamp(3rem, 7vw, 5rem)", lineHeight:1.04, color:T.titleColor, letterSpacing:"-0.025em", margin:0, opacity:0, animation:"fleurUp 1s 0.38s ease forwards", transition:"color 0.4s" }}>
          Flowers That<br />
          <span style={{ display:"block", color:T.titleGold, fontWeight:600, fontStyle:"italic", fontFamily:"'Playfair Display', serif", transition:"color 0.4s" }}>
            Speak Your Heart
          </span>
        </h1>

        {/* Divider */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, margin:"24px auto", width:"fit-content", opacity:0, animation:"fleurUp 0.6s 0.75s ease forwards" }}>
          <div style={{ width:36, height:0.5, background:T.divLine, transition:"background 0.4s" }} />
          <div style={{ width:5, height:5, borderRadius:"50%", background:T.divDot, transition:"background 0.4s" }} />
          <div style={{ width:36, height:0.5, background:T.divLine, transition:"background 0.4s" }} />
        </div>

        {/* Subtitle */}
        <p style={{ fontSize:14, fontWeight:300, lineHeight:1.9, color:T.sub, maxWidth:420, margin:"0 auto 36px", letterSpacing:"0.025em", opacity:0, animation:"fleurUp 0.8s 0.9s ease forwards", transition:"color 0.4s" }}>
          Handcrafted with the world's finest blooms. Designed for weddings,
          gifting &amp; life's most cherished moments.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap opacity-0 animate-[fleurUp_0.8s_1.1s_ease_forwards] pb-5">
          <button
            className="rounded-full uppercase tracking-[0.2em] px-6 py-3 text-[10px] sm:px-10 sm:py-[15px] sm:text-[11px]"
            style={{
              background: btnHover === "gold" ? T.btnGoldBgHover : T.btnGoldBg,
              color: T.btnGoldColor,
              transform: btnHover === "gold" ? "translateY(-2px)" : "translateY(0)",
              boxShadow: btnHover === "gold" ? `0 6px 20px ${T.accent}44` : "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={() => setBtnHover("gold")}
            onMouseLeave={() => setBtnHover(null)}
            onClick={() => navigate("/flowers")}
          >
            Order Flowers
          </button>

          <button
            className="rounded-full uppercase tracking-[0.2em] border px-5 py-3 text-[10px] sm:px-8 sm:py-[15px] sm:text-[11px]"
            style={{
              borderColor: btnHover === "outline" ? T.btnOutlineBorderHover : T.btnOutlineBorder,
              color: btnHover === "outline" ? T.btnOutlineColorHover : T.btnOutlineColor,
              background: btnHover === "outline" ? T.btnOutlineBgHover : "transparent",
              transform: btnHover === "outline" ? "translateY(-2px)" : "translateY(0)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={() => setBtnHover("outline")}
            onMouseLeave={() => setBtnHover(null)}
            onClick={() => navigate("/shop")}
          >
            View Collection
          </button>
        </div>

        {/* Tags */}
        <div className="flex items-center justify-center flex-wrap gap-2 md:pt-6 md:pb-8 opacity-0 animate-[fleurUp_0.8s_1.35s_ease_forwards]">
          {TAGS.map((t) => {
            const isActive = activeTag === t;
            return (
              <span
                key={t}
                onClick={() => setActiveTag(isActive ? null : t)}
                className="relative inline-flex items-center gap-1.5 uppercase font-light cursor-pointer overflow-hidden select-none text-[9px] tracking-[0.13em] px-2.5 py-1 sm:text-[10.5px] sm:tracking-[0.18em] sm:px-[18px] sm:py-[7px]"
                style={{
                  color: isActive ? T.tagColorActive : T.tagColor,
                  background: isActive ? T.accent : "transparent",
                  border: `0.5px solid ${isActive ? T.accent : T.tagBorder}`,
                  transform: isActive ? "translateY(-2px) scale(1.03)" : "translateY(0) scale(1)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = T.tagHoverColor;
                    e.currentTarget.style.borderColor = T.tagHoverBorder;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = T.tagColor;
                    e.currentTarget.style.borderColor = T.tagBorder;
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: "currentColor", flexShrink: 0,
                  transition: "opacity 0.25s, transform 0.25s",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(0)",
                }} />
                {t}
              </span>
            );
          })}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute left-1/2 bottom-12 sm:bottom-[72px] z-10 flex flex-col items-center gap-2 cursor-default"
        style={{
          transform: "translateX(-50%)",
          opacity: 0,
          animation: "fleurUp 1s 1.85s ease forwards, fleurBob 2.4s 2.85s ease-in-out infinite",
        }}
        onMouseEnter={() => setScrollHover(true)}
        onMouseLeave={() => setScrollHover(false)}
      >
        <span
          className="uppercase tracking-[0.28em] font-light text-[8px] sm:text-[9px]"
          style={{ color: scrollHover ? T.scrollTxtHover : T.scrollTxt, transition: "color 0.3s ease" }}
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
        <div style={{
          width: 6, height: 6, marginTop: -2,
          borderRight: `1px solid ${scrollHover ? T.scrollChevronHover : T.scrollChevron}`,
          borderBottom: `1px solid ${scrollHover ? T.scrollChevronHover : T.scrollChevron}`,
          transform: "rotate(45deg)",
          transition: "border-color 0.3s ease",
        }} />
      </div>

      {/* Stats bar */}
      <div
        className="relative md:absolute bottom-0 md:bottom-0 left-0 md:left-0 right-0 md:right-0"
        style={{ zIndex:15, display:"flex", background:T.statsBarBg, borderTop:`0.5px solid ${T.statsBarBorder}`, opacity:0, animation:"fleurUp 0.9s 1.6s ease forwards", transition:"background 0.4s, border 0.4s", backdropFilter: isDark ? "none" : "blur(12px)", WebkitBackdropFilter: isDark ? "none" : "blur(12px)" }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.l}
            onMouseEnter={() => setHoveredStat(i)}
            onMouseLeave={() => setHoveredStat(null)}
            style={{
              flex: 1, padding: "18px 10px", textAlign: "center",
              borderRight: i === STATS.length - 1 ? "none" : `0.5px solid ${T.statDivider}`,
              background: hoveredStat === i ? T.statHoverBg : "transparent",
              transform: hoveredStat === i ? "translateY(-2px)" : "translateY(0)",
              transition: "background 0.25s ease, transform 0.25s ease, border 0.4s",
              cursor: "default",
            }}
          >
            <span style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              fontSize: 21, fontWeight: 400, lineHeight: 1, display: "block", marginBottom: 5,
              color: hoveredStat === i ? T.statNHover : T.statN,
              transition: "color 0.25s ease",
            }}>
              {s.n}
            </span>
            <span style={{
              fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300,
              color: hoveredStat === i ? T.statLHover : T.statL,
              transition: "color 0.25s ease",
            }}>
              {s.l}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;