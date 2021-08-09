import React, { FC } from "react";

import Props from "./Input.interface";
import "./Input.css";

const Input: FC <Props | any> = ({ className = "input", ...attrs }): React.ReactElement => {
  return <input className={`input ${className}`} {...attrs} />;
};

export default Input;
