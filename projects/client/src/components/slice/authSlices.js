import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: JSON.parse(window.localStorage.getItem("isLoggedIn")) || false,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      window.localStorage.setItem("token", action.payload.token);
      window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("isTenant");
    },
    isTenant(state) {
      state.isTenant = true;
      window.localStorage.setItem("isTenant", JSON.stringify(true));
    },
    isTenantLogout(state) {
      state.isTenant = false;
      window.localStorage.removeItem("isTenant");
    },
  },
});

export const { login, logout, isTenant, isTenantLogout } = authSlice.actions;
export default authSlice.reducer;
