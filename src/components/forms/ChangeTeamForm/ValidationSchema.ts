import * as Yup from "yup";

export const changeTeamSchema = Yup.object().shape({
  team: Yup.string().required("Escolha um time"),
});
