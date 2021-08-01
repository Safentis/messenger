import { FC, useState, useEffect } from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { usePubNub } from "pubnub-react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../components/Button/Button";
import Inputbar from "./Inputbar/Inputbar";
import Messages from "./Messages/Messages";
import Message from "../../../components/Message/Message";
import Namebar from "../../../layouts/Namebar/Namebar";
import ImagesList from "./ImagesList/ImagesList";
import Content from "../../../layouts/Content/Content";
import Solution from "../../../components/Solution/Solution";
import Typing from "../../../components/Typing/Typing";
import useLastActivity from "../../../Hooks/useLastActivity";
import { requestMessages } from "../../../redux/actionCreators/dialogs";

import { messageImageSave } from "./Chatroom.support";
import { messageTemplate } from "./Chatroom.support";
import { Message as MessageInterface } from "../../Root.interface";
import {
  Props,
  Signal,
  Envelope,
  chatroomType,
  activityType,
  typingType,
  messagesType,
  pictureType,
  inputbarType,
  useparamsType,
} from "./Сhatroom.interface";
import "./Сhatroom.css";

const Сhatroom: FC<Props> = ({ dialogs, user, settings }) => {
  //* ---------------------------------------------
  //* We get a key of url
  const { key: path }: useparamsType = useParams();
  const dispatch = useDispatch();

  //* ---------------------------------------------
  //* And search with key of a dialog
  const isEntrie: chatroomType[] = Object.entries(dialogs);
  const isFinded: chatroomType = isEntrie.find(
    ([key, value]: [string, any]) => {
      return path === key;
    }
  ) as chatroomType;

  const [key, value]: chatroomType = isFinded;

  const letters: MessageInterface[] = Object.values(value?.messages ?? []);
  const activity: activityType = useLastActivity(
    letters[letters.length - 1]?.timestamp
  );
  const question: string = letters[1]?.content; //* Question for Solution element
  const status: string = value.status;

  //* ---------------------------------------------
  //* Typing state
  const [isTyping, setIsTyping]: typingType = useState(false);

  //* ---------------------------------------------
  //* Pubnub state
  const ChatroomChannel: string = `room-${path}`;
  const pubnub: any = usePubNub();
  const [messages, setMessages]: messagesType = useState(letters);
  const [channels]: any[] = useState([ChatroomChannel]);

  //* ---------------------------------------------
  //* Picture handler
  const [pictures, setPictures]: pictureType = useState([]);
  const handleDrop = async (picture: object): Promise<void> => {
    // let src: string[] = await messageImageSave({ pictures: [picture] });
    // setPictures((srcs: string[]) => [...srcs, src[0]]);
    setPictures(picture)
  };

  //* ---------------------------------------------
  //* Inputbar state and typing logic
  const [inputbar, setInputbar]: inputbarType = useState("");
  const handleKeyUp = () => {
    const inputHasText = inputbar.length > 0;

    if (inputHasText || !inputHasText) {
      pubnub.signal({
        channel: ChatroomChannel,
        message: inputHasText ? "1" : "0",
      });
    }
  };

  //* ---------------------------------------------
  //* Pubnub handlers
  const sendMessage = async (message: string) => {
    if (inputbar.trim().length !== 0 || pictures.length > 0) {
      setInputbar("");
      let images: string[] = [];
      let body: MessageInterface;
  
      if (pictures.length > 0) {
        setPictures([]);
        images = await messageImageSave({ pictures });
      }
  
      body = messageTemplate({ content: message, images });
  
      pubnub.publish({
        channel: ChatroomChannel,
        message: { ...body },
      });
      pubnub.signal({
        channel: ChatroomChannel,
        message: "0",
      });
    } 
  };

  const handleMessage = ({ message }: Envelope) => {
    setMessages((msgs: MessageInterface[]) => [...msgs, message]);

    if (message.writtenBy === "operator") {
      dispatch(
        requestMessages({
          chatId: path,
          body: {
            ...message,
          },
        })
      );
    }
  };

  const handleSignal = (signal: Signal) => {
    if (signal.publisher === "client") {
      if (signal.message.toString() === "1") {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    }
  };

  useEffect(() => {
    if (pubnub) {
      const listener = {
        message: handleMessage,
        signal: handleSignal,
      };
  
      pubnub.setUUID(user.uid);
      pubnub.addListener(listener);
      pubnub.subscribe({ channels });
      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [pubnub, channels]);

  //* ---------------------------------------------
  //* Auto greeting
  useEffect(() => {
    if (status === "noactive") {
      sendMessage(settings.greeting);
    }
  }, []);

  //* ---------------------------------------------
  //* Content
  const MESSAGES = messages.map((message: MessageInterface, index: number) => (
    <Message key={index} {...message} {...user} />
  ));

  const MESSAGE_COMPLITED =
    status === "complited" ? (
      <p className="chatroom__complited">Dialog complited {activity}</p>
    ) : null;

  const MESSAGE_IMAGE =
    pictures.length > 0 ? (
      <ImagesList pictures={pictures} setPictures={setPictures} />
    ) : null;

  return (
    <Content className="chatroom">
      <Messages className="chatroom__messages" messages={messages}>
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
          question={question}
          sendMessage={sendMessage}
        />
      </Inputbar>
    </Content>
  );
};

export default Сhatroom;
