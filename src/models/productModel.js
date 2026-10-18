import { supabase } from "../lib/supabaseClient";

const normalizeProduct = (product) => ({
  ...product,
  id: Number(product.id),
  price: Number(product.price ?? 0),
  originalPrice: Number(product.originalprice ?? 0),
  rating: Number(product.rating ?? 0),
  reviews: Number(product.reviews ?? 0),
  longDescription: product.longdescription ?? "",
  deliveryInfo: product.deliveryinfo ?? "",
  inStock: product.instock ?? false,
  occasions: product.occasions ?? [],
  sizes: product.sizes ?? [],
  images: product.images ?? [],
});

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(normalizeProduct);
};

export const getProductById = (products, id) =>
  products.find((product) => product.id === Number(id));

export const getProductBySlug = (products, slug) =>
  products.find((product) => product.slug === slug);

export const getProductsByCategory = (products, category) =>
  category === "All"
    ? products
    : products.filter((product) => product.category === category);

export const searchProducts = (products, query) => {
  const normalizedQuery = query.toLowerCase();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      (product.occasions ?? []).some((occasion) =>
        occasion.toLowerCase().includes(normalizedQuery),
      ),
  );
};

export const flowerCategories = [
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
