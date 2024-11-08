/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import styles from "./ChangeCategoryForm.module.css";
import {
  ChangeCategoryFormProps,
  ChangeCategoryFormValues,
  CategoryOption,
} from "./ChangeCategoryForm.types";
import { changeCategorySchema } from "./ValidationSchema";
import SelectField from "../../common/SelectField/SelectField";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import Button from "../../common/Button/Button";
import { ICategory } from "../../../store/applicationStore/interfaces";
import { changeCategoryAsync } from "../../../store/applicationStore/thunks";
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import { toast } from "react-toastify";

const initialValues: ChangeCategoryFormValues = {
  category: "",
  subCategory: "",
};

const categorys = [
  {
    name: "Manutenção Urbana",
    subcategory: [
      {
        name: "Poda de Árvore",
      },
      {
        name: "Mato Alto",
      },
    ],
  },
  {
    name: "Limpeza Pública",
    subcategory: [
      {
        name: "Descarte Irregular de lixo",
      },
      {
        name: "Entulho na Calçada",
      },
    ],
  },
  {
    name: "Iluminação Pública",
    subcategory: [
      {
        name: "Lâmpada Acesa de Dia",
      },
      {
        name: "Lâmpada Apagada de Noite",
      },
    ],
  },
];

const ChangeCategoryForm: React.FC<ChangeCategoryFormProps> = ({
  order,
  onClose,
}) => {
  const { errorCategory } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  const [options, setOptions] = useState<CategoryOption[]>([]);
  const [subOptions, setSubOptions] = useState<CategoryOption[]>([]);

  useEffect(() => {
    formik.setFieldValue("category", order?.category);
    formik.setFieldValue("subCategory", order?.subCategory);
    const data = categorys.map((category: ICategory) => {
      return {
        label: category.name,
        value: category.name,
      };
    });
    setOptions(data);
  }, []);

  useEffect(() => {
    toast.error(errorCategory);
  }, [errorCategory]);

  const formik = useFormik<ChangeCategoryFormValues>({
    initialValues,
    validationSchema: changeCategorySchema,
    onSubmit: (values: ChangeCategoryFormValues) => {
      dispatch(
        changeCategoryAsync({
          category: {
            subtipo: values.subCategory,
            tipo: values.category,
          },
          idOrder: order?.id,
        })
      );
      onClose();
    },
  });

  useEffect(() => {
    handleChangeCategory()
  }, [formik.values.category])

  const handleChangeCategory = (e?: any) => {
    if (e) {
      formik.setFieldValue("category", e.target.value);
      formik.setFieldValue("subCategory", null);
    }
    const categoryObj = categorys.find(
      (item) => item.name === formik.values.category
    );
    if (categoryObj) {
      const data = categoryObj?.subcategory.map((subCat) => {
        return {
          label: subCat.name,
          value: subCat.name,
        };
      });
      setSubOptions(data);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <SelectField
        disabled={false}
        id="category"
        name="category"
        label="Escolha uma Categoria"
        value={formik.values.category}
        onChange={handleChangeCategory}
        options={options}
        error={formik.touched.category && !!formik.errors.category}
        helperText={formik.touched.category ? formik.errors.category : ""}
      />

      <SelectField
        disabled={formik.values.category ? false : true}
        id="subCategory"
        name="subCategory"
        label="Escolha uma Sub Categoria"
        value={formik.values.subCategory}
        onChange={formik.handleChange}
        options={subOptions}
        error={formik.touched.subCategory && !!formik.errors.subCategory}
        helperText={formik.touched.subCategory ? formik.errors.subCategory : ""}
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

export default ChangeCategoryForm;
