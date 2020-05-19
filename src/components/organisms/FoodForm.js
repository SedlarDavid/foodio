import React from "react";

import * as yup from "yup";
import styled from "@emotion/styled";
import { Formik } from "formik";

import { Button } from "../atoms/Buttons";
import { Form } from "../atoms/Form";

import { ModalTypeEnum } from "../../tools/Enums";
import { FormWrapper } from "../atoms/FormWrapper";
import { FormInput, FormMultiselect } from "../atoms/FormFields";
import { FormTextarea } from "../atoms/Textarea";
import IngredientsComponent from "../molecules/IngredientsComponent";

const InputsWrapper = styled.div`
  display: flex;
  width: 50vw;
  flex-wrap: wrap;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-right: ${(props) => props.theme.padding.primary};
  button {
    margin-left: auto;
  }
`;

const validationSchema = yup.object({
  title: yup.string().required("Name of the food is required").max(15),
  preparationTime: yup.number().required("Please fill preparation time"),
});

const FoodForm = ({ type, onAddNew, onEditSave, data }) => {
  return (
    <Formik
      initialValues={{
        title: data.title,
        preparationTime: data.preparationTime,
        directions: data.directions,
        ingredients: data.ingredients,
      }}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        type === ModalTypeEnum.ADD_FOOD ? onAddNew(data) : onEditSave(data);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ handleSubmit, errors, handleBlur, handleChange, values }) => (
        <Form onSubmit={handleSubmit}>
          <FormWrapper>
            <InputsWrapper>
              <FormInput
                name="title"
                type="text"
                value={values.title}
                handleBlur={handleBlur}
                onChange={handleChange}
                error={errors.title}
              />
              <FormInput
                name="preparationTime"
                type="number"
                value={values.preparationTime}
                handleBlur={handleBlur}
                onChange={handleChange}
                error={errors.preparationTime}
              />
              <FormTextarea
                name="directions"
                type="text"
                value={values.directions}
                handleBlur={handleBlur}
                onChange={handleChange}
                error={errors.directions}
              />
              <IngredientsComponent type={type} data={data} />

              <ButtonWrapper>
                <Button type="submit">
                  {type === ModalTypeEnum.ADD_FOOD ? "ADD FOOD" : "UPDATE FOOD"}
                </Button>
              </ButtonWrapper>
            </InputsWrapper>
          </FormWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default FoodForm;
