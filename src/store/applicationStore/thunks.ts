import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IChangeTeamPayload,
  IGetServiceOrdersPayload,
  ILoginPayload,
  ILoginResponse,
  IServiceOrdersResponse,
  ITeam,
} from "./interfaces";
import { changeTeam } from "./actions";
import axios from "axios";
import { RootState } from "../types";

export const changeTeamAsync = createAsyncThunk(
  "application/changeTeam",
  async (payload: IChangeTeamPayload, { dispatch }) => {
    const { idTeam, idOrder } = payload;

    const response = await fetch("/teams.json");
    const teams: ITeam[] = await response.json();
    const newTeam = teams.find((team) => team.id === idTeam);

    if (newTeam && idOrder) {
      dispatch(changeTeam({ idOrder, newTeam: newTeam }));
    }
  }
);

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
