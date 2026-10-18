import { supabase } from "../lib/supabaseClient";

export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, name, image_url, filter_type, filter_value, parent_category, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
};
