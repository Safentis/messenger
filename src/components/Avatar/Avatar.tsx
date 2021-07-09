import { FC           } from 'react';
import { Props        } from './Avatar.interface';
import standartAvatar   from '../../HOC/standart-avatar';
import './Avatar.css';

const Avatar: FC <Props | any> = ({className = '', url, children = '', ...attrs}): any => {
    
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

export default standartAvatar(Avatar);