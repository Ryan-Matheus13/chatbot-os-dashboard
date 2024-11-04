import { IApplicationProps } from "./interfaces";

export const applicationInitialState: IApplicationProps = {
  loading: false,
  errorServiceOrders: null,
  errorLogin: null,
  user: {
    username: null,
    accessToken: null,
  },
  serviceOrders: [],
  page: 1,
  perPage: 10,
  total: 1,
};
