export function LoginArt() {
  return (
    <svg
      viewBox="0 0 400 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* tiny dots in the background, like pollen */}
      <g className="fill-white/20">
        <circle cx="70" cy="150" r="2" />
        <circle cx="340" cy="150" r="2.5" />
        <circle cx="45" cy="360" r="1.5" />
        <circle cx="365" cy="380" r="2" />
        <circle cx="150" cy="170" r="1.5" />
        <circle cx="260" cy="180" r="2" />
      </g>

      {/* stems */}
      <g
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-emerald-400/50"
      >
        <path d="M200 700 C198 610 202 520 200 430" />
        <path d="M185 700 C150 650 105 610 92 565" />
        <path d="M215 700 C265 650 305 610 312 555" />
      </g>

      {/* leaves */}
      <g
        strokeWidth="1.2"
        className="fill-emerald-300/20 stroke-emerald-300/50"
      >
        <ellipse
          cx="165"
          cy="590"
          rx="11"
          ry="34"
          transform="rotate(-50 165 590)"
        />
        <ellipse
          cx="235"
          cy="570"
          rx="11"
          ry="34"
          transform="rotate(50 235 570)"
        />
        <ellipse
          cx="170"
          cy="660"
          rx="10"
          ry="30"
          transform="rotate(-60 170 660)"
        />
        <ellipse
          cx="240"
          cy="655"
          rx="10"
          ry="30"
          transform="rotate(60 240 655)"
        />
        <ellipse
          cx="125"
          cy="620"
          rx="9"
          ry="26"
          transform="rotate(-55 125 620)"
        />
      </g>

      {/* small flowers on the sides */}
      <use
        href="#bloom"
        x="20"
        y="170"
        width="70"
        height="70"
        className="text-rose-200/70"
      />
      <use
        href="#bloom"
        x="315"
        y="175"
        width="65"
        height="65"
        className="text-amber-100/70"
      />
      <use
        href="#bloom"
        x="330"
        y="290"
        width="45"
        height="45"
        className="text-rose-100/60"
      />

      {/* bouquet flowers */}
      <use
        href="#bloom"
        x="30"
        y="440"
        width="125"
        height="125"
        className="text-rose-200"
      />
      <use
        href="#bloom"
        x="245"
        y="420"
        width="135"
        height="135"
        className="text-amber-100"
      />

      {/* the big center flower, turns very slowly */}
      <g className="origin-center animate-[spin_90s_linear_infinite] [transform-box:fill-box]">
        <use
          href="#bloom"
          x="85"
          y="200"
          width="230"
          height="230"
          className="text-stone-50"
        />
      </g>
    </svg>
  );
}
