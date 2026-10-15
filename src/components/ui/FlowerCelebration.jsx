import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FALLING_FLOWERS } from "../../pages/auth/authConfig";
import { SvgDefs } from "../../pages/auth/SvgDefs";

function FallingFlower({ symbol, color, left, size, duration, delay }) {
  const [fallen, setFallen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setFallen(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span
      className={`pointer-events-none fixed -top-16 z-[70] transition-transform ease-linear ${color} ${
        fallen ? "translate-x-8 translate-y-[120vh] rotate-[540deg]" : ""
      }`}
      style={{
        left: `${left}vw`,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      aria-hidden="true"
    >
      <svg width={size} height={size}>
        <use href={`#${symbol}`} width="100%" height="100%" />
      </svg>
    </span>
  );
}

export default function FlowerCelebration() {
  const location = useLocation();
  const navigate = useNavigate();
  const handledLocation = useRef(null);
  const [toast, setToast] = useState("");
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const message = location.state?.celebration;
    if (!message || handledLocation.current === location.key) return;
    handledLocation.current = location.key;

    setToast(message);
    setTimeout(() => setToast(""), 3500);
    const newPetals = Array.from({ length: 40 }, (_, i) => {
      const flower = FALLING_FLOWERS[Math.floor(Math.random() * FALLING_FLOWERS.length)];
      return {
        id: `${Date.now()}-${i}`,
        symbol: flower.symbol,
        color: flower.color,
        left: Math.random() * 100,
        size: 24 + Math.random() * 26,
        duration: 4000 + Math.random() * 4000,
        delay: Math.random() * 2000,
      };
    });
    setPetals(newPetals);
    setTimeout(() => setPetals([]), 10500);

    // Clear the one-time message so later visits to this destination do not replay it.
    const { celebration: _celebration, ...remainingState } = location.state;
    navigate(location.pathname, {
      replace: true,
      state: Object.keys(remainingState).length ? remainingState : null,
    });

  }, [location.pathname, location.state, navigate]);

  if (!toast && petals.length === 0) return null;

  return (
    <>
      <SvgDefs />
      <div
        role="status"
        className={`pointer-events-none fixed left-1/2 top-6 z-[80] -translate-x-1/2 rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-800 shadow-xl transition-all duration-500 ${
          toast ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
      >
        {toast}
      </div>
      {petals.map((petal) => (
        <FallingFlower key={petal.id} {...petal} />
      ))}
    </>
  );
}
