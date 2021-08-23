import React, { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import Dialog from '../../../../components/Dialog/Dialog';
import useFilterDialogs from '../../../../Hooks/useFilterDialogs';
import useInfiniteScroll from '../../../../Hooks/useInfiniteScroll';
import { requestActions } from '../../../../redux/actionCreators/dialogs';

import { Props } from './Noactive.interface';
import { Chatroom } from '../../../Root.interface';
import { handleSignalsNotification } from '../../../../utils/functions';

type dateType = string | number | Date;
type chatroomType = [string, Chatroom];
type dispatchType = {
  status: string;
  operatorId: string;
  begun: dateType;
};

const Noactives: FC<Props> = ({ dialogs, user: { uid } }) => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  //* -------------------------------------------------------
  //* We create filter
  const status: string = 'noactive';
  const result: chatroomType[] = useFilterDialogs({ dialogs, status, uid });

  //* -------------------------------------------------------
  //* Handle of enter
  const handleEnter = async (event: MouseEvent): Promise<void> => {
    const target: HTMLElement = event.target as HTMLElement;
    const chatId: string = target.dataset.id as string;
    const begun: dateType = new Date();
    const body: dispatchType = {
      status: 'active',
      operatorId: uid,
      begun,
    };

    await handleSignalsNotification(chatId);
    await dispatch(requestActions({ chatId, body }));
  };

  //* ---------------------------------------------------------
  //* Logic of loader
  const scroll = useInfiniteScroll({ result });
  const { records, loadMore, hasMoreItems, loader } = scroll;

  //* With this function we creat of a Dialog components
  //* and add them to items array for preload
  const showItems = (dialogs: any[]): any[] => {
    const items: any[] = [];

    if (dialogs.length > 0) {
      for (let i = 0; i <= records; ++i) {
        //* If the dialogue is undefined, we skip it
        if (typeof dialogs[i] === 'undefined') {
          continue;
        } else {
          const [key, value] = dialogs[i];
          items.push(
            <Dialog key={i} {...value}>
              <Link
                className="button-action"
                onClick={handleEnter}
                to={'actives' + '/' + key}
                data-id={key}
              >
                start
              </Link>
            </Dialog>,
          );
        }
      }
    }

    return items;
  };

  return (
    <>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMoreItems} loader={loader} useWindow={false}>
        {showItems(result)}
      </InfiniteScroll>
    </>
  );
};

export default Noactives;
