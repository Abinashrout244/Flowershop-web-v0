import { useEffect, useState } from "react";
import { fetchCategories } from "../models/categoryModel";

export const useCategoriesController = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadCategories = async () => {
      try {
        const result = await fetchCategories();
        if (isActive) setCategories(result);
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message || "Unable to load categories.");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadCategories();
    return () => {
      isActive = false;
    };
  }, []);

  return { categories, loading, error };
};
