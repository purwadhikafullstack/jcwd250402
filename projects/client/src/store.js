import { configureStore } from "@reduxjs/toolkit";
import {
  loginModalSlice,
  tenantRegisterSlice,
  userRegisterSlice,
} from "./components/hooks/modalSlice";

const store = configureStore({
  reducer: {
    loginModal: loginModalSlice.reducer,
    tenantRegister: tenantRegisterSlice.reducer,
    userRegister: userRegisterSlice.reducer,
  },
});

export default store;
