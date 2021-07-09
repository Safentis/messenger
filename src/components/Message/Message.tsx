import { FC          } from 'react';
import { Props       } from './Message.interface';
import './Message.css';

import { useSelector } from 'react-redux';
import Avatar          from '../Avatar/Avatar';
import moment          from 'moment';

const Message: FC <Props> = ({content, timestamp, writtenBy, src, avatar}): any => {
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

    const CONTENT: any = (
        content.length < 1
            ? null
            : <p className={`message__content ${contentClass}`}>
                {content}
            </p>
    );

    const operator = useSelector((state: any) => {
        return state.menudialogsReducer.avatar;
    });

    const userAvatar = (writtenBy === 'client') 
        ? avatar 
        : operator;

    

    return (
        <div className={`message ${messageClass}`}>
            {IMAGES}
            {CONTENT}
            <div className="message__user">
                <Avatar className={`message__user-avatar ${avatarClass}`} src={userAvatar} width="50" height="50">
                    <p className="message__user-last-activity">
                        {lastActivity}
                    </p>
                </Avatar>
            </div>
        </div>
    );
}

export default Message;