import { FC, useState   } from 'react';
import { Props          } from './Chatroom.interface';
import './Chatroom.css';

import { useParams, useRouteMatch } from 'react-router-dom';
import { useSelector    } from 'react-redux';
import firebase           from 'firebase';

import Namebar            from '../../components/Namebar/Namebar';
import Message            from '../../components/Message/Message';
import TextField          from '../../components/TextField/TextField';
import ReadySolution      from './ReadySolution/ReadySolution';
import EndDialog          from '../../components/EndDialog/EndDialog';

const Chatroom: FC <Props> = (): any => {
    
    const { chatId }: { chatId: string } = useParams();
    const { url    }: { url: string    } = useRouteMatch();
    
    const dialogs: any[] = useSelector((state: any) => {
        return state.menudialogsReducer.dialogs;
    });

    const dialog = dialogs.find((dialog: any) => {
        return dialog.chatId === chatId
    });

    const MESSAGE: any = (
        Object.values(dialog?.messages)?.map((message: any, index: number) => 
            <Message {...message} key={index}/>
        )
    );

    const MESSAGE_END_DIALOG: any = (
        dialog.status === 'complited'
            ? <EndDialog />
            : null
    );

    const handleSendMessage = async (value: string, chatId: string) => {
        
        if (value === '') return;

        firebase
            .database()
            .ref('chatrooms/' + chatId)
            .child('messages')
            .push()
            .set({
                writtenBy: 'operator',
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                content  : value
            })
    }

    return (
        <section className="chatroom">
            <div className="chatroom__header">
                <Namebar {...dialog}/>
            </div>
            <div className="chatroom__body">
                {MESSAGE}
                {MESSAGE_END_DIALOG}
            </div>
            <div className="chatroom__footer">
                <TextField {...dialog} handleSendMessage={handleSendMessage}/>
                <ReadySolution {...dialog} handleSendMessage={handleSendMessage}/>
            </div>
        </section>
    );
};

export default Chatroom;