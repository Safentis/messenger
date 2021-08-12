import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Chatroom } from '../../screens/Root.interface';
import { RootReducerState } from '../../redux/reducers/rootReducer.interface';
import { Props, paramsType } from './Name.interface';
import './Name.css';

const Name: FC<Props> = ({}): React.ReactElement => {
  const { key: chatId }: paramsType = useParams();
  const { client }: Chatroom = useSelector((state: RootReducerState): Chatroom => {
    return state.dialogsReducer.dialogs[chatId as string];
  });

  return (
    <div className="name">
      <h2 className="name__client">{client}</h2>
    </div>
  );
};

export default Name;
