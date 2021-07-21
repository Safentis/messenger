import { FC, useEffect } from 'react';
import './Messages.css';
import { 
    Props, 
    MessagesElement, 
    ScrollHeight 
} from './Messages.interface';

const Messages: FC <Props> = ({children, className = ''}) => {

    //* --------------------------------------------------------
    //* Autoscroll messages
    useEffect(() => {
        let messagesElement: MessagesElement; 
        let scrollHeight   : ScrollHeight;
       
        messagesElement = document.querySelector('.messages');
        scrollHeight    = messagesElement && messagesElement?.scrollHeight;
        
        if (messagesElement && scrollHeight) {
            messagesElement?.scrollTo({
                top: scrollHeight,
                behavior: 'smooth'
            });
        }

        return () => {
            messagesElement = null;
            scrollHeight = null;
        }
    });

    return (
        <div className={"messages " + className}>
            <div className="messages__inner">
                {children}
            </div>
        </div>
    );
};

export default Messages;