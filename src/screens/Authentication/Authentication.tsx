import { FC } from "react";
import * as Yup from "yup";

import form from "../../HOC/form";
import { requestAuthentication } from "../../redux/actionCreators/authentication";
import AuthenticationForm from "./AuthenticationForm/AuthenticationForm";

import { Fields } from "./Authentication.interface";
import "./Authentication.css";

//* PROPERTY FOR HOC form
//* which set up a formik
const AUTH_FORM_FIELDS: Fields = {
  email: "",
  password: "",
};

const AUTH_VALIDATION_SCHEMA: object = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().min(6, "Not less than 6 symbol").required("Required"),
});

const AuthenticationFormHOC: any = form(
  AuthenticationForm,
  AUTH_FORM_FIELDS,
  requestAuthentication,
  AUTH_VALIDATION_SCHEMA
);

const Authentication: FC = (): any => {
  return (
    <>
      <section className="authentication">
        <div className="card authentication__card">
          <h2 className="title card__title">Authentication</h2>
          <AuthenticationFormHOC />
        </div>
      </section>
    </>
  );
};

export default Authentication;
