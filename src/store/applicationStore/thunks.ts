import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChangeTeamPayload, ITeam } from "./interfaces";
import { changeTeam } from "./actions";
// import api from '../../api';

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
