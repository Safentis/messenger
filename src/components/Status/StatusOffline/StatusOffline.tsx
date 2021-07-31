import { FC } from "react";
import { Props } from "./StatusOffline.interface";
import "./StatusOffline.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const StatusOffline: FC<Props> = ({ className = "" }): any => {
  return (
    <>
      <FontAwesomeIcon
        className={"status-offline " + className}
        icon={faCircle}
      />
    </>
  );
};

export default StatusOffline;
