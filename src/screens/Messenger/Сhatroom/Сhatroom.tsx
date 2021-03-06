import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePubNub } from 'pubnub-react';
import { useDispatch } from 'react-redux';
import Pubnub from 'pubnub';

import Inputbar from './Inputbar/Inputbar';
import Messages from './Messages/Messages';
import Message from '../../../components/Message/Message';
import ImagesList from './ImagesList/ImagesList';
import Content from '../../../layouts/Content/index';
import Solution from '../../../components/Solution/Solution';
import Typing from '../../../components/Typing/Typing';
import useLastActivity from '../../../Hooks/useLastActivity';

import { requestMessages } from '../../../redux/actionCreators/dialogs';
import { messageImageSave } from './Chatroom.support';
import { messageTemplate } from './Chatroom.support';
import { Chatroom, DateType, Message as MessageInterface } from '../../Root.interface';
import {
  Props,
  Signal,
  Envelope,
  typingType,
  pictureType,
  inputbarType,
  useparamsType,
  ChatroomState,
} from './Сhatroom.interface';
import './Сhatroom.css';

const Сhatroom: FC<Props> = ({ dialogs, user, settings }): React.ReactElement => {
  //* ---------------------------------------------
  //* We get a key of url
  const { key }: useparamsType = useParams();
  const dispatch = useDispatch();

  //* ---------------------------------------------
  //* Main state
  const [chatroom, setChatroom]: [ChatroomState, Function] = useState({
    messages: Object.values(dialogs[key]?.messages || []),
    keys: Object.keys(dialogs[key]?.messages || []),
    question: '',
    status: '',
    complited: '',
  });

  useEffect(() => {
    let chatroom: Chatroom = dialogs[key];
    let messages: MessageInterface[] = Object.values(chatroom?.messages || []);
    let keys: string[] = Object.keys(chatroom?.messages || []);
    let question: string = messages[1]?.content;
    let status: string = chatroom?.status;
    let complited: DateType = dialogs[key]?.complited;

    //* ---------------------------------------------
    //* Auto greeting
    if (chatroom?.status === 'noactive') {
      setTimeout(() => {
        sendMessage(settings.greeting);
      }, 0);
    }

    setChatroom({
      ...chatroom,
      messages,
      question,
      status,
      keys,
      complited,
    });
  }, [key]);

  //* ---------------------------------------------
  //* Typing state
  const [isTyping, setIsTyping]: typingType = useState(false);

  //* ---------------------------------------------
  //* Pubnub state
  const chatroomChannel: string = `room-${key}`;
  const [channels]: [string[], Function] = useState([chatroomChannel]);
  const pubnub: Pubnub = usePubNub();

  //* ---------------------------------------------
  //* Picture handler
  const [pictures, setPictures]: pictureType = useState([]);
  const handleDrop = async (picture: object): Promise<void> => {
    setPictures(picture);
  };

  //* ---------------------------------------------
  //* Inputbar state and typing logic
  const [inputbar, setInputbar]: inputbarType = useState('');
  const handleKeyUp = () => {
    const inputHasText = inputbar.length > 0;

    if (inputHasText || !inputHasText) {
      pubnub.signal({
        channel: chatroomChannel,
        message: inputHasText ? '1' : '0',
      });
    }
  };

  //* ---------------------------------------------
  //* Pubnub handlers
  const sendMessage = async (message: string): Promise<void> => {
    let isMessage: boolean = message.trim().length !== 0;
    let isPicture: boolean = pictures.length > 0;
    let isComplite: boolean = chatroom.status === 'complited';

    if (isComplite) return;
    if (isMessage || isPicture) {
      setInputbar('');
      let images: string[] = [];
      let body: MessageInterface;

      if (isPicture) {
        setPictures([]);
        images = await messageImageSave({ pictures });
      }

      body = messageTemplate({ content: message, images });

      pubnub.publish({
        channel: chatroomChannel,
        message: { ...body },
      });
      pubnub.signal({
        channel: chatroomChannel,
        message: '0',
      });
    }
  };

  const handleMessage = ({ message }: Envelope) => {
    let state = { ...chatroom };
    state.messages.push(message);
    setChatroom(state);

    if (message.writtenBy === 'operator') {
      dispatch(
        requestMessages({
          chatId: key,
          body: {
            ...message,
          },
        }),
      );
    }
  };

  const handleSignal = (signal: Signal) => {
    if (signal.publisher === 'client') {
      if (signal.message.toString() === '1') {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    }
  };

  useEffect(() => {
    const listener = {
      message: handleMessage,
      signal: handleSignal,
    };

    pubnub.setUUID('operator');
    pubnub.addListener(listener);
    pubnub.subscribe({ channels });
    return () => {
      pubnub.removeListener(listener);
      pubnub.unsubscribeAll();
    };
  }, [pubnub, channels]);

  //* ---------------------------------------------
  //* Last activity hook
  const activity: DateType = useLastActivity(chatroom?.complited);

  //* ---------------------------------------------
  //* Content
  const MESSAGES = chatroom.messages.map((message: MessageInterface, index: number) => (
    <Message
      key={index}
      chatId={key} //* key of chatroom
      index={chatroom.keys[index]} //* key of message
      {...message}
      {...user}
    />
  ));

  const MESSAGE_COMPLITED =
    chatroom.status === 'complited' ? (
      <p className="chatroom__complited">Dialog complited {activity}</p>
    ) : null;

  const MESSAGE_IMAGE =
    pictures.length > 0 ? <ImagesList pictures={pictures} setPictures={setPictures} /> : null;

  return (
    <Content className="chatroom">
      <Messages className="chatroom__messages">
        {MESSAGES}
        {MESSAGE_COMPLITED}
        {MESSAGE_IMAGE}
        <Typing className="chatroom__typing" isTyping={isTyping} />
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
          className="chatroom__solution"
          question={chatroom.question}
          sendMessage={sendMessage}
        />
      </Inputbar>
    </Content>
  );
};

export default Сhatroom;
