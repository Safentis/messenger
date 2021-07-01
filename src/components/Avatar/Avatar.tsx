import { FC          } from 'react';
import { Props       } from './Avatar.interface';
import './Avatar.css';

import avatarAnonymous from '../../images/anonymous-user.png'

const Avatar: FC <Props | any> = ({className = '', url = avatarAnonymous, children = '', ...attrs}): any => {
    return (
        <div className={"avatar " + className}>
            <img className="avatar__image" src={url} alt="user" {...attrs}/>
            {children}
        </div>
    );
};

export default Avatar;