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
import { changeTeamAsync } from "../../../store/applicationStore/thunks";

const initialValues: ChangeTeamFormValues = {
  team: "",
};

const ChangeTeamForm: React.FC<ChangeTeamFormProps> = ({
  order,
  onClose,
  onLoading,
}) => {
  const dispatch = useAppDispatch();

  const [options, setOptions] = useState<TeamOption[]>([]);

  useEffect(() => {
    formik.setFieldValue("team", order?.team?.id);
    const fetchData = async () => {
      const response = await fetch("/teams.json");
      const teams = await response.json();
      if (teams) {
        const data = teams.map((team: ITeam) => {
          return {
            label: team.name,
            value: team.id,
          };
        });
        setOptions(data);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik<ChangeTeamFormValues>({
    initialValues,
    validationSchema: changeTeamSchema,
    onSubmit: (values: ChangeTeamFormValues) => {
      handleChangeTeam(values.team);
    },
  });

  const handleChangeTeam = async (idTeam: string) => {
    onLoading(true);
    await dispatch(changeTeamAsync({ idTeam, idOrder: order?.id }));
    onLoading(false);
    onClose();
  };

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
