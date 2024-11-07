import { IApplicationProps } from "./interfaces";

export const applicationInitialState: IApplicationProps = {
  loading: false,
  loadingModal: false,
  errorServiceOrders: null,
  errorLogin: null,
  errorTeam: null,
  errorTeams: null,
  errorCategory: null,
  errorStatus: null,
  user: {
    username: null,
    accessToken: null,
  },
  serviceOrders: [],
  teams: [],
  page: 1,
  perPage: 10,
  total: 1,
};
