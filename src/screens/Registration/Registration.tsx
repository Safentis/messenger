import React, { FC } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import form from "../../HOC/form";
import Card from "../../layouts/Card/index";
import Form from "../../layouts/Form";
import { requestRegistration } from "../../redux/actionCreators/registration";
import { ButtonParams, FieldsParams } from "../../layouts/Form/index.interface";

import { Fields, Props } from "./Registration.interface";
import {
  AUTHENTICATION_ROUTE,
  RESTORE_PASSWORD_ROUTE,
} from "../../utils/consts";
import "./Registration.css";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";

//* PROPERTY FOR HOC form
//* which set up a formik
const AUTH_FORM_FIELDS: Fields = {
  email: "",
  password: "",
  "password repeat": "",
};

const AUTH_VALIDATION_SCHEMA: object = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().min(8, "Not less than 8 symbol").required("Required"),
  "password repeat": Yup.string()
    .min(8, "Not less than 8 symbol")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const RegistrationForm = form(
  Form,
  AUTH_FORM_FIELDS,
  requestRegistration,
  AUTH_VALIDATION_SCHEMA
);

const Registration: FC<Props> = (): React.ReactElement => {
  //* fields props for Form components, that is template
  const fields: FieldsParams[] = [
    { name: "email", type: "text" },
    { name: "password", type: "password" },
    { name: "password repeat", type: "password" },
  ];

  const buttonParams: ButtonParams = {
    text: "Registration",
    icon: faRegistered,
  };

  return (
    <Card className="registration" title="Registration">
      <RegistrationForm fields={fields} buttonParams={buttonParams} />
      <div className="registration__links">
        <Link
          className="card-link registration__link"
          to={AUTHENTICATION_ROUTE}
        >
          authentication
        </Link>
        <Link
          className="card-link authentication__link"
          to={RESTORE_PASSWORD_ROUTE}
        >
          Forgot your password?
        </Link>
      </div>
    </Card>
  );
};

export default Registration;
