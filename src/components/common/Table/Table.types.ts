export interface TableProps {
  title: string;
  rows: Array<unknown>;
  columns: Array<string>;
  hiddenColumns: Array<string>;
  onChangeStatus: (id: string) => void;
  onOpenMaps: (id: string) => void;
  onOpenPhotos: (id: string) => void;
  onViewDescription: (id: string) => void;
}
