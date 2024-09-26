import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from '../../api';

export const get = createAsyncThunk("get", async () => {
  try {
    // const response = await api.get(``);
    // if (response) {
    //   if (response.status == 200) {
    //     return response.data;
    //   }
    // }
    // return response;
  } catch (error) {
    console.log("error: ", error);
  }
});
