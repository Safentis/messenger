import React, { FC } from "react";
import { useParams } from "react-router";

import { Chatroom } from "../../screens/Root.interface";
import "./Name.css";

interface Props {
  dialogs: any;
}

type paramsType = {
  key: string;
};

const Name: FC<Props> = ({ dialogs }): React.ReactElement => {
  const { key: path }: paramsType = useParams();
  const { client }: Chatroom = dialogs[path];
  return (
    <div className="name">
      <h2 className="name__client">{client}</h2>
    </div>
  );
};

export default Name;
