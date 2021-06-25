import { FC, useState, Fragment        } from 'react';
import { Props, DialogsData            } from './Dialogs.interface';
import { useDispatch, useSelector      } from 'react-redux';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import Loader                            from 'react-loader-spinner';
import InfiniteScroll                    from 'react-infinite-scroller';
import Dialog                            from '../../../components/Dialog/Dialog';

import './Dialogs.css'; 

const Dialogs: FC <Props> = ({}): any => {
  const [isLoading, setLoading] = useState(true);
  const { url } : any = useRouteMatch();
  const dialogs : any[] = [];

  const filter = useSelector(({dialogsReducer}: any) => {
    return dialogsReducer.filter;
  });

  const handleLoading = (): Promise <any> => {
    return new Promise((resolve, reject) => {
      setLoading(!isLoading);
      return resolve(filter);
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
          <Fragment key={index}>
            { 
              (dialog.status === 'noactive')
                ? <Dialog {...dialog}/>
                : null
            }
          </ Fragment>
        )
      )
    : <p className="no-dialogs">
        No dialogs found
      </p>

  return (
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoading}
        hasMore={isLoading}
        loader={LOADER}
      >
        {dialogs}
      </InfiniteScroll>
  );
};

export default Dialogs;