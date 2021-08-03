import { FC } from "react";
import { Link } from "react-router-dom";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

import form from "../../HOC/form";
import Card from "../../layouts/Card/index";
import Form from "../../layouts/Form";
import { requestAuthentication } from "../../redux/actionCreators/authentication";

import "./Authentication.css";
import { Fields } from "./Authentication.interface";
import { REGISTRATION_ROUTE, RESTORE_PASSWORD_ROUTE } from "../../utils/consts";
import { ButtonParams, FieldsParams } from "../../layouts/Form/index.interface";

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

const AuthenticationForm = form(
  Form,
  AUTH_FORM_FIELDS,
  requestAuthentication,
  AUTH_VALIDATION_SCHEMA
);

const Authentication: FC = (): React.ReactElement => {
  //* fields props for Form components, that is template
  const fields: FieldsParams[] = [
    { name: "email", type: "text" },
    { name: "password", type: "password" },
  ];

  const buttonParams: ButtonParams = {
    text: "Enter",
    icon: faSignInAlt,
  };

  return (
    <Card className="authentication" title="Authentication">
      <AuthenticationForm
        fields={fields}
        buttonParams={buttonParams}
      />
      <div className="authentication__links">
        <Link
          className="card-link authentication__link"
          to={REGISTRATION_ROUTE}
        >
          registration
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

export default Authentication;
