import React, { FC, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

//* COMPONENTS
import form from "../../../HOC/form";
import Label from "../../../components/Label/Label";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage/SuccessMessage";
import { requestAuthentication } from "../../../redux/actionCreators/authentication";

import "./AuthenticationForm.css";
import {
  Props,
  Handlers,
  Validation,
  Fields,
  FieldsParams,
} from "./AuthenticationForm.interface";

//* PROPERTY FOR HOC form
//* which set up a formik
const AUTH_FORM_FIELDS: Fields = {
  email: "",
  password: "",
};

const AUTH_VALIDATION_SCHEMA: object = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().min(8, "Not less than 8 symbol").required("Required"),
});

const AuthenticationForm: FC<Props> = ({ formik }): React.ReactElement => {
  console.log(typeof formik)
  //* With destructuring we are taking object
  //* errors : object that contains error-messages
  //* touched: object which marks the fields visited
  //* status : boolean value, if status true, that request was successful
  //* else rejected
  const { errors, touched, status }: Validation = formik;

  //* handleSubmit is function which handles form submit
  //* if all fields filled we can to do the form submit
  const { handleSubmit }: Handlers = formik;

  //* fields is variable, that equal fields of formik component
  //* and provide names for form fields
  const fields: FieldsParams[] = [
    { name: "email", type: "text" },
    { name: "password", type: "password" },
  ];

  const FORM_FIELDS: React.ReactNode = fields.map(
    ({ name, type }: FieldsParams, index: number): React.ReactNode => (
      <Fragment key={index}>
        <Label className="label-auth form-auth__label">
          {name}
          <Input
            className="input-auth form-auth__input"
            placeholder={name}
            name={name}
            type={type}
            {...formik.getFieldProps(name)}
          />
        </Label>
        {touched[name] && errors[name] ? (
          <ErrorMessage>{errors[name]}</ErrorMessage>
        ) : null}
      </Fragment>
    )
  );

  const FORM_BUTTON: React.ReactNode = (
    <Button className="button-auth form-auth__button" type="submit">
      Login
      <FontAwesomeIcon className="button__icon" icon={faSignInAlt} />
    </Button>
  );

  const SUCCESS_MESSAGE: React.ReactNode = (
    <SuccessMessage className="form-auth__status">
      Access is allowed, wellcome!
    </SuccessMessage>
  );

  const ERROR_MESSAGE: React.ReactNode = (
    <ErrorMessage className="form-auth__status">
      User was not found, please cheking email or password!
    </ErrorMessage>
  );

  const FORM_REQUEST_STATUS: React.ReactNode =
    //* If status true
    //* we view message about access login
    //* else we are seeing error message
    status !== undefined ? (status ? SUCCESS_MESSAGE : ERROR_MESSAGE) : null;

  return (
    <form className="form" onSubmit={handleSubmit}>
      {FORM_FIELDS}
      {FORM_BUTTON}
      {FORM_REQUEST_STATUS}
    </form>
  );
};

export default form(
  AuthenticationForm,
  AUTH_FORM_FIELDS,
  requestAuthentication,
  AUTH_VALIDATION_SCHEMA
);
