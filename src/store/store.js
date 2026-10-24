// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../features/cart/cartSlice";
// import wishlistReducer from "../features/user/wishlistSlice";
// import userReducer from "../features/user/authSlice";

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//     auth: userReducer,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/user/wishlistSlice";
import userReducer from "../features/user/authSlice";

import { cartSyncMiddleware } from "../features/cart/cartMiddleware";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSyncMiddleware),
});

export default store;
