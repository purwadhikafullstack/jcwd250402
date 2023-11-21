import { configureStore } from "@reduxjs/toolkit";
import {
  loginModalSlice,
  tenantRegisterSlice,
  userRegisterSlice,
  verifyRegisterUserSlice,
} from "./components/hooks/modalSlice";

import authSlice from "./components/slice/authSlices";

const store = configureStore({
  reducer: {
    auth: authSlice,
    loginModal: loginModalSlice.reducer,
    tenantRegister: tenantRegisterSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    verifyRegisterUser: verifyRegisterUserSlice.reducer,
  },
});

export default store;
