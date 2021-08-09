import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import { Props } from "./StatusOffline.interface";
import "./StatusOffline.css";

const StatusOffline: FC<Props> = ({ className = "" }): React.ReactElement => {
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
