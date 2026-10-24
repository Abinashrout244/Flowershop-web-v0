import {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  applyPromo,
  replaceCartItems,
} from "./cartSlice";

import {
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearUserCart,
  fetchCartItems,
} from "../../models/cartModel";

let syncQueue = Promise.resolve();

const persistGuestCart = (cart) => {
  try {
    if (typeof localStorage === "undefined") return;

    const { isReady, ...cartToSave } = cart;

    if (cart.items.length === 0 && !cart.promoCode && !cart.promoApplied) {
      localStorage.removeItem("flora_cart");
    } else {
      localStorage.setItem("flora_cart", JSON.stringify(cartToSave));
    }
  } catch (error) {
    console.error("Unable to save guest cart:", error);
  }
};

export const cartSyncMiddleware = (store) => (next) => (action) => {
  const previousCart = store.getState().cart;
  const result = next(action);

  const cartActions = [
    addToCart.type,
    removeFromCart.type,
    updateQty.type,
    clearCart.type,
    applyPromo.type,
  ];

  if (!cartActions.includes(action.type)) return result;

  const { cart, auth } = store.getState();

  if (auth.isLoading || !cart.isReady) return result;

  const userId = auth.user?.id;

  if (!userId) {
    persistGuestCart(cart);
    return result;
  }

  if (action.type === applyPromo.type) return result;

  const removedItem =
    action.type === removeFromCart.type
      ? previousCart.items.find((item) => item.key === action.payload)
      : null;

  // Capture the requested quantity immediately, not later.
  const updatedItem =
    action.type === updateQty.type
      ? cart.items.find((item) => item.key === action.payload.key)
      : null;

  const addedItem =
    action.type === addToCart.type ? { ...action.payload } : null;

  syncQueue = syncQueue
    .catch(() => {})
    .then(async () => {
      if (store.getState().auth.user?.id !== userId) return;

      if (action.type === addToCart.type && addedItem) {
        await addCartItem(addedItem);
      }

      if (action.type === removeFromCart.type && removedItem) {
        await removeCartItem(userId, removedItem);
      }

      if (action.type === updateQty.type && updatedItem) {
        await updateCartItem(userId, updatedItem);
      }

      if (action.type === clearCart.type) {
        await clearUserCart(userId);
      }

      if (store.getState().auth.user?.id !== userId) return;

      const latestItems = await fetchCartItems(userId);

      if (store.getState().auth.user?.id === userId) {
        store.dispatch(replaceCartItems(latestItems));
      }
    })
    .catch((error) => {
      console.error("Cart sync failed:", error);
    });

  return result;
};
