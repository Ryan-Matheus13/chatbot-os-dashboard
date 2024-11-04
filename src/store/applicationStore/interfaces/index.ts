type IApplicationProps = {
  loading: boolean;
  errorServiceOrders: string | null;
  errorLogin: string | null;
  user: {
    username: string | null;
    accessToken: string | null;
  };
  serviceOrders: Array<IServiceOrder>;
  page: number;
  perPage: number;
  total: number;
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

type IGetServiceOrdersPayload = {
  page: number | undefined;
  perPage: number | undefined;
};

type ILoginPayload = {
  username: string;
  password: string;
};

type ILoginResponse = {
  access_token: string;
};

type IChangeStatusOrderPayload = {
  status: string;
  idOrder: string | undefined;
};

type IServiceOrderResponse = {
  _id: string;
  atualizado_em: string;
  categoria: {
    subtipo: string;
    tipo: string;
  };
  criado_em: string;
  descricao: string;
  endereco: string;
  id: string;
  identificacao: string;
  imagens: Array<string>;
  localizacao: {
    latitude: number;
    longitude: number;
  };
  numero_os: number;
  status: string;
  time_alocado: string;
  usuario_id: string;
};

type IServiceOrdersResponse = {
  chamados: Array<IServiceOrderResponse>;
  page: number;
  per_page: number;
  total: number;
};

export type {
  IApplicationProps,
  IServiceOrder,
  IChangeTeamPayload,
  ITeam,
  IChangeStatusOrderPayload,
  IGetServiceOrdersPayload,
  IServiceOrdersResponse,
  ILoginPayload,
  ILoginResponse,
};
