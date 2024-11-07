import { applicationSlice } from "./slice";

export const {
  saveUser,
  logout,
  clearErrors,
  changeStatus,
  loadOrders,
  pageChange,
  perPageChange,
} = applicationSlice.actions;
