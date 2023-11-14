import { configureStore } from "@reduxjs/toolkit";
import {
  loginModalSlice,
  tenantRegisterSlice,
  userRegisterSlice,
  verifyRegisterUserSlice
} from "./components/hooks/modalSlice";

const store = configureStore({
  reducer: {
    loginModal: loginModalSlice.reducer,
    tenantRegister: tenantRegisterSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    verifyRegisterUser: verifyRegisterUserSlice.reducer,
  },
});

export default store;
