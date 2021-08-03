import { FC } from "react";

import Avatar from "../Avatar/Avatar";
import useLastActivity from "../../Hooks/useLastActivity";

import { Props } from "./Dialog.interface";
import { Message } from "../../screens/Root.interface";
import "./Dialog.css";

const Dialog: FC<Props> = ({ children, client, messages = {} }) => {
  //* -------------------------------------------------------------------
  //* Content of the dialog
  const defaultContent: string = "no messages";

  const allMessages: Message[] = Object.values(messages);
  const lastIndex: number = allMessages.length - 1;
  const lastContent: string = allMessages[lastIndex]?.content || defaultContent;
  const lastTimestamp: string | number | Date =
    allMessages[lastIndex]?.timestamp;
  const lastWritter: string = allMessages[lastIndex]?.writtenBy;

  //* -------------------------------------------------------------------
  //* Library moment and correct a date
  const lastActivity = useLastActivity(lastTimestamp);

  return (
    <div className="dialog">
      <div className="dialog__inner">
        <div className="dialog__client">
          <Avatar className="dialog__avatar" width={45} height={45}/>
        </div>
        <div className="dialog__content">
          <p className="dialog__name">{client}</p>
          <p className="dialog__message">
            {lastWritter ? (
              <>
                <span className="dialog__author">{lastWritter}:</span>
                {lastContent}
              </>
            ) : (
              lastContent
            )}
          </p>
          <p className="dialog__activity">{lastActivity}</p>
        </div>
        <div className="dialog__controls">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
