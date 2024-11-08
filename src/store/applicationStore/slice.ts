import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applicationInitialState } from "./initialState";
import {
  IChangeCategoryResponse,
  IChangeStatusOrderPayload,
  IChangeStatusResponse,
  IChangeTeamResponse,
  ILoginResponse,
  IServiceOrder,
  IServiceOrdersResponse,
  ITeamsResponse,
} from "./interfaces";
import {
  changeCategoryAsync,
  changeStatusAsync,
  changeTeamAsync,
  getServiceOrdersAsync,
  getTeamsAsync,
  loginAsync,
} from "./thunks";
import { transformItems, transformTeams } from "../../utils/utils.helper";
import { toast } from 'react-toastify';

export const applicationSlice = createSlice({
  name: "application",
  initialState: applicationInitialState,
  reducers: {
    saveUser(state, action: PayloadAction<string>) {
      state.user.username = action.payload;
    },
    clearErrors(state) {
      state.errorLogin = null;
      state.errorServiceOrders = null;
      state.errorTeam = null;
      state.errorTeams = null;
      state.errorCategory = null;
      state.errorStatus = null;
    },
    logout(state) {
      state.user.username = null;
      state.user.accessToken = null;
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
    pageChange(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    perPageChange(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
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
          state.total = action.payload.total;
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
          toast.success(`Seja Bem vindo, ${state.user.username}!`)
        }
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorLogin = action.payload as string;
      })

      // CHANGE TEAM
      .addCase(changeTeamAsync.pending, (state) => {
        state.loading = true;
        state.errorTeam = null;
      })
      .addCase(
        changeTeamAsync.fulfilled,
        (state, action: PayloadAction<IChangeTeamResponse | undefined>) => {
          if (action.payload) {
            const { idOrder, team } = action.payload;
            state.loading = false;
            state.serviceOrders = state.serviceOrders.map((order) => {
              if (order.id === idOrder) {
                return { ...order, team: team };
              }
              return order;
            });
            toast.success("Time atualizado com sucesso!")
          }
        }
      )
      .addCase(changeTeamAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorTeam = action.payload as string;
      })

      // TEAMS
      .addCase(getTeamsAsync.pending, (state) => {
        state.loadingModal = true;
        state.errorTeams = null;
      })
      .addCase(
        getTeamsAsync.fulfilled,
        (state, action: PayloadAction<ITeamsResponse>) => {
          state.loadingModal = false;
          state.teams = transformTeams(action.payload.times);
        }
      )
      .addCase(getTeamsAsync.rejected, (state, action) => {
        state.loadingModal = false;
        state.errorTeams = action.payload as string;
      })

      // CHANGE CATEGORY
      .addCase(changeCategoryAsync.pending, (state) => {
        state.loading = true;
        state.errorCategory = null;
      })
      .addCase(
        changeCategoryAsync.fulfilled,
        (state, action: PayloadAction<IChangeCategoryResponse | undefined>) => {
          if (action.payload) {
            const { idOrder, category } = action.payload;
            state.loading = false;
            state.serviceOrders = state.serviceOrders.map((order) => {
              if (order.id === idOrder) {
                return {
                  ...order,
                  category: category.tipo,
                  subCategory: category.subtipo,
                };
              }
              return order;
            });
            toast.success("Categoria atualizada com sucesso!")
          }
        }
      )
      .addCase(changeCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorCategory = action.payload as string;
      })

      // CHANGE STATUS
      .addCase(changeStatusAsync.pending, (state) => {
        state.loading = true;
        state.errorStatus = null;
      })
      .addCase(
        changeStatusAsync.fulfilled,
        (state, action: PayloadAction<IChangeStatusResponse | undefined>) => {
          if (action.payload) {
            const { idOrder, status } = action.payload;
            state.loading = false;
            state.serviceOrders = state.serviceOrders.map((order) => {
              if (order.id === idOrder) {
                return { ...order, status };
              }
              return order;
            });
            toast.success("Status atualizado com sucesso!")
          }
        }
      )
      .addCase(changeStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorStatus = action.payload as string;
      });
  },
});
