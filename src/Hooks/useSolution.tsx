import { useEffect, useState } from "react";

interface Props {
    dialogs : any[]
    question: string
}

const useSolution = ({dialogs, question}: Props): any[] => {

    const [solutions, setSolutions]: [any[], Function] = useState([]);
    
    useEffect(() => {
        const complited: any[] = []; 

        //* We take all complted dialogs and search final message
        Object.values(dialogs).map(({ messages, status }) => {

            if (status === 'complited') {
                let arrMessages: any[]  = Object.values(messages);
                let lstIndex   : number = arrMessages.length - 1;
    
                let frsMessage: string  = arrMessages[0].content;
                let lstMessage: string  = arrMessages[lstIndex].content;
    
                let regExp    : RegExp  = new RegExp(frsMessage);
                
                if (regExp.test(question)) {
                    complited.push(lstMessage);                    
                }
            }; 
        });

        setSolutions(complited);
        
        return () => {
            setSolutions([])
        }
    }, [])

    return solutions;
};

export default useSolution;