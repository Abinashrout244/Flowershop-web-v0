// import { createSlice } from "@reduxjs/toolkit";

// /* ── Load from localStorage ────────────────────────────── */
// const loadCart = () => {
//   try {
//     const saved = localStorage.getItem("flora_cart");
//     return saved
//       ? JSON.parse(saved)
//       : { items: [], promoCode: "", promoApplied: false };
//   } catch {
//     return { items: [], promoCode: "", promoApplied: false };
//   }
// };

// const PROMO_CODES = {
//   BLOOM20: 20,
//   FLORA10: 10,
//   FRESH15: 15,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: loadCart(),
//   reducers: {
//     addToCart: (state, action) => {
//       const { id, size, qty = 1 } = action.payload;
//       const key = `${id}_${size}`;
//       const existing = state.items.find((i) => i.key === key);
//       if (existing) {
//         existing.qty += qty;
//       } else {
//         state.items.push({ ...action.payload, key, qty });
//       }
//       localStorage.setItem("flora_cart", JSON.stringify(state));
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((i) => i.key !== action.payload);
//       localStorage.setItem("flora_cart", JSON.stringify(state));
//     },
//     updateQty: (state, action) => {
//       const item = state.items.find((i) => i.key === action.payload.key);
//       if (item) {
//         item.qty = Math.max(1, action.payload.qty);
//       }
//       localStorage.setItem("flora_cart", JSON.stringify(state));
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.promoCode = "";
//       state.promoApplied = false;
//       localStorage.removeItem("flora_cart");
//     },
//     applyPromo: (state, action) => {
//       const code = action.payload.toUpperCase();
//       if (PROMO_CODES[code]) {
//         state.promoCode = code;
//         state.promoApplied = true;
//         state.promoDiscount = PROMO_CODES[code];
//       } else {
//         state.promoCode = action.payload;
//         state.promoApplied = false;
//         state.promoDiscount = 0;
//       }
//       localStorage.setItem("flora_cart", JSON.stringify(state));
//     },
//   },
// });

// /* ── Selectors ──────────────────────────────────────────── */
// export const selectCartItems = (state) => state.cart.items;
// export const selectCartCount = (state) =>
//   state.cart.items.reduce((sum, i) => sum + i.qty, 0);
// export const selectCartSubtotal = (state) =>
//   state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
// export const selectPromo = (state) => ({
//   code: state.cart.promoCode,
//   applied: state.cart.promoApplied,
//   discount: state.cart.promoDiscount || 0,
// });

// export const { addToCart, removeFromCart, updateQty, clearCart, applyPromo } =
//   cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const EMPTY_CART = {
  items: [],
  promoCode: "",
  promoApplied: false,
  promoDiscount: 0,
  isReady: false,
};

export const loadGuestCartFromStorage = () => {
  try {
    if (typeof localStorage === "undefined") {
      return { ...EMPTY_CART, items: [] };
    }

    const saved = localStorage.getItem("flora_cart");

    if (!saved) {
      return { ...EMPTY_CART, items: [] };
    }

    const parsed = JSON.parse(saved);

    return {
      ...EMPTY_CART,
      ...parsed,
      items: Array.isArray(parsed.items) ? parsed.items : [],
      isReady: false,
    };
  } catch {
    return { ...EMPTY_CART, items: [] };
  }
};

const PROMO_CODES = {
  BLOOM20: 20,
  FLORA10: 10,
  FRESH15: 15,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadGuestCartFromStorage(),

  reducers: {
    addToCart: (state, action) => {
      const { id, size, qty = 1 } = action.payload;
      const key = `${id}_${size}`;

      const existing = state.items.find((item) => item.key === key);

      if (existing) {
        existing.qty += Number(qty) || 1;
      } else {
        state.items.push({
          ...action.payload,
          key,
          qty: Math.max(1, Number(qty) || 1),
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },

    updateQty: (state, action) => {
      const item = state.items.find(
        (entry) => entry.key === action.payload.key,
      );

      if (item) {
        item.qty = Math.max(1, Number(action.payload.qty) || 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.promoCode = "";
      state.promoApplied = false;
      state.promoDiscount = 0;
    },

    applyPromo: (state, action) => {
      const code = String(action.payload || "")
        .trim()
        .toUpperCase();

      if (PROMO_CODES[code]) {
        state.promoCode = code;
        state.promoApplied = true;
        state.promoDiscount = PROMO_CODES[code];
      } else {
        state.promoCode = action.payload;
        state.promoApplied = false;
        state.promoDiscount = 0;
      }
    },

    replaceCartItems: (state, action) => {
      state.items = action.payload || [];
    },

    setCartReady: (state, action) => {
      state.isReady = action.payload;
    },
    replaceCartState: (state, action) => {
      const cart = action.payload || {};

      state.items = Array.isArray(cart.items) ? cart.items : [];
      state.promoCode = cart.promoCode || "";
      state.promoApplied = Boolean(cart.promoApplied);
      state.promoDiscount = Number(cart.promoDiscount) || 0;
    },
  },
});

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.qty, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

export const selectPromo = (state) => ({
  code: state.cart.promoCode,
  applied: state.cart.promoApplied,
  discount: state.cart.promoDiscount || 0,
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  applyPromo,
  replaceCartItems,
  replaceCartState,
  setCartReady,
} = cartSlice.actions;

export default cartSlice.reducer;
