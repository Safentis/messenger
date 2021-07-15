import { FC, useState, useEffect } from 'react'
import { Props                   } from './Сhatroom.interface';
import { useParams               } from 'react-router-dom';
import { usePubNub               } from 'pubnub-react';
import firebase                    from 'firebase';
import Inputbar                    from './Inputbar/Inputbar';
import Messages                    from './Messages/Messages';
import Message                     from '../../../components/Message/Message';
import Namebar                     from '../../../layouts/Namebar/Namebar';
import Solution                    from '../../../components/Solution/Solution';
import Typing                      from '../../../components/Typing/Typing'; 
import './Сhatroom.css';

const Сhatroom: FC <Props> = ({dialogs, user, settings}) => {

    //* ---------------------------------------------
    //* We get a key of url
    const { key: path }: any = useParams();


    //* ---------------------------------------------
    //* And search with key of a dialog
    const isEntrie: any = Object.entries(dialogs);
    const isFinded: any = isEntrie.find(([key, value]: [string, any]) => {
        return path === key;
    });

    const [key, value] = isFinded;

    const letters   : any[]  = Object.values(value.messages);
    const question  : string = letters[0].content; //* Question for Solution element
    const client    : string = value.client;
    const status    : string = value.status;


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
    //* Inputbar state and typing logic
    const [inputbar, setInputbar] = useState('');

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
        let content  : string = event.message;
        let timetoken: string = event.timetoken;
        let timestamp: any    = new Date();
        
        setIsTyping(false);

        if (content.length > 0 || event.hasOwnProperty('message')) {
            const template = {
                writtenBy: 'operator',
                timestamp,
                content
            }

            addMessage((messages: any) => (
                [...messages, template]
            ));
        }
    }

    const handleSignal = (signal: any) => {
        setIsTyping(true);

        if (signal.message === '0') {
            setIsTyping(false);
        }
    }

    const sendMessage = (message: any) => {
        if (message) {
            pubnub
            .publish({channel: channels[0], message})
            .then(() => setInputbar(''));
        }
    }

    useEffect(() => {
        pubnub.addListener({ message: handleMessage, signal: handleSignal });
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
            Dialog complited
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