import { supabase } from "../lib/supabaseClient";

const mapCartRow = (row) => {
  const snapshot = row.item_snapshot || {};

  return {
    id: row.product_id,
    name: snapshot.name || "Flower",
    price: Number(snapshot.price) || 0,
    image: snapshot.image || "",
    size: row.size,
    qty: row.quantity,
    key: `${row.product_id}_${row.size}`,
  };
};

const toCartPayload = (item) => ({
  id: Number(item.id),
  name: item.name || "Flower",
  price: Number(item.price) || 0,
  image: item.image || "",
  size: item.size || "Medium",
  qty: Math.max(1, Number(item.qty) || 1),
});

export const fetchCartItems = async (userId) => {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      "id, user_id, product_id, size, quantity, item_snapshot, created_at",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data || []).map(mapCartRow);
};

export const mergeCartItems = async (items) => {
  if (!items || items.length === 0) return;

  const payload = items.map(toCartPayload);

  const { error } = await supabase.rpc("merge_cart_items", {
    p_items: payload,
  });

  if (error) throw error;
};

export const addCartItem = async (item) => {
  await mergeCartItems([item]);
};

export const updateCartItem = async (userId, item) => {
  const { error } = await supabase
    .from("cart_items")
    .update({
      quantity: Math.max(1, Number(item.qty) || 1),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("product_id", Number(item.id))
    .eq("size", item.size);

  if (error) throw error;
};

export const removeCartItem = async (userId, item) => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", Number(item.id))
    .eq("size", item.size);

  if (error) throw error;
};

export const clearUserCart = async (userId) => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
};
