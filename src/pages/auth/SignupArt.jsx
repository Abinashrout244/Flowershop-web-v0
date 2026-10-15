export function SignupArt() {
  return (
    <svg
      viewBox="0 0 400 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* tiny dots in the background */}
      <g className="fill-white/20">
        <circle cx="120" cy="190" r="2" />
        <circle cx="250" cy="200" r="2.5" />
        <circle cx="40" cy="400" r="1.5" />
        <circle cx="365" cy="420" r="2" />
        <circle cx="300" cy="260" r="1.5" />
      </g>

      {/* long leaves at the bottom */}
      <g
        strokeWidth="1.2"
        className="fill-emerald-300/20 stroke-emerald-300/50"
      >
        <path d="M190 700 C140 640 120 580 135 520 C170 570 190 630 190 700 Z" />
        <path d="M212 700 C262 650 280 590 268 540 C235 585 214 640 212 700 Z" />
      </g>

      {/* stems */}
      <g
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-emerald-400/50"
      >
        <path d="M200 700 C204 600 196 480 200 378" />
        <path d="M185 700 C160 640 110 590 105 496" />
        <path d="M215 700 C250 650 292 580 295 477" />
      </g>

      {/* daisies */}
      <use
        href="#daisy"
        x="30"
        y="175"
        width="80"
        height="80"
        className="text-stone-50/80"
      />
      <use
        href="#daisy"
        x="305"
        y="170"
        width="90"
        height="90"
        className="text-amber-100/80"
      />
      <use
        href="#daisy"
        x="330"
        y="285"
        width="50"
        height="50"
        className="text-stone-50/70"
      />
      <use
        href="#daisy"
        x="55"
        y="300"
        width="55"
        height="55"
        className="text-amber-100/70"
      />

      {/* tulips: center is the biggest */}
      <use
        href="#tulip"
        x="60"
        y="400"
        width="90"
        height="105"
        className="text-amber-100"
      />
      <use
        href="#tulip"
        x="245"
        y="370"
        width="100"
        height="117"
        className="text-pink-200"
      />
      <use
        href="#tulip"
        x="140"
        y="250"
        width="120"
        height="140"
        className="text-rose-200"
      />
    </svg>
  );
}
