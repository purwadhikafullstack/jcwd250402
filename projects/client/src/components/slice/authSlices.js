import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      window.localStorage.setItem("token", action.payload.token);
      window.localStorage.setItem("isLoggedIn", true);
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("isTenant");
    },
    isTenant(state) {
      state.isTenant = true;
      window.localStorage.setItem("isTenant", true);
    },
  },
});

export const { login, logout, isTenant, isTenantLogout } = authSlice.actions;
export default authSlice.reducer;
