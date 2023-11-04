import { configureStore } from "@reduxjs/toolkit";
import { loginModalSlice } from "./components/hooks/modalSlice";

const store = configureStore({
  reducer: {
    loginModal: loginModalSlice.reducer,
  },
});

export default store;
