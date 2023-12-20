import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  loginModalSlice,
  tenantRegisterSlice,
  userRegisterSlice,
  verifyRegisterUserSlice,
  propertyDeleteSlice,
  paymentModalSlice,
  proofImageModalSlice,
  roomDeleteSlice,
  searchModalSlice,
  reviewModalSlice,
} from "./components/hooks/modalSlice";
import authSlice from "./components/slice/authSlices";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "loginModal",
    "tenantRegister",
    "userRegister",
    "verifyRegisterUser",
    "propertyDelete",
    "paymentModal",
    "proofImageModal",
    "roomDelete",
    "searchModal",
    "reviewModal",
  ],
};

const rootReducer = combineReducers({
  auth: authSlice,
  loginModal: loginModalSlice.reducer,
  paymentModal: paymentModalSlice.reducer,
  tenantRegister: tenantRegisterSlice.reducer,
  userRegister: userRegisterSlice.reducer,
  verifyRegisterUser: verifyRegisterUserSlice.reducer,
  proofImageModal: proofImageModalSlice.reducer,
  propertyDelete: propertyDeleteSlice.reducer,
  roomDelete: roomDeleteSlice.reducer,
  searchModal: searchModalSlice.reducer,
  reviewModal: reviewModalSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
