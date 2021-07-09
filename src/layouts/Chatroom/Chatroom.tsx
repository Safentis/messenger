import { FC, useEffect, useState } from 'react';
import { Props                   } from './Chatroom.interface';
import './Chatroom.css';

import { useParams               } from 'react-router-dom';
import { useSelector             } from 'react-redux';
import { usePubNub               } from 'pubnub-react';
import firebase                    from 'firebase';

import Namebar                     from '../../components/Namebar/Namebar';
import Message                     from '../../components/Message/Message';
import TextField                   from '../../components/TextField/TextField';
import ReadySolution               from './ReadySolution/ReadySolution';

interface Params {
    chatId: string
}

interface MessageData {
    writtenBy: string
    content  : string
    timestamp: any
    src     ?: string[]
}

const Chatroom: FC <Props> = (): any => {
    const { chatId }: Params = useParams();

    //* We get all a data from store
    const dialogs: any[] = useSelector((state: any) => {
        return state.menudialogsReducer.dialogs;
    });

    //* After, we search of the dialog that 
    //* is equal to a chatID
    const dialog = dialogs.find((dialog: any) => {
        return dialog.chatId === chatId;
    });


    //* Template for the firebase data
    const messageData = ({content, src = []}: { content: string, src?: string[] }): MessageData => {
        let writtenBy: string = 'operator';
        let timestamp: any = firebase.database.ServerValue.TIMESTAMP;
        return {
            writtenBy,
            timestamp,
            content,
            src,
        };
    };
    
    //* Handler for sending of messages to the database
    const handleSendMessage = async (content: string, chatId: string) => {
        
        if (content.length > 0) {
            const chatRef : any = firebase.database().ref('chatrooms/' + chatId);
            const messages: any = chatRef.child('messages').push();
            const message : MessageData = messageData({content})

            messages.set(message);
        };
    };

    const entries: any[] = Object.values(dialog?.messages || []);
    const pubnub: any = usePubNub();
    const [channels] = useState([`channel-${chatId}`]);
    const [messages, addMessage]: [any[],  Function] = useState(entries);
    const [message, setMessage ]: [string, Function] = useState('');

    const [isTyping, setTyping] = useState(false);
    const [typingUID, setTypingUID] = useState('');
    const hideTypingIndicator = () => {
        setTyping(false);
    }


    useEffect(() => {
        addMessage([...entries])
    }, [dialog])


    const handleMessage = (event: any): void => {
        const message: any = event.message;

        if (message.length > 0) {
            const content: any = message.text || message;
            const newMessage: MessageData = messageData({content})

            addMessage((messages: any) => [
                ...messages, 
                newMessage,
            ]);
        }
    };


    const sendMessage = (message: any): void => {
        if (message) {
            pubnub
                .publish({ channel: channels[0], message })
                .then(() => handleSendMessage(message, chatId))
                .then(() => {
                    setMessage('');
                    setTypingUID('');
                    setTyping(false);
                });
        }
    };


    const handleSignals = (event: any) => {
        
        setTypingUID(event.publisher);

        if (event.message === '0') {
            hideTypingIndicator();
            setTypingUID('');
        }
    }


    const handleChange = (event: any): void => {
        setMessage(event.target.value);

        const inputHasText: boolean = event.target.value.length > 1

        if ((inputHasText && !isTyping) || (!inputHasText && isTyping)) {
            
            setTyping(!isTyping);

            pubnub.signal({
                channel: channels[0],
                message: inputHasText ? '1' : '0'
            });
        }
    }


    useEffect(() => {
        pubnub.addListener({ message: handleMessage, signal: handleSignals });
        pubnub.subscribe({ channels });
        return () => {
            pubnub.unsubscribeAll();
        } 
    }, [pubnub, channels]);


    const MESSAGES: any = (
        messages.map((message: any, index: number) => {
            return (
                <Message {...message} avatar={dialog.avatar} key={index}/>
            );
        })
    );


    const TYPING_MESSAGE: any = (
        isTyping
            ? <p className="chatroom__typing">
                {typingUID} typing message...
              </p>
            : null
    );


    useEffect(() => {
        let chatbody: any = document.querySelector('.chatroom__body');
        chatbody.scrollTop = chatbody.scrollHeight;
        return () => {
            chatbody = null;
        }
    });

    return (
        <section className="chatroom">
            <div className="chatroom__header">
                <Namebar {...dialog}/>
            </div>
            <div className="chatroom__body">
                {MESSAGES}
                {TYPING_MESSAGE}
            </div>
            <div className="chatroom__footer">
                <TextField 
                    message={message} 
                    setMessage={setMessage} 
                    sendMessage={sendMessage} 
                    handleChange={handleChange}
                />
                <ReadySolution 
                    {...dialog} 
                    sendMessage={sendMessage}
                />
            </div>
        </section>
    );
};

export default Chatroom;