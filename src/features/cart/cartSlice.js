import { createSlice } from "@reduxjs/toolkit";

/* ── Load from localStorage ────────────────────────────── */
const loadCart = () => {
  try {
    const saved = localStorage.getItem("flora_cart");
    return saved ? JSON.parse(saved) : { items: [], promoCode: "", promoApplied: false };
  } catch { return { items: [], promoCode: "", promoApplied: false }; }
};

const PROMO_CODES = {
  BLOOM20: 20,
  FLORA10: 10,
  FRESH15: 15,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
  reducers: {
    addToCart: (state, action) => {
      const { id, size, qty = 1 } = action.payload;
      const key = `${id}_${size}`;
      const existing = state.items.find(i => i.key === key);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ ...action.payload, key, qty });
      }
      localStorage.setItem("flora_cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.key !== action.payload);
      localStorage.setItem("flora_cart", JSON.stringify(state));
    },
    updateQty: (state, action) => {
      const item = state.items.find(i => i.key === action.payload.key);
      if (item) {
        item.qty = Math.max(1, action.payload.qty);
      }
      localStorage.setItem("flora_cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = "";
      state.promoApplied = false;
      localStorage.removeItem("flora_cart");
    },
    applyPromo: (state, action) => {
      const code = action.payload.toUpperCase();
      if (PROMO_CODES[code]) {
        state.promoCode = code;
        state.promoApplied = true;
        state.promoDiscount = PROMO_CODES[code];
      } else {
        state.promoCode = action.payload;
        state.promoApplied = false;
        state.promoDiscount = 0;
      }
      localStorage.setItem("flora_cart", JSON.stringify(state));
    },
  },
});

/* ── Selectors ──────────────────────────────────────────── */
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
export const selectPromo = (state) => ({
  code: state.cart.promoCode,
  applied: state.cart.promoApplied,
  discount: state.cart.promoDiscount || 0,
});

export const { addToCart, removeFromCart, updateQty, clearCart, applyPromo } = cartSlice.actions;
export default cartSlice.reducer;
