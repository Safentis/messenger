import { useState, useEffect } from 'react';

interface Props {
    dialogs: any[]
    status : string
    uid    : string
}

const useFilterDialogs = ({dialogs, status, uid}: Props) => {
    
    //* State of the custom-hook
    const [result, setResult] = useState([]);

    useEffect(() => {
        //* We are getting all dialogs and filter them
        //* to a status, and return result back 
        if (dialogs) {
            const noFiltered: any = Object.entries(dialogs);
            const isFiltered: any = noFiltered.filter(([key, value]: any) => {
                return (value.status !== 'noactive')
                    ? (
                        value.status === status && value.operatorId === uid || 
                        value.saved  === status && value.operatorId === uid ||
                        value.saved  === status && value.status === 'complited' && value.operatorId === uid 
                    )
                    : value.status === status
            });
    
            setResult(isFiltered);
        }

        return () => {
            setResult([]);
        }
    }, [dialogs])
    
    return result;
};

export default useFilterDialogs;