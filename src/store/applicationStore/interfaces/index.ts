type IApplicationProps = {
  loading: boolean;
  loadingModal: boolean;
  errorServiceOrders: string | null;
  errorLogin: string | null;
  errorTeam: string | null;
  errorTeams: string | null;
  errorCategory: string | null;
  errorStatus: string | null;
  user: {
    username: string | null;
    accessToken: string | null;
  };
  serviceOrders: Array<IServiceOrder>;
  teams: Array<ITeam>;
  page: number;
  perPage: number;
  total: number;
};

type ITeam = {
  id: string;
  name: string;
};

type ICategory = {
  name: string;
  subcategory: Array<{ name: string }>;
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
  team: {
    id: string;
    name: string;
  };
  relatedAt: string;
  updatedAt: string;
  images: Array<string>;
};

type IChangeCategoryResponse = {
  idOrder: string | undefined;
  category: {
    subtipo: string;
    tipo: string;
  };
};

type IChangeCategoryPayload = {
  idOrder: string | undefined;
  category: {
    subtipo: string;
    tipo: string;
  };
};

type IChangeStatusResponse = {
  status: string;
  idOrder: string;
}

type IChangeStatusPayload = {
  status: string;
  idOrder: string;
}


type IChangeTeamPayload = {
  team: {
    id: string;
    name: string;
  };
  idOrder: string | undefined;
};

type IChangeTeamResponse = {
  idOrder: string | undefined;
  team: {
    id: string;
    name: string;
  };
};

type IGetServiceOrdersPayload = {
  page: number | undefined;
  perPage: number | undefined;
};

type IGetTeamsPayload = {
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

type ITeamResponse = {
  _id: string;
  descricao: string;
  nome: string;
};

type IServiceOrdersResponse = {
  chamados: Array<IServiceOrderResponse>;
  page: number;
  per_page: number;
  total: number;
};

type ITeamsResponse = {
  times: Array<ITeamResponse>;
  page: number;
  per_page: number;
  total: number;
};

export type {
  IApplicationProps,
  IServiceOrder,
  IChangeTeamPayload,
  IChangeTeamResponse,
  ITeam,
  IChangeStatusOrderPayload,
  IGetServiceOrdersPayload,
  IServiceOrdersResponse,
  ILoginPayload,
  ILoginResponse,
  ITeamsResponse,
  IGetTeamsPayload,
  IChangeCategoryResponse,
  IChangeCategoryPayload,
  ICategory,
  IChangeStatusResponse,
IChangeStatusPayload
};
