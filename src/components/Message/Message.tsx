import { FC        } from 'react';
import { Props     } from './Message.interface';
import './Message.css';

import Avatar        from '../Avatar/Avatar';
import moment from 'moment';

const Message: FC <Props> = ({content, timestamp, writtenBy, src}): any => {
    const date: any = moment(timestamp);
    const lastActivity: string = date.fromNow();
    
    const isClient: boolean = writtenBy === 'client';
    const messageClass: string = isClient ? 'message_left' : 'message_right';
    const contentClass: string = isClient ? 'message__content_grey' : 'message__content_blue';
    const avatarClass : string = isClient ? 'avatar_left' : 'avatar_right'

    const images: any[] = src?.map((path: string, index: number) => 
        <img 
            className="message__img" 
            key={index}
            src={path} 
            alt="image" 
        />
    );

    const IMAGES: any = (
        images?.map(img => img)
    );

    return (
        <div className={`message ${messageClass}`}>
            <p className={`message__content ${contentClass}`}>
               {content}
            </p>
            {IMAGES}
            <div className="message__user">
                <Avatar className={`message__user-avatar ${avatarClass}`} width="50" height="50">
                    <p className="message__user-last-activity">
                        {lastActivity}
                    </p>
                </Avatar>
            </div>
        </div>
    );
}

export default Message;