/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import styles from "./ChangeTeamForm.module.css";
import {
  ChangeTeamFormProps,
  ChangeTeamFormValues,
  TeamOption,
} from "./ChangeTeamForm.types";
import { changeTeamSchema } from "./ValidationSchema";
import SelectField from "../../common/SelectField/SelectField";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import Button from "../../common/Button/Button";
import { ITeam } from "../../../store/applicationStore/interfaces";
import {
  changeTeamAsync,
  getTeamsAsync,
} from "../../../store/applicationStore/thunks";
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import { toast } from "react-toastify";

const initialValues: ChangeTeamFormValues = {
  team: "",
};

const ChangeTeamForm: React.FC<ChangeTeamFormProps> = ({ order, onClose }) => {
  const { errorTeam, errorTeams, teams } = useAppSelector(
    (store) => store.application
  );
  const dispatch = useAppDispatch();

  const [options, setOptions] = useState<TeamOption[]>([]);

  useEffect(() => {
    dispatch(getTeamsAsync({ page: 1, perPage: 10 }));
  }, [dispatch]);

  useEffect(() => {
    formik.setFieldValue("team", order?.team?.id);
    if (teams.length > 0) {
      const data = teams.map((team: ITeam) => {
        return {
          label: team.name,
          value: team.id,
        };
      });
      setOptions(data);
    }
  }, [teams]);

  useEffect(() => {
    toast.error(errorTeam);
  }, [errorTeam]);

  useEffect(() => {
    toast.error(errorTeams);
  }, [errorTeams]);

  const formik = useFormik<ChangeTeamFormValues>({
    initialValues,
    validationSchema: changeTeamSchema,
    onSubmit: (values: ChangeTeamFormValues) => {
      const teamName = options.filter((opt) => opt.value == values.team);
      dispatch(
        changeTeamAsync({
          team: { id: values.team, name: teamName[0].label },
          idOrder: order?.id,
        })
      );
      onClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <SelectField
        id="team"
        name="team"
        label="Escolha um Time"
        value={formik.values.team}
        onChange={formik.handleChange}
        options={options}
        error={formik.touched.team && !!formik.errors.team}
        helperText={formik.touched.team ? formik.errors.team : ""}
        disabled={false}
      />

      <div className={styles.btnRow}>
        <Button type="submit" label="Atualizar" size="medium" />
        <Button
          type="button"
          label="Fechar"
          size="medium"
          variant="outlined"
          onClick={onClose}
        />
      </div>
    </form>
  );
};

export default ChangeTeamForm;
