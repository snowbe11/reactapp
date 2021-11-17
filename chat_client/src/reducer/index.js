import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account";

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
