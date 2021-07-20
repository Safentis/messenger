import { FC, useState, useEffect } from 'react'
import { Props                   } from './Сhatroom.interface';
import { useParams               } from 'react-router-dom';
import { usePubNub               } from 'pubnub-react';
import { useDispatch             } from 'react-redux';
import { requestMessages         } from '../../../redux/actionCreators/dialogs';
import Inputbar                    from './Inputbar/Inputbar';
import Messages                    from './Messages/Messages';
import Message                     from '../../../components/Message/Message';
import Namebar                     from '../../../layouts/Namebar/Namebar';
import Solution                    from '../../../components/Solution/Solution';
import Typing                      from '../../../components/Typing/Typing'; 
import './Сhatroom.css';
import useLastActivity from '../../../Hooks/useLastActivity';

const Сhatroom: FC <Props> = ({dialogs, user, settings}) => {

    //* ---------------------------------------------
    //* We get a key of url
    const { key: path }: any = useParams();
    const dispatch: Function = useDispatch();


    //* ---------------------------------------------
    //* And search with key of a dialog
    const isEntrie: any = Object.entries(dialogs);
    const isFinded: any = isEntrie.find(([key, value]: [string, any]) => {
        return path === key;
    });

    const [key, value] = isFinded;

    const letters : any[]  = Object.values(value.messages);
    const activity: any    = useLastActivity(letters[letters.length - 1].timestamp);
    const question: string = letters[0].content; //* Question for Solution element
    const status  : string = value.status;
    const client  : string = value.client;
    

    //* ---------------------------------------------
    //* Typing state
    const [isTyping, setIsTyping] = useState(false);
    const isTypingChannel = 'is-typing';


    //* ---------------------------------------------
    //* Pubnub state
    const isChatroomChannel = `room-${path}`;
    const pubnub: any = usePubNub();
    const [messages, addMessage]: any = useState(letters);
    const [channels] = useState([isChatroomChannel, isTypingChannel]);


    //* ---------------------------------------------
    //* Picture handler
    const [picture, setPictures]: [string, Function] = useState('');
    const handleDrop = (picture: any) => {
        let file: any   = picture[0];
        let url: string = window.URL.createObjectURL(file);

        setPictures(url);
    }


    //* ---------------------------------------------
    //* Inputbar state and typing logic
    const [inputbar, setInputbar] = useState('');

    const handleSendMessage = (content: string) => {
        let timestamp: any = new Date();
        let writtenBy: string = 'operator';
        let image: string | null = picture ?? null;

        let body: any = {
            writtenBy,
            timestamp,
            content,
            image, 
        };
        
        dispatch(requestMessages({
            chatId: path, 
            body
        }));
    }

    const handleKeyUp = () => {
        const inputHasText = inputbar.length > 0

        if ((inputHasText && !isTyping) || (!inputHasText && isTyping)) {
            setIsTyping(!isTyping);

            pubnub.signal({
                channel: isChatroomChannel,
                message: inputHasText ? '1' : '0'
            });
        }
    }

    
    //* ---------------------------------------------
    //* Pubnub handlers
    const handleMessage = (event: any) => {
        setIsTyping(false);
        setInputbar('');
    }

    const handleSignal = (signal: any) => {
        setIsTyping(true);

        if (signal.message === '0') {
            setIsTyping(false);
        }
    }

    const sendMessage = (message: any) => {

        if (message) {
            pubnub.publish({
                channel: channels[0], 
                message
            });

            //* Message add to the db
            handleSendMessage(message);
        }
    }

    useEffect(() => {
        pubnub.addListener({ message: handleMessage, signal : handleSignal });
        pubnub.subscribe({ channels });

        return () => {
            pubnub.unsubscribeAll();
        }
    }, [pubnub, channels]);


    //* ---------------------------------------------
    //* If we have a new dialogs, 
    //* we push them to state
    useEffect(() => {
        addMessage([...letters])

        return () => {
            addMessage([]);
        }
    }, [dialogs]);


    //* ---------------------------------------------
    //* Auto greeting
    useEffect(() => {
        if (status === 'noactive') {
           sendMessage(settings.greeting);
        }
    }, []);


    //* ---------------------------------------------
    //* Content
    const MESSAGES = (
        <>
            {messages.map((message: any, index: number) => 
                <Message {...message} {...user} key={index}/>
            )}
        </>
    );

    const MESSAGE_COMPLITED = (
        status === 'complited' 
        ? <p className="chatroom__complited">
            Dialog complited {activity}
          </p>
        : null
    );


    return (
        <>
            <Namebar>
                <h2 className="client-name">
                    {client}
                </h2>
            </Namebar>
            <section className="chatroom">
                <div className="chatroom__inner">
                    <Messages className="chatroom__messages">
                        {MESSAGES}
                        {MESSAGE_COMPLITED}
                        <Typing 
                            className="chatroom__typing" 
                            isTyping={isTyping}
                        />
                    </Messages>
                    <Inputbar 
                        className="chatroom__inputbar" 
                        inputbar={inputbar}
                        setInputbar={setInputbar}
                        handleKeyUp={handleKeyUp}
                        sendMessage={sendMessage}
                        handleDrop={handleDrop}
                    >
                        <Solution 
                            question={question} 
                            sendMessage={sendMessage}
                        />
                    </Inputbar>
                </div>
            </section>
        </>
    );
};

export default Сhatroom;