import { FC } from "react";
import { Props } from "./Status.interface";
import StatusOffline from "./StatusOffline/StatusOffline";
import StatusOnline from "./StatusOnline/StatusOnline";

const Status: FC<Props> = ({ className = "", status }): any => {
  return (
    <>
      {status === "online" ? (
        <StatusOnline className={className} />
      ) : (
        <StatusOffline className={className} />
      )}
    </>
  );
};

export default Status;
