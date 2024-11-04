import { IServiceOrder } from "../../../store/applicationStore/interfaces";

export interface TableProps {
  title: string;
  error: string | null;
  rows: Array<unknown>;
  columns: Array<string>;
  hiddenColumns: Array<string>;
  isLoading: boolean;
  onOpenModal: (order: IServiceOrder, title: string, page: string) => void;
}
