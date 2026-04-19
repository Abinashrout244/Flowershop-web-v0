import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  try {
    const saved = localStorage.getItem("flora_wishlist");
    return saved ? JSON.parse(saved) : { items: [] };
  } catch { return { items: [] }; }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(),
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("flora_wishlist", JSON.stringify(state));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("flora_wishlist", JSON.stringify(state));
    },
  },
});

export const selectWishlist = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsWishlisted = (id) => (state) =>
  state.wishlist.items.some(i => i.id === id);

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
