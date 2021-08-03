import React, { FC } from "react";
import { Link } from "react-router-dom";

import Card from "../../layouts/Card/index";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

import { Props } from "./Registration.interface";
import { AUTHENTICATION_ROUTE } from "../../utils/consts";
import "./Registration.css";

const Registration: FC<Props> = (): React.ReactElement => {
  return (
    <Card className="registration" title="Registration">
      <RegistrationForm />
      <div className="registration__links">
        <Link 
          className="card-link registration__link" 
          to={AUTHENTICATION_ROUTE}
        >
          authentication
        </Link>
        {/* <Link
          className="card-link authentication__link"
          to={RESTORE_PASSWORD_ROUTE}
        >
          Forgot your password?
        </Link> */}
      </div>
    </Card>
  );
};

export default Registration;
