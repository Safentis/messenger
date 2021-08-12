import { FC, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useSelector } from 'react-redux';

import Button from '../Button/Button';
import useSolution from '../../Hooks/useSolution';

import './Solution.css';
import { Props } from './Solution.interface';
import { Chatrooms } from '../../screens/Root.interface';
import { RootReducerState } from '../../redux/reducers/rootReducer.interface';

const Solution: FC<Props> = ({ className = '', question, sendMessage }): React.ReactElement => {
  //* ---------------------------------------------------------
  //* We get all dialogs
  const dialogs: Chatrooms = useSelector((state: RootReducerState): Chatrooms => {
    return state.dialogsReducer.dialogs;
  });

  //* ---------------------------------------------------------
  //* A search logic of the solutions
  const solutions: string[] = useSolution({ dialogs, question });
  const [solution, setSolution] = useState<string>('');

  //* ---------------------------------------------------------
  //* Handlers of the solution
  const handleInputChange = (event: React.ChangeEvent<object>, solution: string) => {
    setSolution(solution);
  };

  const sendSolution = () => {
    if (solution.length > 0) {
      sendMessage(solution);
    }
  };

  return (
    <div className={'solution ' + className}>
      <Autocomplete
        className="solution__autocomplete"
        options={solutions}
        onInputChange={handleInputChange}
        renderInput={params => <TextField {...params} label="Solutions" />}
      />
      <Button className="solution__button button-action" onClick={sendSolution}>
        send
      </Button>
    </div>
  );
};

export default Solution;
