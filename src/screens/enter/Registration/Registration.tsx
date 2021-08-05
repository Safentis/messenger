import React, { FC } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import form from "../../../HOC/form";
import Card from "../../../layouts/Card/index";
import Form from "../../../layouts/Form";
import { requestRegistration } from "../../../redux/actionCreators/registration";

import "./Registration.css";
import {
  ButtonParams,
  FieldsParams,
  FormLink,
} from "../../../layouts/Form/index.interface";
import { Fields, Props } from "./Registration.interface";
import {
  AUTHENTICATION_ROUTE,
  PASSWORD_VALIDATION_MESSAGE,
  REG_EXP_PASSWORD,
  RESTORE_PASSWORD_ROUTE,
  UPDATE_PASSWORD_ROUTE,
} from "../../../utils/consts";

//* PROPERTY FOR HOC form
//* which set up a formik
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
    .matches(REG_EXP_PASSWORD, PASSWORD_VALIDATION_MESSAGE),
  "password repeat": Yup.string()
    .min(8, "Not less than 8 symbol")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .matches(REG_EXP_PASSWORD, PASSWORD_VALIDATION_MESSAGE),
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

  const links: FormLink[] = [
    { to: AUTHENTICATION_ROUTE, content: "Authentication" },
    { to: RESTORE_PASSWORD_ROUTE, content: "Restore" },
  ];

  return (
    <Card className="registration" title="Registration">
      <RegistrationForm fields={fields} buttonParams={buttonParams} />
      <div className="card-links registration__links">
        {links.map(
          ({ to, content }: FormLink, index: number): React.ReactNode => (
            <Link className="card-link registration__link" key={index} to={to}>
              {content}
            </Link>
          )
        )}
      </div>
    </Card>
  );
};

export default Registration;
