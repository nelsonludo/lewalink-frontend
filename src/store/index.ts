import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import userReducer from "./userHome.slice";

const store = configureStore({
  reducer: {
    authSlice: authReducer,
    userHomeSlice: userReducer,
  },
});

export default store;
