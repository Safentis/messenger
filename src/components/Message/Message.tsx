import { FC        } from 'react';
import { Props     } from './Message.interface';
import './Message.css';

import anonymousUser from '../../images/anonymous-user.png';


const Message: FC <Props> = ({}): any => {
    return (
        <div className="message">
            <p className="message__content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Dolores saepe iure et, temporibus necessitatibus architecto odit 
                ipsa numquam dolorem vitae.
            </p>
            <div className="message__user">
                <img className="message__user-avatar" src={anonymousUser} alt="user" width="50" height="50"/>
                <p className="message__user-last-activity">
                    10:30 p.m.
                </p>
            </div>
        </div>
    );
}

export default Message;