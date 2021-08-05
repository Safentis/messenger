import { useEffect, useState } from "react";
import { Chatroom, Message } from "../screens/Root.interface";

interface Props {
  dialogs: Chatroom[];
  question: string;
}

const useSolution = ({ dialogs, question }: Props): string[] => {
  const [solutions, setSolutions]: [string[], Function] = useState<string[]>([]);

  useEffect(() => {
    const complited: string[] = [];

    //* We take all complted dialogs and search final message
    Object.values(dialogs).map(({ messages = {}, status }) => {
      let values: Message[] = Object.values(messages);
     
      if (status === "complited" && values.length > 0) {
        let lstIndex: number = values.length - 1;
        let frsMessage: string = values[1]?.content;
        let lstMessage: string = values[lstIndex]?.content;
        let regExp: RegExp = new RegExp(question, "igu");

        if (frsMessage?.match(regExp)) {
          complited.push(lstMessage);
        }
      }
    });

    setSolutions(complited);

    return () => {
      setSolutions([]);
    };
  }, [dialogs]);

  return solutions;
};

export default useSolution;
