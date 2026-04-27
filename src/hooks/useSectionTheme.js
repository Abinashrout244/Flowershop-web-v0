import { useTheme } from "../contexts/useTheme";

/**
 * Returns Tailwind class strings for the current theme.
 * Dark = black bg, white text (current style)
 * Light = cream/white bg, gray text (classic floral shop style)
 */
export const useSectionTheme = () => {
  const { isDark } = useTheme();

  return {
    isDark,
    // Section backgrounds (alternating slightly for visual rhythm)
    bg: isDark ? "bg-black" : "bg-[#faf9f7]",
    bgAlt: isDark ? "bg-[#080808]" : "bg-white",
    bgAccent: isDark ? "bg-[#050505]" : "bg-[#f8f3ec]",

    // Text
    heading: isDark ? "text-white" : "text-gray-900",
    subheading: isDark ? "text-white/50" : "text-gray-500",
    body: isDark ? "text-white/60" : "text-gray-600",
    bodyMuted: isDark ? "text-white/40" : "text-gray-400",
    label: "text-[#c9a87c]", // always gold

    // Borders
    border: isDark ? "border-white/8" : "border-[#f1e8de]",
    borderAccent: isDark ? "border-[#c9a87c]/30" : "border-[#c9a87c]/50",
    divider: isDark ? "bg-gradient-to-r from-transparent via-white/8 to-transparent" : "bg-gradient-to-r from-transparent via-[#c9a87c]/15 to-transparent",

    // Cards
    card: isDark
      ? "bg-white/4 border border-white/8 hover:bg-white/7 hover:border-[#c9a87c]/25"
      : "bg-white border border-[#f1e8de] shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]",

    // Buttons
    btnOutline: isDark
      ? "border border-white/20 text-white hover:border-[#c9a87c] hover:text-[#c9a87c]"
      : "border border-[#1a1a1a] text-gray-800 hover:bg-[#1a1a1a] hover:text-white",

    // Star colors
    starEmpty: isDark ? "fill-white/10 text-white/10" : "fill-gray-200 text-gray-200",

    // Country name text  
    countryName: isDark ? "text-white/60 group-hover:text-[#c9a87c]" : "text-gray-800 group-hover:text-[#c9a87c]",

    // Stat card
    statCard: isDark
      ? "border border-white/8 bg-white/3 hover:border-[#c9a87c]/30"
      : "border border-[#f3e9dc] bg-white/80",
    statValue: isDark ? "text-[#c9a87c]" : "text-[#8b6f47]",
    statLabel: isDark ? "text-white/50" : "text-gray-500",

    // Logo / brand text on home page when scrolled
    navBg: isDark ? "" : "",
  };
};
