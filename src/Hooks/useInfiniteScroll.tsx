import { useState } from "react";
import Loader from "react-loader-spinner";

import { Chatroom } from "../screens/Root.interface";

type chatroomType = [string, Chatroom];

interface Props {
  result: chatroomType[]
}

interface InfiniteScrollReturns {
  records: number,
  loadMore: () => void,
  hasMoreItems: boolean,
  loader: React.ReactElement,
}

const useInfiniteScroll = ({ result }: Props): InfiniteScrollReturns => {
  const itemsPerPage: number = 1;
  const [hasMoreItems, sethasMoreItems]: [boolean, Function] = useState(true);
  const [records, setRecords]: [number, Function] = useState(itemsPerPage);

  //* If a records number was equal to dialogs length
  //* we'll be removing loader
  //* else if records less or equal than dialogs length
  //* we'll be incrementing of the records count
  //* which will bring up more dialogues
  const loadMore = (): void => {
    if (result.length === 0) {
      sethasMoreItems(false);
    } else if (records >= result.length) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setRecords(records + itemsPerPage);
      }, 2000);
    }
  };

  const loader: React.ReactElement = (
    <div className="loader" key={0}>
      <Loader type="ThreeDots" color="#757b92" height={100} width={100} />
    </div>
  );

  return {
    records,
    loadMore,
    hasMoreItems,
    loader,
  };
};

export default useInfiniteScroll;
