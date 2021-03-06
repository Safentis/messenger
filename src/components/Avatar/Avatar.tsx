import React, { FC } from 'react';

import { Props } from './Avatar.interface';
import { STANDART_AVATAR } from '../../utils/consts';
import './Avatar.css';

const Avatar: FC<Props> = ({
  url = STANDART_AVATAR,
  children = '',
  className = '',
  ...attrs
}): React.ReactElement => {
  return (
    <div className={'avatar ' + className}>
      <img className="avatar__image" src={url} alt="user" {...attrs} />
      {children}
    </div>
  );
};

export default Avatar;
