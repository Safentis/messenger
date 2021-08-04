import { FC } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import form from "../../HOC/form";
import Form from "../../layouts/Form";
import Card from "../../layouts/Card";
import { requestRestore } from "../../redux/actionCreators/restore";

import "./Restore.css";
import { Fields, Props } from "./Restore.interface";
import { AUTHENTICATION_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";
import { ButtonParams, FieldsParams } from "../../layouts/Form/index.interface";

//* PROPERTY FOR HOC form
//* which set up a formik
const AUTH_FORM_FIELDS: Fields = {
  email: "",
};

const AUTH_VALIDATION_SCHEMA: object = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
});

const RestoreForm = form(
  Form,
  AUTH_FORM_FIELDS,
  requestRestore,
  AUTH_VALIDATION_SCHEMA
);

const Restore: FC<Props> = (): React.ReactElement => {
  //* --------------------------------------------------
  //* fields props for Form components, that is template
  const fields: FieldsParams[] = [{ name: "email", type: "text" }];

  //* Button reset
  const buttonParams: ButtonParams = {
    text: "Restore",
    icon: faEnvelope,
  };

  //* Messages succes and failure
  const successMessage: string = "Сheck you email, a password reset email was sent there!";
  const failureMessage: string = "Somthing wrong, email addres don't not exist or don't wrong!";

  return (
    <Card className="restore" title="Restore">
      <RestoreForm 
        fields={fields} 
        buttonParams={buttonParams}
        successMessage={successMessage}
        failureMessage={failureMessage} 
      />
      <div className="restore__links">
        <Link
          className="card-link restore__link"
          to={AUTHENTICATION_ROUTE}
        >
          Authentication
        </Link>
        <Link
          className="card-link restore__link"
          to={REGISTRATION_ROUTE}
        >
          Registration
        </Link>
      </div>
    </Card>
  );
};

export default Restore;
