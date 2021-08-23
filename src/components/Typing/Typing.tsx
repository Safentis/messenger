import React, { FC } from 'react';

import './Typing.css';
import { Props } from './Typing.interface';

const Typing: FC<Props> = ({ className, isTyping }): React.ReactElement | null => {
  return isTyping ? <p className={'typing ' + className}>Client typing message...</p> : null;
};

export default Typing;
