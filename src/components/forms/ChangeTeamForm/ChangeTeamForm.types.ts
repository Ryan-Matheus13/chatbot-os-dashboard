import { IServiceOrder } from "../../../store/applicationStore/interfaces";

export interface ChangeTeamFormValues {
  team: string;
}

export interface ChangeTeamFormProps {
  order: IServiceOrder | undefined;
  onLoading: (mode: boolean) => void;
  onClose: () => void;
}

export interface TeamOption {
  label: string;
  value: string;
}
