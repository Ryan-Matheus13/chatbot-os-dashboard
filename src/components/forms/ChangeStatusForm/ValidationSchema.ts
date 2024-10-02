import * as Yup from "yup";

export const changeStatusSchema = Yup.object().shape({
  status: Yup.string().required("O campo não pode estar vazio"),
});
