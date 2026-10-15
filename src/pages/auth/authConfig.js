export const range = (n) => Array.from({ length: n }, (_, i) => i);

export const FALLING_FLOWERS = [
  { symbol: "bloom", color: "text-rose-400" },
  { symbol: "daisy", color: "text-amber-400" },
  { symbol: "tulip", color: "text-pink-400" },
  { symbol: "bloom", color: "text-fuchsia-300" },
  { symbol: "daisy", color: "text-rose-300" },
  { symbol: "tulip", color: "text-rose-400" },
];

export const PANEL_TEXT = {
  login: {
    eyebrow: "Bloom Studio",
    title: "Fresh blooms, every day.",
    subtitle: "Log in and pick up where you left off.",
  },
  signup: {
    eyebrow: "Join Bloom",
    title: "Grow with us.",
    subtitle: "Create your account and let the garden begin.",
  },
};

export const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "One number", test: (p) => /\d/.test(p) },
  {
    label: "One special character",
    test: (p) => /[^A-Za-z0-9\s]/.test(p),
  },
  {
    label: "No spaces",
    test: (p) => p.length > 0 && !/\s/.test(p),
  },
  {
    label: "No 3 repeated characters",
    test: (p) => p.length > 0 && !/(.)\1\1/.test(p),
  },
  {
    label: "Not a common password",
    test: (p) => p.length > 0 && !/password|qwerty|1234|admin/i.test(p),
  },
];

export const inputClass =
  "w-full rounded-xl border border-stone-300 bg-white/70 px-4 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900 focus:ring-4 focus:ring-stone-200";
