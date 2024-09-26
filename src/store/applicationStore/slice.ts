import { createSlice } from "@reduxjs/toolkit";
import { applicationInitialState } from "./initialState";

export const applicationSlice = createSlice({
  name: "application",
  initialState: applicationInitialState,
  reducers: {},
});
