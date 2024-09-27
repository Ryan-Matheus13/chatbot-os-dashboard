import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applicationInitialState } from "./initialState";

export const applicationSlice = createSlice({
  name: "application",
  initialState: applicationInitialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.user.isLogged = true;
      state.user.username = action.payload;
    },
    logout(state) {
      state.user.isLogged = false;
      state.user.username = "";
    },
  },
});
