type IApplicationProps = {
  user: {
    username: string;
    isLogged: boolean;
  };
  serviceOrders: Array<IServiceOrder>;
};

type ITeam = {
  id: string;
  name: string;
};

type IServiceOrder = {
  id: string;
  osNumber: string;
  status: string;
  relatedBy: string;
  category: string;
  subCategory: string;
  description: string;
  location: { lat: number; lng: number };
  address: string;
  routeDistance: string;
  team: ITeam;
  relatedAt: string;
  updatedAt: string;
  images: Array<string>;
};

type IChangeTeamPayload = {
  idTeam: string;
  idOrder: string | undefined;
};

type IChangeStatusOrderPayload = {
  status: string;
  idOrder: string | undefined;
};

export type {
  IApplicationProps,
  IServiceOrder,
  IChangeTeamPayload,
  ITeam,
  IChangeStatusOrderPayload,
};
