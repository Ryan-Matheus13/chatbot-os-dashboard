import { IServiceOrder } from "../../../store/applicationStore/interfaces";

export interface ChangeStatusFormValues {
  status: string;
}

export interface ChangeStatusFormProps {
  order: IServiceOrder | undefined;
  onLoading: (mode: boolean) => void;
  onClose: () => void;
}

export interface StatusOption {
  label: string;
  value: string;
}
