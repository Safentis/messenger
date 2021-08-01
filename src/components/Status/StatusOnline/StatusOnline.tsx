import { FC } from "react";
import { Props } from "./StatusOnline.interface";
import "./StatusOnline.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const StatusOnline: FC<Props> = ({ className = "" }): any => {
  return (
    <>
      <FontAwesomeIcon
        className={"status-online " + className}
        icon={faCircle}
      />
    </>
  );
};

export default StatusOnline;
