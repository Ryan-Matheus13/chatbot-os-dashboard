import { IServiceOrder } from "../../../store/applicationStore/interfaces";

export interface ChangeCategoryFormValues {
  category: string;
  subCategory: string;
}

export interface ChangeCategoryFormProps {
  order: IServiceOrder | undefined;
  onLoading: (mode: boolean) => void;
  onClose: () => void;
}

export interface CategoryOption {
  label: string;
  value: string;
}
