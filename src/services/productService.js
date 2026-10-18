import { supabse } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

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

export const ProductService = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProd = async () => {
      try {
        const { data, error } = await supabse
          .from("products")
          .select("*")
          .order("id", { ascending: true });
        if (error) {
          throw error;
        }

        setProducts((data ?? []).map(normalizeProduct));
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProd();
  }, []);

  return { products, loading, error };
};
