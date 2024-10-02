import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applicationInitialState } from "./initialState";
import { IChangeStatusOrderPayload, IServiceOrder, ITeam } from "./interfaces";

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
});
