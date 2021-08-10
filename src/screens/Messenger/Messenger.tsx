import { Dispatch, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';

import MessengerRoutes from './MessengerRoutes';
import Namebar from '../../layouts/Namebar/index';
import Aside from '../../layouts/Aside/index';

import './Messenger.css';
import { requestDialogs } from '../../redux/actionCreators/dialogs';
import { setFilteredDialogs } from '../../redux/actionCreators/dialogs';
import { requestUser } from '../../redux/actionCreators/user';
import { requestTokenCheck } from '../../redux/actionCreators/authentication';
import { messengerRoutes, namebarRoutes, contentRoutes } from '../../routes';
import { RootReducerState } from '../../redux/reducers/rootReducer.interface';
import { Chatrooms } from '../Root.interface';

const Messenger: FC = (): React.ReactElement => {
  //* --------------------------------------------------------------------
  //* We take of the token from the gloabal state by name storage
  //* if component mounted, we test of the token, and if token is not valid
  //* we exiting from account
  const dispatch: Dispatch<object> = useDispatch();
  //* -----------------------------------------------------
  //* We get of the all dialogs and user information
  const { token, dialogs, user, settings } = useSelector((state: RootReducerState) => {
    return {
      token: state.authenticationReducer.token,
      dialogs: state.dialogsReducer.filtered,
      user: state.userReducer.user,
      settings: state.userReducer.settings,
    };
  });

  useEffect(() => {
    // dispatch(requestTokenCheck(token));
  }, []);

  //* --------------------------------------------------------------------
  //* We get of the all dialogs from database and saves them to store
  //* and create long connection
  useEffect(() => {
    let database = firebase.database();
    let chatrooms = database.ref('chatrooms');

    chatrooms.on('value', snapshot => {
      let dialogs: Chatrooms = snapshot.val();

      dispatch(requestDialogs(dialogs));
      dispatch(setFilteredDialogs(dialogs));
    });
  }, []);

  //* --------------------------------------------------------------------
  //* We get of the users information
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(requestUser({ user }));
      }
    });
  }, []);

  return (
    <div className="messenger">
      <Aside>
        <MessengerRoutes
          settings={settings}
          dialogs={dialogs}
          user={user}
          routes={messengerRoutes}
        />
      </Aside>
      <Namebar>
        {/* prettier-ignore */}
        <MessengerRoutes 
          settings={settings} 
          dialogs={dialogs} 
          user={user}
          routes={namebarRoutes} 
        />
      </Namebar>
      {/* prettier-ignore */}
      <MessengerRoutes 
          settings={settings} 
          dialogs={dialogs} 
          user={user} 
          routes={contentRoutes} 
        />
    </div>
  );
};

export default Messenger;
