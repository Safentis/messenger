import { FC           } from 'react';
import { Props        } from './Solution.interface';
import { Autocomplete } from '@material-ui/lab';
import { TextField    } from '@material-ui/core';
import Button           from '../Button/Button';
import './Solution.css';
import useSolution      from '../../Hooks/useSolution';
import { useSelector  } from 'react-redux';
import { useState     } from 'react';

const Solution: FC <Props> = ({question, sendMessage}) => {

    //* ---------------------------------------------------------
    //* We get all dialogs
    const dialogs: any[] = useSelector((state: any): any[] => {
        return state.dialogsReducer.dialogs;
    })


    //* ---------------------------------------------------------
    //* A search logic of the solutions 
    const solutions: any[] = useSolution({dialogs, question});
    const [solution, setSolution] = useState('');


    //* ---------------------------------------------------------
    //* Handlers of the solution
    const handleInputChange = (event: any, solution: string) => {
        setSolution(solution);
    }

    const sendSolution = () => {
        if (solution.length > 0) {
            sendMessage(solution)
        }
    }

    return (
        <div className="solution">
            <Autocomplete
                className="solution__autocomplete"
                options={solutions}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Solutions"
                    />
                )}
            />
                <Button 
                    className="solution__button button-action" 
                    onClick={sendSolution}
                >
                    send
                </Button>
        </div>
    );
};

export default Solution;