import { useState, useEffect } from 'react';

import { Chatroom, Chatrooms } from '../screens/Root.interface';

export type ChatroomType = [string, Chatroom];
interface Props {
  dialogs: Chatrooms;
  status: string;
  uid: string;
}

const useFilterDialogs = ({ dialogs, status, uid }: Props) => {
  //* State of the custom-hook
  const [result, setResult]: [ChatroomType[], Function] = useState([]);

  useEffect(() => {
    //* We are getting all dialogs and filter them
    //* to a status, and return result back
    if (dialogs) {
      const noFiltered: ChatroomType[] = Object.entries(dialogs);
      const isFiltered: ChatroomType[] = noFiltered.filter(([key, value]: ChatroomType) => {
        return value.status !== 'noactive'
          ? (value.status === status && value.operatorId === uid) ||
              (value.saved === status && value.operatorId === uid) ||
              (value.saved === status && value.status === 'complited' && value.operatorId === uid)
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
