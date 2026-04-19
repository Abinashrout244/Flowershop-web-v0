import { useMemo } from "react";
import { selectCartItems } from "../features/cart/cartSlice";
import { useAppSelector } from "../store/hooks";

const useCart = () => {
  const items = useAppSelector(selectCartItems);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
  return { items, count };
};

export default useCart;
