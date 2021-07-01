import { FC             } from 'react';
import { Props          } from './Chatroom.interface';
import './Chatroom.css';

import { useParams      } from 'react-router-dom';
import { useSelector    } from 'react-redux';
import _                  from 'lodash';
import Namebar            from '../../components/Namebar/Namebar';
import Message            from '../../components/Message/Message';
import TextField          from '../../components/TextField/TextField';

const Chatroom: FC <Props> = (): any => {
    
    const { chatId }: { chatId: string } = useParams();
    
    const dialogs: any[] = useSelector((state: any) => {
        return state.menudialogsReducer.dialogs;
    });

    const dialog = _.find(dialogs, (dialog: any) => {
        return dialog.chatId === chatId
    });

    const MESSAGE: any = (
        dialog?.messages?.map((message: any, index: number) => 
            <Message {...message} key={index}/>
        )
    );

    console.log(dialog.messages);


    return (
        <section className="chatroom">
            <div className="chatroom__header">
                <Namebar {...dialog}/>
            </div>
            <div className="chatroom__body">
                {MESSAGE}
            </div>
            <div className="chatroom__footer">
                <TextField {...dialog}/>
            </div>
        </section>
    );
};

export default Chatroom;