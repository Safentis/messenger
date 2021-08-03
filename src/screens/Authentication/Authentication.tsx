import { FC } from "react";
import { Link } from "react-router-dom";

import Card from "../../layouts/Card/index";
import AuthenticationForm from "./AuthenticationForm/AuthenticationForm";

import "./Authentication.css";
import { REGISTRATION_ROUTE, RESTORE_PASSWORD_ROUTE } from "../../utils/consts";

const Authentication: FC = (): React.ReactElement => {
  return (
    <Card className="authentication" title="Authentication">
      <AuthenticationForm />
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
