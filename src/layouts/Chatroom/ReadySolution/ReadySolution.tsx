import { FC, useEffect, useState             } from 'react';
import { Props                               } from './ReadySolution.interface';
import './ReadySolution.css';

import { Autocomplete                        } from '@material-ui/lab';
import { TextField                           } from '@material-ui/core';
import { useSelector                         } from 'react-redux';
import firebase                                from 'firebase';

const ReadySolution: FC <Props> = ({chatId, messages, handleSendMessage}): any => {

    const [solutions, setSolutions] = useState([]);
    const dialogs: any = useSelector((state: any) => {
        return state.menudialogsReducer.dialogs;
    });

    useEffect(() => {
        //* The array of an all solutions from complited dialogs
        const solutions: any = []; 

        //* The current chat question of users
        const question : any = Object.values(messages)[0].content;


        //* Each complited dialog we pushed to the solutions
        //* as object with fields "question" and "solution"
        for (let dialog of dialogs) {
            
            if (dialog.status !== 'complited') {
                continue;
            };
            
            const message : any  = Object.values(dialog.messages);
            const question: any[] = message[0].content;
            const solution: any[] = message[message.length - 1].content;

            

            solutions.push({question, solution})
        }


        //* All suitables solutions
        const results: any = [];
        
        //* In this case we look on a length of messages
        //* that to find the same words with help of the reg exp "test"   
        for (let solution of solutions) {

            if (solution.question.length > question) {
                
                const regexp: RegExp = new RegExp(question,'ig');
                
                if (question.match(regexp)) {
                    results.push(solution.solution);
                }
            }
            else {
                const regexp: RegExp = new RegExp(solution.question,'ig');
    
                if (solution.question.match(regexp)) {
                    results.push(solution.solution);
                }
            }
        }

        setSolutions(results);

        return () => {
            setSolutions([]);
        }
    }, [messages]);


    const handleInputChange = (event: any, value: any) => {

        if (value.length === 0) {
            return;
        }
        else {
            handleSendMessage(value, chatId);
        }
    }
 
    return (
        <Autocomplete
            options={solutions}
            onInputChange={handleInputChange}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="Solutions"
                />
            )}
        />
    );
};

export default ReadySolution;