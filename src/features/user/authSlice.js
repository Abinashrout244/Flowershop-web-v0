import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    loginSucess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    signupSucess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    restoreSession: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.isLoading = false;
    },
    updatePhone: (state, action) => {
      if (state.user) state.user.phone = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { loginSucess, signupSucess, logout, restoreSession, updatePhone } =
  authSlice.actions;
export default authSlice.reducer;
