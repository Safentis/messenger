import { FC    } from 'react';
import { Props } from './Typing.interface';
import './Typing.css';

const Typing: FC <Props> = ({className, isTyping}) => {
    return isTyping
        ? 
          <p className={"typing " + className}>
            Typing message...
          </p>
        : null
};

export default Typing;