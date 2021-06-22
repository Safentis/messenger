import { FC         } from 'react'
import { Props      } from './Avatar.interface';
import './Avatar.css';

//* COMPONENTS
import userAnonymouse from '../../images/anonymous-user.png';

const Avatar: FC <Props | any> = ({className = '', children = '', ...attrs}): any => {
    return (
        <div className={"avatar " + className}>
            <img className="avatar__image" src={userAnonymouse} {...attrs}/>
            {children}
        </div>
    );
};

export default Avatar;