import { useEffect, useState } from 'react';

import { Chatrooms, Message } from '../screens/Root.interface';

interface Props {
  dialogs: Chatrooms;
  question: string | undefined;
}

const useSolution = ({ dialogs, question }: Props): string[] => {
  const [solutions, setSolutions]: [string[], Function] = useState<string[]>([]);

  useEffect(() => {
    const complited: string[] = [];

    //* We take all complted dialogs and search final message
    question &&
      Object.values(dialogs).map(({ messages = {}, status }) => {
        let values: Message[] = Object.values(messages);

        if (status === 'complited' && values.length > 0) {
          let queMessage: string = values[1]?.content;
          let solMessage: Message[] | undefined = values.filter(value => value.solution === true);

          if (solMessage) {
            // let regExp: RegExp = new RegExp(question, 'igu');

            if (queMessage?.includes(question) || question?.includes(queMessage)) {
              solMessage.map(sol => {
                complited.push(sol.content);
              });
            }
          }
        }
      });

    setSolutions(complited);

    return () => {
      setSolutions([]);
    };
  }, [question]);

  return solutions;
};

export default useSolution;
