// const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     loginModal: loginModalSlice.reducer,
//     tenantRegister: tenantRegisterSlice.reducer,
//     userRegister: userRegisterSlice.reducer,
//     verifyRegisterUser: verifyRegisterUserSlice.reducer,
//   },
// });

// export default store;
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import {
  loginModalSlice,
  tenantRegisterSlice,
  userRegisterSlice,
  verifyRegisterUserSlice,
} from "./components/hooks/modalSlice";
import authSlice from "./components/slice/authSlices";

const middleware = [logger];

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice,
    loginModal: loginModalSlice.reducer,
    tenantRegister: tenantRegisterSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    verifyRegisterUser: verifyRegisterUserSlice.reducer,
  })
);

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

let persistor = persistStore(store);

export { store, persistor };
