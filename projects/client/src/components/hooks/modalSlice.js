import { createSlice } from "@reduxjs/toolkit";

const loginModalSlice = createSlice({
  name: "loginModal",
  initialState: { isOpen: false },
  reducers: {
    openLoginModal(state) {
      state.isOpen = true;
    },
    closeLoginModal(state) {
      state.isOpen = false;
    },
  },
});

const tenantRegisterSlice = createSlice({
  name: "tenantRegister",
  initialState: { isOpen: false },
  reducers: {
    openTenantRegister(state) {
      state.isOpen = true;
    },
    closeTenantRegister(state) {
      state.isOpen = false;
    },
  },
});

export { loginModalSlice, tenantRegisterSlice };
