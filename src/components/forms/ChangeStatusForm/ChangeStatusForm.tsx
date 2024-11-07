/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useFormik } from "formik";
import styles from "./ChangeStatusForm.module.css";
import {
  ChangeStatusFormProps,
  ChangeStatusFormValues,
  StatusOption,
} from "./ChangeStatusForm.types";
import { changeStatusSchema } from "./ValidationSchema";
import SelectField from "../../common/SelectField/SelectField";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import Button from "../../common/Button/Button";
import { changeStatus } from "../../../store/applicationStore/actions";

const initialValues: ChangeStatusFormValues = {
  status: "",
};

const statusOptions: StatusOption[] = [
  {
    label: "PENDENTE",
    value: "PENDENTE",
  },
  {
    label: "EM ANÁLISE BOT",
    value: "EM ANÁLISE BOT",
  },
  {
    label: "EM ANÁLISE HUMANA",
    value: "EM ANÁLISE HUMANA",
  },
  {
    label: "ABERTO",
    value: "ABERTO",
  },
  {
    label: "EQUIPE ALOCADA",
    value: "EQUIPE ALOCADA",
  },
  {
    label: "EM EXECUÇÃO",
    value: "EM EXECUÇÃO",
  },
  {
    label: "CONCLUÍDO",
    value: "CONCLUÍDO",
  },
];

const ChangeStatusForm: React.FC<ChangeStatusFormProps> = ({
  order,
  onClose,
  onLoading,
}) => {
  const dispatch = useAppDispatch();

  const formik = useFormik<ChangeStatusFormValues>({
    initialValues,
    validationSchema: changeStatusSchema,
    onSubmit: (values: ChangeStatusFormValues) => {
      handleChangeStatus(values.status);
    },
  });

  useEffect(() => {
    formik.setFieldValue("status", order?.status);
  }, []);

  const handleChangeStatus = (status: string) => {
    onLoading(true);
    dispatch(changeStatus({ idOrder: order?.id, status }));
    onClose();
    onLoading(false);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <SelectField
        id="status"
        name="status"
        label="Escolha um Status"
        value={formik.values.status}
        onChange={formik.handleChange}
        options={statusOptions}
        error={formik.touched.status && !!formik.errors.status}
        helperText={formik.touched.status ? formik.errors.status : ""}
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

export default ChangeStatusForm;
