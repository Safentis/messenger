import { FC                  } from 'react';
import { Props, DialogsData  } from './Dialogs.interface';
import { useSelector         } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Loader                  from 'react-loader-spinner';
import Dialog                  from '../../../components/Dialog/Dialog';
import './Dialogs.css'; 

const Dialogs: FC <Props> = ({}): any => {
  const { url }: any = useRouteMatch();

  
  const { loader, filter }: DialogsData = useSelector(
    ({loaderReducer, dialogsReducer}: any) => {
      return {
        filter: dialogsReducer.filter,
        loader : loaderReducer.loader, 
      };
  });

  const LOADER: any = (
    <div className="dialogs-loader">
      <Loader type="ThreeDots" color="#757b92" height={100} width={100}/>
    </div>
  );

  
  const DIALOGS: any = (
    filter?.length > 0
      ? filter.map((dialog: any, index: number): any =>
          <Link key={index} to={`${url}/${dialog.chatId}`}>
            { 
              (dialog.status === 'active')
                ? <Dialog {...dialog}/>
                : null
            }
          </Link>
        )
      : <p className="no-dialogs">
          No dialogs found
        </p>
  );

  return (
    loader
      ? LOADER
      : DIALOGS
  );
};

export default Dialogs;