import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applicationInitialState } from "./initialState";
import {
  IChangeStatusOrderPayload,
  ILoginResponse,
  IServiceOrder,
  IServiceOrdersResponse,
  ITeam,
} from "./interfaces";
import { getServiceOrdersAsync, loginAsync } from "./thunks";
import { transformItems } from "../../utils/utils.helper";

export const applicationSlice = createSlice({
  name: "application",
  initialState: applicationInitialState,
  reducers: {
    saveUser(state, action: PayloadAction<string>) {
      state.user.username = action.payload;
    },
    logout(state) {
      state.user.username = null;
      state.user.accessToken = null;
    },
    changeTeam(
      state,
      action: PayloadAction<{ idOrder: string; newTeam: ITeam }>
    ) {
      const { idOrder, newTeam } = action.payload;
      state.serviceOrders = state.serviceOrders.map((order) => {
        if (order.id === idOrder) {
          return { ...order, team: newTeam };
        }
        return order;
      });
    },
    changeStatus(state, action: PayloadAction<IChangeStatusOrderPayload>) {
      const { idOrder, status } = action.payload;

      state.serviceOrders = state.serviceOrders.map((order) => {
        if (order.id === idOrder && status) {
          return { ...order, status }; // Atualiza o status
        }
        return order;
      });
    },
    loadOrders(state, action: PayloadAction<IServiceOrder[]>) {
      state.serviceOrders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // SEVICE ORDERS
      .addCase(getServiceOrdersAsync.pending, (state) => {
        state.loading = true;
        state.errorServiceOrders = null;
      })
      .addCase(
        getServiceOrdersAsync.fulfilled,
        (state, action: PayloadAction<IServiceOrdersResponse>) => {
          state.loading = false;
          state.serviceOrders = transformItems(action.payload.chamados);
        }
      )
      .addCase(getServiceOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorServiceOrders = action.payload as string;
      })

      // LOGIN
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.errorLogin = null;
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.loading = false;
          state.user.accessToken = action.payload.access_token;
        }
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorLogin = action.payload as string;
      });
  },
});
