import { useState, useEffect } from "react";
import moment from "moment";

import { DateType } from "../screens/Root.interface";

const useLastActivity = (timestamp: DateType): DateType => {
  const [lastActivity, setLastActivity] = useState("");

  const callLastActivity = () => {
    let lastActivity: string = moment(timestamp).fromNow();
    setLastActivity(lastActivity);
  };

  useEffect(() => {
    callLastActivity();
    const id = setInterval(() => {
      callLastActivity();
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return lastActivity;
};

export default useLastActivity;
