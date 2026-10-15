import { range } from "./authConfig";
export function SvgDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        {/* Layered bloom: outer petals + inner petals + center */}
        <symbol id="bloom" viewBox="-60 -60 120 120">
          <g
            fill="currentColor"
            fillOpacity="0.22"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            {range(8).map((i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-30"
                rx="14"
                ry="30"
                transform={`rotate(${i * 45})`}
              />
            ))}
          </g>
          <g
            fill="currentColor"
            fillOpacity="0.4"
            stroke="currentColor"
            strokeWidth="1"
          >
            {range(8).map((i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-18"
                rx="9"
                ry="18"
                transform={`rotate(${i * 45 + 22.5})`}
              />
            ))}
          </g>
          <circle r="9" fill="#fcd34d" />
        </symbol>

        {/* Daisy: many thin petals */}
        <symbol id="daisy" viewBox="-50 -50 100 100">
          <g
            fill="currentColor"
            fillOpacity="0.3"
            stroke="currentColor"
            strokeWidth="1"
          >
            {range(12).map((i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-30"
                rx="6"
                ry="20"
                transform={`rotate(${i * 30})`}
              />
            ))}
          </g>
          <circle r="10" fill="#fbbf24" />
        </symbol>

        {/* Tulip: a cup with a pointed crown */}
        <symbol id="tulip" viewBox="-30 -40 60 70">
          <path
            d="M-22 -30 L-11 -18 L0 -34 L11 -18 L22 -30 C26 -5 14 22 0 24 C-14 22 -26 -5 -22 -30 Z"
            fill="currentColor"
            fillOpacity="0.35"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M0 -34 C-5 -10 -5 8 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
        </symbol>
      </defs>
    </svg>
  );
}
