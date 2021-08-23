import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { requestExitingApp } from '../../redux/actionCreators/authentication';
import Button from '../../components/Button/Button';
import Profile from '../../screens/options/Profile/Profile';
import Settings from '../../screens/options/Settings/Settings';

import { UserStore } from '../../redux/reducers/userReducer/userReducer.interface';
import { Props } from './index.interface';
import { RootReducerState } from '../../redux/reducers/rootReducer.interface';
import './index.css';

const Namebar: FC<Props> = ({ children }): React.ReactElement => {
  //* ---------------------------------------------------
  //* Application exit handler
  const dispatch = useDispatch();
  const handleExit = () => {
    dispatch(requestExitingApp());
  };

  //* ---------------------------------------------------
  //* Application user information
  const user = useSelector((state: RootReducerState): UserStore => {
    return state.userReducer.user;
  });

  return (
    <section className="namebar">
      <div className="namebar__inner">
        <div className="namebar__top">
          <div className="namebar__children">{children}</div>
          <div className="namebar__name">{user.name || user.email}</div>
          <div className="namebar__controls">
            <Settings />
            <Profile />
            <Button className="namebar__button" onClick={handleExit}>
              exit
              <FontAwesomeIcon className="icon namebar__icon" icon={faSignOutAlt} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Namebar;
