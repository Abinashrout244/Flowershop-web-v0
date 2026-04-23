export const extractNominatimAddress = (address = {}) => ({
  city:
    address.city ||
    address.town ||
    address.village ||
    address.hamlet ||
    address.suburb ||
    address.county ||
    "",
  state: address.state || address.region || "",
  pincode: address.postcode || "",
});

export const formatDisplayAddress = (result = {}) => {
  if (result.display_name) return result.display_name;

  const parts = [
    [result.address?.house_number, result.address?.road]
      .filter(Boolean)
      .join(" ")
      .trim(),
    result.address?.suburb,
    result.address?.city ||
      result.address?.town ||
      result.address?.village ||
      result.address?.hamlet,
    result.address?.state,
    result.address?.postcode,
    result.address?.country,
  ].filter(Boolean);

  return parts.join(", ");
};

export const loadAddressHistory = () => {
  try {
    const saved = localStorage.getItem("flora_address_history");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const normalizeText = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ");

export const compressRepeatedChars = (value = "") =>
  value.replace(/([a-z])\1+/g, "$1");

export const levenshteinDistance = (a = "", b = "") => {
  if (!a) return b.length;
  if (!b) return a.length;

  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const curr = [i];
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j += 1) {
      prev[j] = curr[j];
    }
  }

  return prev[b.length];
};

export const buildSuggestionText = (entry = {}) =>
  normalizeText(
    [entry.address, entry.city, entry.state, entry.pincode]
      .filter(Boolean)
      .join(" "),
  );

export const scoreSuggestion = (query, entry = {}) => {
  const q = compressRepeatedChars(normalizeText(query));
  const text = compressRepeatedChars(buildSuggestionText(entry));

  if (!q || !text) return 0;
  if (text.startsWith(q)) return 500 - text.length;
  if (text.includes(q)) return 350 - text.length;

  const qWords = q.split(" ").filter(Boolean);
  const textWords = text.split(" ").filter(Boolean);
  const tokenHit = qWords.some((word) =>
    textWords.some(
      (candidate) => candidate.startsWith(word) || candidate.includes(word),
    ),
  );
  if (tokenHit) return 250 - text.length;

  const distance = levenshteinDistance(q, text.slice(0, Math.max(q.length, 8)));
  return Math.max(0, 120 - distance * 12);
};

export const buildManualSuggestions = (query, focused, addressHistory) => {
  const normalizedQuery = query.trim();
  if (!focused || normalizedQuery.length < 2) return [];

  const rankedHistory = [...addressHistory]
    .map((entry) => ({
      ...entry,
      _score: scoreSuggestion(normalizedQuery, entry),
    }))
    .filter((entry) => entry._score > 0)
    .sort((a, b) => {
      if (b._score !== a._score) return b._score - a._score;
      return (b.ts || 0) - (a.ts || 0);
    });

  const searchPrompt = {
    type: "search",
    label: `Search "${normalizedQuery}"`,
    hint: "Find this text on OpenStreetMap",
    address: normalizedQuery,
    _score: 1000,
  };

  return [searchPrompt, ...rankedHistory].slice(0, 6);
};
