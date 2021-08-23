import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { setFilteredDialogs } from '../redux/actionCreators/dialogs';
import { Chatroom, Chatrooms, Message } from '../screens/Root.interface';

type chatroomType = [string, Chatroom];
interface Props {
  dialogs: Chatrooms;
  search: string;
}

const useSearchHook = ({ dialogs, search }: Props): null => {
  //* ---------------------------------------------------
  //* Search result
  let dispatch: Function = useDispatch();

  const searchFunc = () => {
    if (dialogs && Object.keys(dialogs).length > 0) {
      let lowerSearchCase: string = search.toLowerCase();
      let isFiltered: chatroomType[] = [];
      let noFiltered: chatroomType[] = [];
      let isEntries: Chatrooms;

      //* We search by customer name and if we find
      //* matches we push the result into the isFiltered array
      //* else we push result into the noFiltered array for searching
      //* by message
      Object.entries(dialogs).filter((dialog: chatroomType) => {
        let [key, value]: chatroomType = dialog;
        let lowerClientCase: string = value?.client?.toLowerCase();

        lowerClientCase?.includes(lowerSearchCase)
          ? isFiltered.push(dialog)
          : noFiltered.push(dialog);
      });

      //* In this case we search by content of a message
      //* and if we searching, we push the result into isFiltered array
      noFiltered.length > 0 &&
        noFiltered.forEach((dialog: chatroomType) => {
          let [key, value]: chatroomType = dialog;
          let messages: Message[] = Object.values(value?.messages || []);

          messages.forEach((message: Message) => {
            let lowerContentCase: string = message.content.toLowerCase();
            lowerContentCase.includes(lowerSearchCase) && isFiltered.push(dialog);
          });
        });

      isFiltered = [...new Set(isFiltered)];
      isEntries = Object.fromEntries(isFiltered);

      dispatch(setFilteredDialogs(isEntries));
    }
  };

  useEffect(() => {
    let debounce: null | Function;

    //* With debounce we make nomuch delay
    debounce = _.debounce(searchFunc, 700);
    debounce();

    return () => {
      debounce = null;
    };
  }, [search]);

  return null;
};

export default useSearchHook;
