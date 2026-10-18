import { useEffect, useState } from "react";
import { fetchProducts } from "../models/productModel";

export const useProductsController = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      try {
        const result = await fetchProducts();
        if (isActive) setProducts(result);
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message || "Failed to fetch products");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadProducts();
    return () => {
      isActive = false;
    };
  }, []);

  return { products, loading, error };
};
