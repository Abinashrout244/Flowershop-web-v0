export const getProductById = (id, products = []) =>
  products.find((p) => p.id === Number(id));

export const getProductBySlug = (slug, products = []) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (cat, products = []) =>
  cat === "All" ? products : products.filter((p) => p.category === cat);

export const categories = [
  "All",
  "Roses",
  "Sunflowers",
  "Lilies",
  "Orchids",
  "Tulips",
  "Mixed",
  "Gifts",
  "Seasonal",
  "Tropical",
];

export const searchProducts = (query, products = []) =>
  products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      (p.occasions ?? []).some((o) =>
        o.toLowerCase().includes(query.toLowerCase()),
      ),
  );
