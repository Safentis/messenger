import { FC              } from 'react';
import { Props           } from './Message.interface';
import Avatar              from '../Avatar/Avatar';
import useLastActivity     from '../../Hooks/useLastActivity';
import { STANDART_AVATAR } from '../../utils/consts';
import './Message.css';

const Message: FC <Props> = ({content, timestamp, writtenBy, images = [], photo}) => {


    //* -----------------------------------------------------------
    //* With useLastActivity we got a activity
    const activity: any = useLastActivity(timestamp);

    //* -----------------------------------------------------------
    //* Classes
    const isClient: boolean = writtenBy === 'client';
    const messageClass: string = isClient ? 'message-client' : 'message-operator';
    const contentClass: string = isClient ? 'text-client' : 'text-operator'


    //* -----------------------------------------------------------
    //* Avatar
    const avatar: string = isClient ? null : photo;
    

    //* -----------------------------------------------------------
    //* Content
    // console.log(images);
    const PICTURES: any = (
        images.length > 0
            ? images.map((image: any, index: number) => (
                <p className={"message__images"} key={index}>
                    <img 
                        className="message__image"
                        src={image}
                    />
                </p>
            ))
            : null
    );

    const CONTENT: any = (
        content.length > 0
            ? <p className={"message__text " + contentClass}>
                {content}
              </p>
            : null
    );

    return (
        <div className={"message " + messageClass}>
            <div className="message__user">
                <Avatar src={avatar ?? STANDART_AVATAR}/>
                <p className="message__activity">
                    {activity}
                </p>
            </div>
            <div className="message__content">
                {PICTURES}
                {CONTENT}
            </div>
        </div>
    );
};

export default Message;