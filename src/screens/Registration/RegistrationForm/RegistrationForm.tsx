import React, { FC } from "react";
import * as Yup from "yup";

import form from "../../../HOC/form";

import { Props, Fields } from "./RegistrationForm.interface";
import "./RegistrationForm.css";

const AUTH_FORM_FIELDS: Fields = {
  email: "",
  password: "",
  passwordRepeat: "",
};

const AUTH_VALIDATION_SCHEMA: object = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().min(8, "Not less than 8 symbol").required("Required"),
  passwordRepeat: Yup.string()
    .min(8, "Not less than 8 symbol")
    .required("Required"),
});

const RegistrationForm: FC<Props> = ({ formik }): React.ReactElement => {
  return <></>;
};

export default form(
  RegistrationForm,
  AUTH_FORM_FIELDS,
  () => {},
  AUTH_VALIDATION_SCHEMA
);
