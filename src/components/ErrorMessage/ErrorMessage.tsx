import React from "react";
import Props from "./ErrorMessage.interface";
import "./ErrorMessage.css";

//* FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const ErrorMessage = ({ children = "Error", className = "" }: Props): any => {
  return (
    <div className={"error-message " + className}>
      <p className="error-message__text error-message__text_red">
        <FontAwesomeIcon
          className="error-message__icon_red"
          icon={faExclamationCircle}
        />
        {children}
      </p>
    </div>
  );
};

export default ErrorMessage;
