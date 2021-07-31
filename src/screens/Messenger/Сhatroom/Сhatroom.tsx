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
import Solution from "../../../components/Solution/Solution";
import Typing from "../../../components/Typing/Typing";
import useLastActivity from "../../../Hooks/useLastActivity";
import { requestMessages } from "../../../redux/actionCreators/dialogs";
import { messageTemplate } from "./Chatroom.support";
import { messageImageSave } from "./Chatroom.support";

import { Chatroom, Message as MessageInterface } from "../../Root.interface";
import { Props } from "./Сhatroom.interface";
import "./Сhatroom.css";

type useparamsType = {
  key: string;
};
type chatroomType = [string, Chatroom];
type activityType = string | number | Date;
type typingType = [boolean, Function];
type messagesType = [MessageInterface[], Function];
type pictureType = [object[], Function];
type inputbarType = [string, Function];

export interface Signal {
  channel: string;
  message: number;
  publisher: string;
  subscription: null | string;
  timetoken: string | number | Date;
}

export interface Envelope {
  message: MessageInterface;
  publisher: string;
  timetoken: string | number | Date;
}

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
  const client: string = value.client;

  //* ---------------------------------------------
  //* Typing state
  const [isTyping, setIsTyping]: typingType = useState(false);

  //* ---------------------------------------------
  //* Pubnub state
  const isChatroomChannel: string = `room-${path}`;
  const pubnub: any = usePubNub();
  const [messages, setMessages]: messagesType = useState(letters);
  const [channels]: any[] = useState([isChatroomChannel]);

  //* ---------------------------------------------
  //* Picture handler
  const [pictures, setPictures]: pictureType = useState([]);
  const handleDrop = (picture: object) => {
    setPictures(picture);
  };

  const handleDeletePicture = (index: number) => {
    let newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  //* ---------------------------------------------
  //* Inputbar state and typing logic
  const [inputbar, setInputbar]: inputbarType = useState("");
  const handleKeyUp = () => {
    const inputHasText = inputbar.length > 0;

    if (inputHasText || !inputHasText) {
      pubnub.signal({
        channel: isChatroomChannel,
        message: inputHasText ? "1" : "0",
      });
    }
  };

  //* ---------------------------------------------
  //* Pubnub handlers
  const sendMessage = async (message: string) => {
    setInputbar("");
    let images: any;
    let body: any;

    if (pictures.length > 0) {
      setPictures([]);
      images = await messageImageSave({ pictures });
    }

    body = messageTemplate({ content: message, images });

    pubnub.publish({
      channel: isChatroomChannel,
      message: { ...body },
    });
    pubnub.signal({
      channel: isChatroomChannel,
      message: "0",
    });
  };

  const handleMessage = ({ message }: Envelope) => {
    setMessages((msgs: any[]) => [...msgs, message]);

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
    const listener = {
      message: handleMessage,
      signal: handleSignal,
    };

    pubnub.addListener(listener);
    pubnub.subscribe({ channels });
    return () => {
      pubnub.removeListener(listener);
      pubnub.unsubscribeAll();
    };
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
  const MESSAGES = (
    <>
      {messages.map((message: MessageInterface, index: number) => (
        <Message key={index} {...message} {...user} />
      ))}
    </>
  );

  const MESSAGE_COMPLITED =
    status === "complited" ? (
      <p className="chatroom__complited">Dialog complited {activity}</p>
    ) : null;

  const MESSAGE_IMAGE =
    pictures.length > 0 ? (
      <div className="chatroom__images">
        {pictures.map((picture: any, index: number) => (
          <Fragment key={index}>
            <img
              className="chatroom__image"
              src={window.URL.createObjectURL(picture)}
              height="150"
              width="150"
            />
            <Button onClick={() => handleDeletePicture(index)}>
              <FontAwesomeIcon className="icon icon_brown" icon={faTimes} />
            </Button>
          </Fragment>
        ))}
      </div>
    ) : null;

  return (
    <>
      <Namebar>
        <h2 className="client-name">{client}</h2>
      </Namebar>
      <section className="chatroom">
        <div className="chatroom__inner">
          <Messages className="chatroom__messages">
            {MESSAGES}
            {MESSAGE_COMPLITED}
            <Typing className="chatroom__typing" isTyping={isTyping} />
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
              className="chatroom__solution"
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
