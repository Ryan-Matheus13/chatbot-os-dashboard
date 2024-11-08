import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IChangeCategoryPayload,
  IChangeCategoryResponse,
  IChangeStatusPayload,
  IChangeStatusResponse,
  IChangeTeamPayload,
  IChangeTeamResponse,
  IGetServiceOrdersPayload,
  ILoginPayload,
  ILoginResponse,
  IServiceOrdersResponse,
  ITeamsResponse,
} from "./interfaces";
import axios from "axios";
import { RootState } from "../types";

export const getServiceOrdersAsync = createAsyncThunk<
  IServiceOrdersResponse,
  IGetServiceOrdersPayload,
  { state: RootState }
>(
  "application/getServiceOrders",
  async (payload: IGetServiceOrdersPayload, { rejectWithValue, getState }) => {
    const { page, perPage } = payload;
    const { accessToken } = getState().application.user;

    try {
      const response = await axios.get<IServiceOrdersResponse>(
        import.meta.env.VITE_URL_API + "/chamados",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            page: page ? page : 1,
            perPage: perPage ? perPage : 10,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.msg || "Erro ao buscar ordens de serviço"
        );
      }
      return rejectWithValue("Erro desconhecido ao buscar ordens de serviço");
    }
  }
);

export const getTeamsAsync = createAsyncThunk<
  ITeamsResponse,
  IGetServiceOrdersPayload,
  { state: RootState }
>(
  "application/getTeams",
  async (payload: IGetServiceOrdersPayload, { rejectWithValue, getState }) => {
    const { page, perPage } = payload;
    const { accessToken } = getState().application.user;

    try {
      const response = await axios.get<ITeamsResponse>(
        import.meta.env.VITE_URL_API + "/times",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            page: page ? page : 1,
            perPage: perPage ? perPage : 10,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.msg || "Erro ao buscar times"
        );
      }
      return rejectWithValue("Erro desconhecido ao buscar times");
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: ILoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post<ILoginResponse>(
        import.meta.env.VITE_URL_API + "/login",
        payload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.msg || "Erro ao efetuar login"
        );
      }

      return rejectWithValue("Erro desconhecido ao efetuar login");
    }
  }
);

export const changeTeamAsync = createAsyncThunk<
  IChangeTeamResponse | undefined,
  IChangeTeamPayload,
  { state: RootState }
>(
  "application/changeTeam",
  async (payload: IChangeTeamPayload, { rejectWithValue, getState }) => {
    const { idOrder, team } = payload;
    const { accessToken } = getState().application.user;
    try {
      const response = await axios.patch<IChangeTeamResponse>(
        import.meta.env.VITE_URL_API + `/chamados/${idOrder}/time`,
        {
          time_id: team.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        return { idOrder, team };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.msg || "Erro ao efetuar troca de time"
        );
      }

      return rejectWithValue("Erro desconhecido ao efetuar troca de time");
    }
  }
);

export const changeStatusAsync = createAsyncThunk<
  IChangeStatusResponse | undefined,
  IChangeStatusPayload,
  { state: RootState }
>(
  "application/changeStatus",
  async (payload: IChangeStatusPayload, { rejectWithValue, getState }) => {
    const { idOrder, status } = payload;
    const { accessToken } = getState().application.user;
    try {
      const response = await axios.patch<IChangeStatusResponse>(
        import.meta.env.VITE_URL_API + `/chamados/${idOrder}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        return { idOrder, status };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.msg || "Erro ao efetuar troca de status"
        );
      }

      return rejectWithValue("Erro desconhecido ao efetuar troca de status");
    }
  }
);

export const changeCategoryAsync = createAsyncThunk<
  IChangeCategoryResponse | undefined,
  IChangeCategoryPayload,
  { state: RootState }
>(
  "application/changeCategory",
  async (payload: IChangeCategoryPayload, { rejectWithValue, getState }) => {
    const { idOrder, category } = payload;
    const { accessToken } = getState().application.user;
    try {
      const response = await axios.patch<IChangeCategoryResponse>(
        import.meta.env.VITE_URL_API + `/chamados/${idOrder}/categoria`,
        category,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        return { idOrder, category };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.msg || "Erro ao efetuar troca de time"
        );
      }

      return rejectWithValue("Erro desconhecido ao efetuar troca de time");
    }
  }
);
