import { FC } from "react";
import { useSelector } from "react-redux";

import "./Line.css";
import { Props } from "./Line.interface";
import { Chatroom } from "../../screens/Root.interface";
import { RootReducerState } from "../../redux/reducers/rootReducer.interface";

const Line: FC<Props> = ({ className = '' }): React.ReactElement => {
  const dialogs = useSelector((state: RootReducerState): Chatroom[] => {
    return state.dialogsReducer.dialogs;
  });

  let index: number = 0;
  let count: number = 0;
  let array: Chatroom[] = Object.values(dialogs || []);

  while (index < array.length) {
    if (array[index].status === "noactive") {
      count++;
    }

    index += 1;
  }

  return (
    <div className={`line ${className}`}>
      <h2 className="line__content">
        Customer in line:
        <span className="line__count">{count}</span>
      </h2>
    </div>
  );
};

export default Line;
