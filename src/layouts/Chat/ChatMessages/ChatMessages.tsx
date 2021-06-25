import { FC         } from 'react';
import { Props      } from './ChatMessages.interface';
import './ChatMessages.css';

import moment         from 'moment'
import Avatar         from '../../../components/Avatar/Avatar';

const Message: FC = ({content, writenBy, timestamp}: any): any => {
    const author      : boolean = writenBy === 'client';
    const classMessage: string = author ? 'message_left-side' : 'message_right-side';
    const classContent: string = author ? 'message__content_lgblue' : 'message__content_grey';
    const classInfo   : string = author ? 'message__info_left' : 'message__info_right'

    const date : any = moment(timestamp);
    const hour : number = date.hours();
    const minut: number = date.minute();
    
    return (
        <div className={`message ${classMessage}`}> 
            <p className={`message__content ${classContent}`}>
                {content}
            </p>
            <div className={`message__info ${classInfo}`}>
                <Avatar className="message__avatar" width="50" height="50"/>
                <p className="message__time">
                    {hour}:{minut}
                </p>
            </div>
        </div>
    )
}

const ChatMessages: FC <Props> = ({messages}): any => {
    return (
        <div className="messages">
            {   
                messages.map((message: any, index: number) =>
                    <Message {...message} key={index}/>    
                )
            }
        </div>
    )
}


export default ChatMessages;