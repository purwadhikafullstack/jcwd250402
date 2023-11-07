import { configureStore } from "@reduxjs/toolkit";
import {
  loginModalSlice,
  tenantRegisterSlice,
} from "./components/hooks/modalSlice";

const store = configureStore({
  reducer: {
    loginModal: loginModalSlice.reducer,
    tenantRegister: tenantRegisterSlice.reducer,
  },
});

export default store;
