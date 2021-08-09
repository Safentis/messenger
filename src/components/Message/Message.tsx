import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Avatar from "../Avatar/Avatar";
import useLastActivity from "../../Hooks/useLastActivity";

import "./Message.css";
import { Props } from "./Message.interface";
import { DateType } from "../../screens/Root.interface";
import { STANDART_AVATAR } from "../../utils/consts";
import { handleSolution } from "../../utils/functions";

const Message: FC<Props> = ({
  content,
  timestamp,
  writtenBy,
  solution,
  images = [],
  photo,
  index,
}) => {
  //* -----------------------------------------------------------
  //* With useLastActivity we got a activity
  const activity: DateType = useLastActivity(timestamp);
  const { key }: { key: string } = useParams();


  //* -----------------------------------------------------------
  //* Classes
  const isClient: boolean = writtenBy === "client";
  const messageClass: string = isClient ? "message-client" : "message-operator";
  const contentClass: string = isClient ? "content-client" : "content-operator";


  //* -----------------------------------------------------------
  //* Avatar
  const avatar: string | null = isClient ? null : photo;


  //* -----------------------------------------------------------
  //* Handle solution, the function needs for handle of solution
  const [isSolution, setSolution] = useState<boolean>(solution as boolean);
  const handleClick = async () => {
    await handleSolution(key, index, !isSolution);
    setSolution(!isSolution);
  }


  //* -----------------------------------------------------------
  //* Content
  const PICTURES: React.ReactNode | null =
    images.length > 0
      ? images.map((image: string, index: number) => (
          <p className={"message__images"} key={index}>
            <img className="message__image" src={image} />
          </p>
        ))
      : null;

  const CONTENT: React.ReactNode | null =
    content?.length > 0 ? (
      <>
        <p className={"message__text " + contentClass}>{content}</p>
      </>
    ) : null;

  const SOLUTION: React.ReactNode | null =
    isSolution ? (
      <FontAwesomeIcon className="message__solution" icon={faStar}/>
    ) : null;

  return (
    <div className={"message " + messageClass} onClick={handleClick}>
      <div className="message__user">
        <Avatar src={avatar ?? STANDART_AVATAR} />
        <p className="message__activity">{activity} {SOLUTION}</p>
      </div>
      <div className="message__content">
        {PICTURES}
        {CONTENT}
      </div>
    </div>
  );
};

export default Message;
