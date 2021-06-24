import { FC          } from 'react';
import { Props       } from './Chat.interface';
import './Chat.css';

import { useSelector } from 'react-redux';
import { useParams   } from 'react-router';

import ChatMessages    from './ChatMessages/ChatMessages';
import ChatNamebar     from './ChatNamebar/ChatNamebar';

const Chat: FC <Props> = () => {
    //* we get dialogs
    const dialogs   : any = useSelector(({dialogsReducer: { dialogs }}: any) => dialogs);
    //* we get chatId from params of the path
    const { chatId }: any = useParams();
    
    //* if dialgos chatId is equal to the path chatId, we getting dialog
    const dialog: any = dialogs.find((dialog: any) => {
        return (dialog.chatId === chatId) &&  dialog 
    });

    return (
        <div className="chat-wrapper">
            <ChatNamebar {...dialog}/>
            <ChatMessages {...dialog}/>
        </div>
  );
};

export default Chat;
