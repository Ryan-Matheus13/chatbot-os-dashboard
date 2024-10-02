import { SelectChangeEvent } from "@mui/material";

export interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: { label: string; value: string }[];
  error?: boolean;
  helperText?: string;
}
