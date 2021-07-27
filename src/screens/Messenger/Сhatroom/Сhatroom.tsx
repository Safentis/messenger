import { FC, useState, useEffect } from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { usePubNub } from "pubnub-react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { Props } from "./Сhatroom.interface";
import Inputbar from "./Inputbar/Inputbar";
import Messages from "./Messages/Messages";
import Message from "../../../components/Message/Message";
import Namebar from "../../../layouts/Namebar/Namebar";
import Solution from "../../../components/Solution/Solution";
import Typing from "../../../components/Typing/Typing";
import useLastActivity from "../../../Hooks/useLastActivity";
import { requestMessages } from "../../../redux/actionCreators/dialogs";

import "./Сhatroom.css";

//* SUPPORTS
import { messageTemplate } from "./Chatroom.support";
import { messageImageSave } from "./Chatroom.support";
import Button from "../../../components/Button/Button";

const Сhatroom: FC<Props> = ({ dialogs, user, settings }) => {
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

  const letters: any[] = value.messages ? Object.values(value.messages) : [];
  const activity: any = useLastActivity(letters[letters.length - 1]?.timestamp);
  const question: string = letters[0]?.content; //* Question for Solution element
  const status: string = value.status;
  const client: string = value.client;

  //* ---------------------------------------------
  //* Typing state
  type IsTyping = [boolean, Function];

  const [isTyping, setIsTyping]: IsTyping = useState(false);
  const isTypingChannel: string = "is-typing";

  //* ---------------------------------------------
  //* Pubnub state
  type Messages = [any, Function];

  const isChatroomChannel: string = `room-${path}`;
  const pubnub: any = usePubNub();
  const [messages, addMessage]: Messages = useState(letters);
  const [channels]: any[] = useState([isChatroomChannel, isTypingChannel]);

  //* ---------------------------------------------
  //* Picture handler
  type Picture = [any[], Function];

  const [pictures, setPictures]: Picture = useState([]);
  const handleDrop = (picture: any) => {
    setPictures(picture);
  };

  const handleDeletePicture = (index: number) => {
    let newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  //* ---------------------------------------------
  //* Inputbar state and typing logic
  type InputbarField = [string, Function];

  const [inputbar, setInputbar]: InputbarField = useState("");
  const handleKeyUp = () => {
    const inputHasText = inputbar.length > 0;

    if ((inputHasText && !isTyping) || (!inputHasText && isTyping)) {
      setIsTyping(!isTyping);

      pubnub.signal({
        channel: isChatroomChannel,
        message: inputHasText ? "1" : "0",
      });
    }
  };

  //* ---------------------------------------------
  //* Pubnub handlers
  interface HandleSendMessagesProps {
    message: string;
    pictures: any[];
  }

  const handleSendMessage = async ({
    message,
    pictures,
  }: HandleSendMessagesProps) => {
    let urls: any;
    let body: any;

    if (pictures.length > 0) {
      urls = await messageImageSave({ pictures });
    }

    body = messageTemplate({ content: message, pictures: urls });

    dispatch(
      requestMessages({
        chatId: path,
        body,
      })
    );
  };

  const handleMessage = (message: any) => {};
  const handleSignal = (signal: any) => {
    setIsTyping(true);

    if (signal.message === "0") {
      setIsTyping(false);
    }
  };

  const sendMessage = (message: any) => {
    handleSendMessage({ message, pictures });
    setPictures([]);
    setIsTyping(false);
    setInputbar("");
  };

  useEffect(() => {
    pubnub.addListener({ message: handleMessage, signal: handleSignal });
    pubnub.subscribe({ channels });

    return () => {
      pubnub.unsubscribeAll();
    };
  }, [pubnub, channels]);

  //* ---------------------------------------------
  //* If we have a new changes,
  //* we push dialogs to state
  useEffect(() => {
    addMessage([...letters]);
    console.log("addMessage update");

    return () => {
      addMessage([]);
    };
  }, [dialogs]);

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
      {messages.map((message: any, index: number) => (
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
              <FontAwesomeIcon 
                className="icon icon_brown" 
                icon={faTimes} 
              />
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
