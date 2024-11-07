import * as Yup from "yup";

export const changeCategorySchema = Yup.object().shape({
  category: Yup.string().required("Escolha uma categoria"),
  subCategory: Yup.string().required("Escolha uma sub categoria"),
});
