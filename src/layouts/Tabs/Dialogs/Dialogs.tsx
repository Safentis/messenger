import { FC, useState        } from 'react';
import { Props, DialogsData  } from './Dialogs.interface';
import { useSelector         } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import firebase                from 'firebase';
import Loader                  from 'react-loader-spinner';
import InfiniteScroll          from 'react-infinite-scroller';
import Dialog                  from '../../../components/Dialog/Dialog';

import './Dialogs.css'; 

const Dialogs: FC <Props> = ({}): any => {
  const { url }: any = useRouteMatch();
  const dialogs: any[] = [];
  const [isLoading, setLoading] = useState(true)

  const filter = useSelector(({dialogsReducer}: any) => {
    return dialogsReducer.filter;
  });

  const handleLoading = (): Promise <any> => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('chatrooms')
        .on('value', (snapShot: any) => {
          setLoading(!isLoading);
          return resolve(snapShot.val());
        });
    });
  }

  const LOADER: any = (
    <div key={0} className="dialogs-loader">
      <Loader type="ThreeDots" color="#757b92" height={100} width={100}/>
    </div>
  );

  filter?.length > 0
    ? filter.map((dialog: any, index: number): any =>
        dialogs.push(
          <Link key={index} to={`${url}/${dialog.chatId}`}>
            { 
              (dialog.status === 'active')
                ? <Dialog {...dialog}/>
                : null
            }
          </Link>
        )
      )
    : <p className="no-dialogs">
        No dialogs found
      </p>

  return (
      <InfiniteScroll
        pageStart={1}
        loadMore={handleLoading}
        hasMore={isLoading}
        loader={LOADER}
      >
        {dialogs}
      </InfiniteScroll>
  );
};

export default Dialogs;