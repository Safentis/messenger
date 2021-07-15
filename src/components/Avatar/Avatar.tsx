import { FC              } from 'react';
import { Props           } from './Avatar.interface';
import { STANDART_AVATAR } from '../../utils/consts';
import './Avatar.css';

const Avatar: FC <Props | any> = ({className = '', url = STANDART_AVATAR, children = '', ...attrs}): any => {
    return (
        <div className={"avatar " + className}>
            <img 
                className="avatar__image" 
                src={url} 
                alt="user"
                width="50"
                height="50"
                {...attrs}
            />
            {children}
        </div>
    );
};

export default Avatar;