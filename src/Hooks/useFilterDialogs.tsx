import { useState, useEffect } from "react";

import { Chatroom } from "../screens/Root.interface";

interface Props {
  dialogs: any[];
  status: string;
  uid: string;
}

type chatroomType = [string, Chatroom]

const useFilterDialogs = ({ dialogs, status, uid }: Props) => {
  //* State of the custom-hook
  const [result, setResult]: [chatroomType[], Function] = useState([]);

  useEffect(() => {
    //* We are getting all dialogs and filter them
    //* to a status, and return result back
    if (dialogs) {
      const noFiltered: chatroomType[] = Object.entries(dialogs);
      const isFiltered: chatroomType[] = noFiltered.filter(([key, value]: chatroomType) => {
        return value.status !== "noactive"
          ? (value.status === status && value.operatorId === uid) ||
              (value.saved === status && value.operatorId === uid) ||
              (value.saved === status &&
                value.status === "complited" &&
                value.operatorId === uid)
          : value.status === status;
      });

      setResult(isFiltered);
    }

    return () => {
      setResult([]);
    };
  }, [dialogs]);

  return result;
};

export default useFilterDialogs;
