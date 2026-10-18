import {
  LayoutGrid,
  Flower2,
  Sun,
  Flower,
  Sprout,
  Gift,
  Sparkles,
  TreePalm,
} from "lucide-react";

export const COLLECTIONS = [
  { id: "All", label: "All Products", icon: LayoutGrid, count: 0 },
  { id: "Roses", label: "Roses", icon: Flower2, count: 0 },
  { id: "Sunflowers", label: "Sunflowers", icon: Sun, count: 0 },
  { id: "Lilies", label: "Lilies", icon: Flower, count: 0 },
  { id: "Orchids", label: "Orchids", icon: Flower2, count: 0 },
  { id: "Tulips", label: "Tulips", icon: Flower, count: 0 },
  { id: "Mixed", label: "Mixed Bouquets", icon: Sparkles, count: 0 },
  { id: "Gifts", label: "Gift Hampers", icon: Gift, count: 0 },
  { id: "Plants", label: "Plants", icon: Sprout, count: 0 },
  { id: "Seasonal", label: "Seasonal", icon: Sparkles, count: 0 },
  { id: "Tropical", label: "Tropical", icon: TreePalm, count: 0 },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "asc", label: "Price: Low to High" },
  { value: "desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
  { value: "new", label: "Newest First" },
];

export const OCCASIONS = [
  "All Occasions",
  "Birthday",
  "Anniversary",
  "Wedding",
  "Valentine's Day",
  "Get Well Soon",
  "Sympathy",
  "Congratulations",
  "Housewarming",
  "Corporate Gift",
];

export const HERO_SLIDES = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661721878167-16f464003c99?w=1800&q=90",
    eyebrow: "Signature Curation",
    title: "Luxury Florals For Every Grand Gesture",
    subtitle:
      "Hand-composed stems, wrapped with artisan finesse and delivered with white-glove care.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1613052271194-5427710fb39d?w=1800&q=90",
    eyebrow: "Seasonal Prestige",
    title: "Rare Blooms, Timeless Elegance",
    subtitle:
      "Discover premium arrangements sourced from celebrated farms and curated by master florists.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1696420123748-d1e194b7d50b?w=1800&q=90",
    eyebrow: "Bespoke Experience",
    title: "Elevate Celebrations With Couture Bouquets",
    subtitle:
      "From intimate dinners to lavish soirÃ©es, find statement florals that define the moment.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1737975476425-e99004ff029c?w=1800&q=90",
    eyebrow: "Fresh Arrivals",
    title: "Handpicked Blooms From Global Farms",
    subtitle:
      "Every stem is selected at peak freshness for unmatched beauty and longevity.",
  },
];

export const FLOWER_ONLY_IMAGES = {
  default: [
    "https://images.unsplash.com/photo-1490750967868-88cb44cb271b?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1457089328109-e5d9f56adce9?w=1200&q=85&auto=format",
  ],

  Roses: [
    "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=1200&q=85&auto=format",
  ],

  Sunflowers: [
    "https://images.unsplash.com/photo-1548291616-bfccc8db731d?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1542801204-141ec23989d7?w=1200&q=85&auto=format",
  ],

  Lilies: [
    "https://images.unsplash.com/photo-1580595999172-787970a962d8?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1486102515046-44130769cb25?w=1200&q=85&auto=format",
  ],

  Orchids: [
    "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=1200&q=85&auto=format",
  ],

  Tulips: [
    "https://images.unsplash.com/photo-1587316830148-c9b01df2da38?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?w=1200&q=85&auto=format",
  ],

  Mixed: [
    `https://images.unsplash.com/photo-1597583995844-edce63cc1cb0?w=800&q=85&auto=format`,
    `https://images.unsplash.com/photo-1595886535782-0f757640a574?w=800&q=85&auto=format`,
    `https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?w=800&q=85&auto=format`,
  ],

  Gifts: [
    "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1200&q=85&auto=format",
  ],

  Plants: [
    "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1671166739837-b175ef95cb48?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1709716341475-323bdcbeb637?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1644585951614-0c2b3a7bbe9b?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1644585949224-cbe48d2cc2d6?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1684912950515-926f6dd5d5c7?w=1200&q=85&auto=format",
  ],

  Seasonal: [
    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1602934585418-f588bea4215c?w=1200&q=85&auto=format",
  ],

  Tropical: [
    "https://images.unsplash.com/photo-1688481156464-4285423c8b39?w=1200&q=85&auto=format",
    "https://images.unsplash.com/photo-1603025322900-fcaaff571e12?w=1200&q=85&auto=format",
  ],
};
