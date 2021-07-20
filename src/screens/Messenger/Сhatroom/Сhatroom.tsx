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
import useLastActivity             from '../../../Hooks/useLastActivity';
import './Сhatroom.css';

//* SUPPORTS
import { messageTemplate         } from './Chatroom.support';

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

    const letters                : any[]  = Object.values(value.messages);
    const activity               : any    = useLastActivity(letters[letters.length - 1].timestamp);
    const question               : string = letters[0].content; //* Question for Solution element
    const status                 : string = value.status;
    const client                 : string = value.client;
    

    //* ---------------------------------------------
    //* Typing state
    type IsTyping = [boolean, Function];

    const [isTyping, setIsTyping]: IsTyping = useState(false);
    const isTypingChannel        : string   = 'is-typing';


    //* ---------------------------------------------
    //* Pubnub state
    type Messages = [any, Function];

    const isChatroomChannel     : string    = `room-${path}`;
    const pubnub                : any       = usePubNub();
    const [messages, addMessage]: Messages  = useState(letters);
    const [channels]            : any[]     = useState([isChatroomChannel, isTypingChannel]);


    //* ---------------------------------------------
    //* Picture handler
    type Picture = [string, Function];

    const [picture, setPicture]: Picture = useState('');
    const handleDrop = (picture: any) => {
        // We convert file in a path
        let file: any    = picture[picture.length - 1];
        let url : string = window.URL.createObjectURL(file);

        setPicture(url);
    }


    //* ---------------------------------------------
    //* Inputbar state and typing logic
    type InputbarField = [string, Function];

    const [inputbar, setInputbar]: InputbarField = useState('');
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
    const handleSendMessage = (content: string) => {
        //* Template of a message
        let body = messageTemplate({content, picture});

        dispatch(requestMessages({
            chatId: path, 
            body
        }));
    }

    const handleMessage = ({message}: any) => {
        setIsTyping(false);
        setInputbar('');
        setPicture('');
    }

    const handleSignal = (signal: any) => {
        setIsTyping(true);

        if (signal.message === '0') {
            setIsTyping(false);
        }
    }

    const sendMessage = (message: any) => {
        let isMessage: boolean = message.trim() !== '';

        if (isMessage) {
            pubnub.publish({
                channel: channels[0], 
                message: message,
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
                <Message 
                    key={index}
                    {...message} 
                    {...user} 
                />
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

    const MESSAGE_IMAGE = (
        picture
        ? <img 
            className="chatroom__images" 
            src={picture} 
            height="150"
            width="150" 
          />
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
                        {MESSAGE_IMAGE}
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