import React, { FC, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";

import "./index.css";
import {
    Props,
    Handlers,
    Validation,
    FieldsParams,
} from "./index.interface";

const Form: FC<Props> = ({ children, formik, fields, buttonParams }): React.ReactElement => {
  //* With destructuring we are taking object
  //* errors : object that contains error-messages
  //* touched: object which marks the fields visited
  //* status : boolean value, if status true, that request was successful
  //* else rejected
  const { errors, touched, status }: Validation = formik;

  //* handleSubmit is function which handles form submit
  //* if all fields filled we can to do the form submit
  const { handleSubmit }: Handlers = formik;

  //* "fields" is variable, that equal fields of formik component
  //* and provide names for form fields
  const FORM_FIELDS: React.ReactNode = fields.map(
    ({ name, type }: FieldsParams, index: number): React.ReactNode => (
      <Fragment key={index}>
        <Label className="label-auth form__label">
          {name}
          <Input
            className="input-auth form__input"
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
    <Button className="button-auth form__button" type="submit">
      {buttonParams.text}
      <FontAwesomeIcon className="button__icon" icon={buttonParams.icon} />
    </Button>
  );

  const SUCCESS_MESSAGE: React.ReactNode = (
    <SuccessMessage className="form__status">
      Wellcome!
    </SuccessMessage>
  );

  const ERROR_MESSAGE: React.ReactNode = (
    <ErrorMessage className="form__status">
      Something went wrong
    </ErrorMessage>
  );

  const FORM_REQUEST_STATUS: React.ReactNode =
    //* If status true
    //* we view message about access
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

export default Form;