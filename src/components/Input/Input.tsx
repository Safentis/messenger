import React from "react";
import Props from "./Input.interface";
import "./Input.css";

const Input = ({ className = "input", ...attrs }: Props | any) => {
  return <input className={`input ${className}`} {...attrs} />;
};

export default Input;
