import React, { FC } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import form from "../../HOC/form";
import Card from "../../layouts/Card/index";
import Form from "../../layouts/Form";
import { requestRegistration } from "../../redux/actionCreators/registration";

import "./Registration.css";
import { ButtonParams, FieldsParams } from "../../layouts/Form/index.interface";
import { Fields, Props } from "./Registration.interface";
import {
  AUTHENTICATION_ROUTE,
  RESTORE_PASSWORD_ROUTE,
} from "../../utils/consts";

//* PROPERTY FOR HOC form
//* which set up a formik
const regExpPassword: RegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const passwordMessage: string =
  "Password must will be with one Uppercase, one Lowercase, one Number and special Symbol";

const AUTH_FORM_FIELDS: Fields = {
  email: "",
  password: "",
  "password repeat": "",
};

const AUTH_VALIDATION_SCHEMA: object = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(8, "Not less than 8 symbol")
    .required("Required")
    .matches(regExpPassword, passwordMessage),
  "password repeat": Yup.string()
    .min(8, "Not less than 8 symbol")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .matches(regExpPassword, passwordMessage),
});

const RegistrationForm = form(
  Form,
  AUTH_FORM_FIELDS,
  requestRegistration,
  AUTH_VALIDATION_SCHEMA
);

const Registration: FC<Props> = (): React.ReactElement => {
  
  //* --------------------------------------------------
  //* fields props for Form components, that is template
  const fields: FieldsParams[] = [
    { name: "email", type: "text" },
    { name: "password", type: "password" },
    { name: "password repeat", type: "password" },
  ];

  //* Button registration
  const buttonParams: ButtonParams = {
    text: "Registration",
    icon: faUserPlus,
  };

  return (
    <Card className="registration" title="Registration">
      <RegistrationForm 
        fields={fields} 
        buttonParams={buttonParams}
      />
      <div className="registration__links">
        <Link
          className="card-link registration__link"
          to={AUTHENTICATION_ROUTE}
        >
          authentication
        </Link>
        <Link
          className="card-link registration__link"
          to={RESTORE_PASSWORD_ROUTE}
        >
          Forgot your password?
        </Link>
      </div>
    </Card>
  );
};

export default Registration;
