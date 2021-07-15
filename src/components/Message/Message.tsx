import { FC          } from 'react';
import { Props       } from './Message.interface';
import Avatar          from '../Avatar/Avatar';
import useLastActivity from '../../Hooks/useLastActivity';
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
    const pictures: string[] = Object.values(images);
    const PICTURES: any = (
        pictures.map((src: string, inedx: number) => (
            <img 
                className="message__image"
                key={inedx} 
                src={src}
            />
        ))
    );

    return (
        <div className={"message " + messageClass}>
            <div className="message__user">
                <Avatar src={avatar}/>
                <p className="message__activity">
                    {activity}
                </p>
            </div>
            <div className="message__content">
                <p className={"message__images"}>
                    {PICTURES}
                </p>
                <p className={"message__text " + contentClass}>
                    {content}
                </p>
            </div>
        </div>
    );
};

export default Message;