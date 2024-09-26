import { configureStore } from "@reduxjs/toolkit";
import { applicationSlice } from "./applicationStore/slice";

export const store = configureStore({
  reducer: {
    application: applicationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
